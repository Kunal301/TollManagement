// import React, { useState } from 'react';

// interface ReceiptData {
//   transactionId: string;
//   vehicleType: string;
//   baseRate: number;
//   overloadFee: number;
//   totalAmount: number;
//   timestamp: string;
// }

// interface ReceiptPrinterProps {
//   receiptData: ReceiptData;
// }

// const ReceiptPrinter: React.FC<ReceiptPrinterProps> = ({ receiptData }) => {
//   const [isPrintView, setIsPrintView] = useState(false);

//   const handlePrint = () => {
//     window.print();
//   };

//   const PrintableReceipt: React.FC<{ data: ReceiptData }> = ({ data }) => (
//     <div className="print-only bg-white p-8 max-w-md mx-auto">
//       <h2 className="text-2xl font-bold text-center mb-6">Toll Receipt</h2>
//       <div className="space-y-2">
//         <p><strong>Transaction ID:</strong> {data.transactionId}</p>
//         <p><strong>Vehicle Type:</strong> {data.vehicleType}</p>
//         <p><strong>Base Rate:</strong> ₹{data.baseRate.toFixed(2)}</p>
//         <p><strong>Overload Fee:</strong> ₹{data.overloadFee.toFixed(2)}</p>
//         <p><strong>Total Amount:</strong> ₹{data.totalAmount.toFixed(2)}</p>
//         <p><strong>Timestamp:</strong> {new Date(data.timestamp).toLocaleString()}</p>
//       </div>
//     </div>
//   );

//   return (
//     <div className="bg-white shadow-md rounded-lg p-6">
//       {!isPrintView ? (
//         <>
//           <h2 className="text-2xl font-bold mb-4">Tol Receipt</h2>
//           <div className="mb-4 border-b pb-2">
//             <p><strong>Transaction ID:</strong> {receiptData.transactionId}</p>
//             <p><strong>Vehicle Type:</strong> {receiptData.vehicleType}</p>
//             <p><strong>Base Rate:</strong> ₹{receiptData.baseRate.toFixed(2)}</p>
//             <p><strong>Overload Fee:</strong> ₹{receiptData.overloadFee.toFixed(2)}</p>
//             <p><strong>Total Amount:</strong> ₹{receiptData.totalAmount.toFixed(2)}</p>
//             <p><strong>Timestamp:</strong> {new Date(receiptData.timestamp).toLocaleString()}</p>
//           </div>
//           <button
//             onClick={() => setIsPrintView(true)}
//             className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Open Print View
//           </button>
//         </>
//       ) : (
//         <div className="print-view">
//           <PrintableReceipt data={receiptData} />
//           <div className="mt-6 flex justify-between no-print">
//             <button
//               onClick={() => setIsPrintView(false)}
//               className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Back
//             </button>
//             <button
//               onClick={handlePrint}
//               className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Print Receipt
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReceiptPrinter;