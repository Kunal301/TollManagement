// import React, { useState } from 'react';
// import Layout from '../common/Layout';
// // import OfflineMode from '../operations/OfflineMode';
// import VehicleClassification from '../operations/VehicleClassification';
// import OverloadedVehicleCheck from '../operations/OverloadedVehicleCheck';
// import ReceiptPrinter from '../operations/ReceiptPrinter';
// // import VehicleEntryForm from './TollCollection/VehicleEntryForm';

// interface VehicleType {
//   id: string;
//   name: string;
//   description: string;
//   baseRate: number;
// }

// const TollOperations: React.FC = () => {
//   const [selectedVehicle, setSelectedVehicle] = useState<VehicleType | null>(null);
//   const [overloadFee, setOverloadFee] = useState<number>(0);
//   const [receiptData, setReceiptData] = useState<any | null>(null);

//   const handleVehicleClassification = (vehicle: VehicleType) => {
//     setSelectedVehicle(vehicle);
//   };

//   const handleOverloadDetection = (fee: number) => {
//     setOverloadFee(fee);
//   };

//   const handleSyncData = () => {
//     console.log('Syncing offline data...');
//     // Implement your sync logic here
//     alert('Offline data synced successfully!');
//   };

//   const handleProcessTransaction = () => {
//     if (selectedVehicle) {
//       const totalAmount = selectedVehicle.baseRate + overloadFee;
//       const receipt = {
//         transactionId: `T${Date.now()}`,
//         vehicleType: selectedVehicle.name,
//         baseRate: selectedVehicle.baseRate,
//         overloadFee: overloadFee,
//         totalAmount: totalAmount,
//         timestamp: new Date().toISOString(),
//       };
//       setReceiptData(receipt);
//       alert('Transaction processed successfully!');
//     }
//   };

//   return (
//     <Layout>
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-6">Toll Operations</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* <OfflineMode onSyncData={handleSyncData} /> */}
//           {/* <VehicleEntryForm /> */}
//           <VehicleClassification onClassify={handleVehicleClassification} />
//           <OverloadedVehicleCheck onOverloadDetected={handleOverloadDetection} />
//           {selectedVehicle && (
//             <div className="bg-white shadow-md rounded-lg p-6">
//               <h2 className="text-2xl font-bold mb-4">Transaction Summary</h2>
//               <p>Vehicle Type: {selectedVehicle.name}</p>
//               <p>Base Rate: ₹{selectedVehicle.baseRate}</p>
//               <p>Overload Fee: ₹{overloadFee}</p>
//               <p>Total: ₹{selectedVehicle.baseRate + overloadFee}</p>
//               <button
//                 onClick={handleProcessTransaction}
//                 className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               >
//                 Process Transaction
//               </button>
//             </div>
//           )}
//           {receiptData && (
//             <div className="printable">
//               <ReceiptPrinter receiptData={receiptData} />
//             </div>
//           )}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default TollOperations;