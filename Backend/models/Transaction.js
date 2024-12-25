import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  ticketNumber: {
    type: Number,
    unique: true,
    required: true
  },
  transactionId: {
    type: String,
    unique: true,
    required: true
  },
  boothNo: {
    type: String,
    required: true
  },
  vehicleNo: {
    type: String,
    required: true,
    uppercase: true
  },
  vehicleType: {
    type: String,
    required: true
  },
  journeyType: {
    type: String,
    enum: ['Regular', 'Penalty', 'Overweight'],
    required: true
  },
  vehicleWeight: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
}, { timestamps: true });

transactionSchema.statics.generateTransactionId = function() {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `TRX${year}${month}${day}${random}`;
};

transactionSchema.statics.getNextTicketNumber = async function() {
  const lastTransaction = await this.findOne().sort({ ticketNumber: -1 });
  return (lastTransaction && lastTransaction.ticketNumber >= 10000) 
    ? lastTransaction.ticketNumber + 1 
    : 10000;
};

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;