// import React, { useState } from 'react';
// import FASTagPayment from './FastTagPayment';
// import ManualPayment from './ManualPayment';

// const TollCollection: React.FC = () => {
//   const [paymentMethod, setPaymentMethod] = useState<'fastag' | 'manual'>('fastag');
//   const [lastTransactionId, setLastTransactionId] = useState<string | null>(null);

//   const handlePaymentComplete = (transactionId: string) => {
//     setLastTransactionId(transactionId);
//     // In a real application, you might update the UI, print a receipt, or perform other actions here
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">Toll Collection</h1>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">Payment Method</label>
//         <div className="mt-2">
//           <button
//             className={`mr-2 px-4 py-2 rounded ${paymentMethod === 'fastag' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//             onClick={() => setPaymentMethod('fastag')}
//           >
//             FASTag
//           </button>
//           <button
//             className={`px-4 py-2 rounded ${paymentMethod === 'manual' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
//             onClick={() => setPaymentMethod('manual')}
//           >
//             Manual
//           </button>
//         </div>
//       </div>
//       {paymentMethod === 'fastag' ? (
//         <FASTagPayment onPaymentComplete={handlePaymentComplete} />
//       ) : (
//         <ManualPayment onPaymentComplete={handlePaymentComplete} />
//       )}
//       {lastTransactionId && (
//         <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
//           Payment processed successfully. Transaction ID: {lastTransactionId}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TollCollection;