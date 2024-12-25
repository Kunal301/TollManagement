import Transaction from '../models/Transaction.js';

export const createTransaction = async (req, res) => {
  try {
    const ticketNumber = await Transaction.getNextTicketNumber();
    const transactionId = Transaction.generateTransactionId();
    
    const transaction = new Transaction({
      ...req.body,
      ticketNumber,
      transactionId
    });

    const savedTransaction = await transaction.save();
    console.log('Transaction created:', savedTransaction);
    res.status(201).json(savedTransaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ message: 'Error creating transaction', error: error.message });
  }
};

export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ timestamp: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBoothTransactions = async (req, res) => {
  try {
    const { boothNo, startDate, endDate } = req.query;
    
    let query = {};
    if (boothNo) query.boothNo = boothNo;
    if (startDate && endDate) {
      query.timestamp = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const transactions = await Transaction.find(query).sort({ timestamp: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    if (!deletedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRevenue = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start date and end date are required' });
    }

    const transactions = await Transaction.find({
      timestamp: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    });

    const revenue = {
      'Car/Jeep': 0,
      'Lcv': 0,
      'Bus/Truck': 0,
      '3 Axle': 0,
      'Mav': 0,
      'Osv': 0
    };

    let totalRevenue = 0;

    transactions.forEach(transaction => {
      if (revenue.hasOwnProperty(transaction.vehicleType)) {
        revenue[transaction.vehicleType] += transaction.amount;
      } else {
        revenue['Osv'] += transaction.amount; // Categorize unknown vehicle types as OSV
      }
      totalRevenue += transaction.amount;
    });

    const boothRevenue = await Transaction.aggregate([
      {
        $match: {
          timestamp: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
          }
        }
      },
      {
        $group: {
          _id: '$boothNo',
          total: { $sum: '$amount' }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    res.json({
      byVehicleType: revenue,
      byBooth: boothRevenue,
      total: totalRevenue
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDashboardSummary = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalTransactions = await Transaction.countDocuments();
    const todayTransactions = await Transaction.countDocuments({ timestamp: { $gte: today } });
    const totalRevenue = await Transaction.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const todayRevenue = await Transaction.aggregate([
      { $match: { timestamp: { $gte: today } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    res.json({
      totalTransactions,
      todayTransactions,
      totalRevenue: totalRevenue[0]?.total || 0,
      todayRevenue: todayRevenue[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};