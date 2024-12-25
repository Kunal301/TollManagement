// 'use client'

// import React, { useState, useEffect } from 'react'
// import { ArrowLeft, Scale } from 'lucide-react'
// import { useNavigate } from 'react-router-dom'

// interface VehicleEntry {
//   vehicleNo: string
//   vehicleType: string
//   journeyType: string
//   vehicleWeight: string
//   price: number
//   boothNo: string
// }

// export default function VehicleEntryForm() {
//   const navigate = useNavigate()
//   const [formData, setFormData] = useState<VehicleEntry>({
//     vehicleNo: '',
//     vehicleType: 'Car/Jeep',
//     journeyType: 'Penalty',
//     vehicleWeight: '0000',
//     price: 0,
//     boothNo: 'Booth 6'
//   })

//   const [isLoading, setIsLoading] = useState(false)

//   // Fetch price when vehicle type or journey type changes
//   useEffect(() => {
//     const calculatePrice = async () => {
//       try {
//         // In real implementation, this would be an API call
//         // For now, using mock data
//         const mockPrices: Record<string, number> = {
//           'Car/Jeep': 160,
//           'Lcv': 260,
//           'Bus Truck': 550,
//           '3 Axle': 600,
//           'Mav': 860
//         }
//         setFormData(prev => ({
//           ...prev,
//           price: mockPrices[prev.vehicleType] || 0
//         }))
//       } catch (error) {
//         console.error('Error calculating price:', error)
//       }
//     }

//     calculatePrice()
//   }, [formData.vehicleType, formData.journeyType])

//   const handleSubmit = async () => {
//     setIsLoading(true)
//     try {
//       // In real implementation, this would be an API call
//       // For now, just simulating the print and save operation
//       const transactionId = `TRX${Date.now()}`
//       console.log('Printing ticket...', { ...formData, transactionId })
      
//       // Reset form after successful submission
//       setFormData({
//         vehicleNo: '',
//         vehicleType: 'Car/Jeep',
//         journeyType: 'Panelty',
//         vehicleWeight: '0000',
//         price: 160,
//         boothNo: 'Booth 6'
//       })
//     } catch (error) {
//       console.error('Error submitting form:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <div className="bg-white px-4 py-3 flex items-center gap-4 shadow">
//         <button
//           onClick={() => navigate(-1)}
//           className="p-1 rounded-full hover:bg-gray-100"
//         >
//           <ArrowLeft className="h-6 w-6" />
//         </button>
//         <h1 className="text-xl font-semibold">{formData.boothNo}</h1>
//       </div>

//       {/* Form */}
//       <div className="p-4 max-w-md mx-auto space-y-6">
//         <div className="space-y-2">
//           <label className="block text-sm font-medium text-gray-700">
//             VEHICLE NO
//           </label>
//           <input
//             type="text"
//             value={formData.vehicleNo}
//             onChange={(e) => setFormData({ ...formData, vehicleNo: e.target.value })}
//             className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter vehicle number"
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="block text-sm font-medium text-gray-700">
//             VEHICLE TYPE
//           </label>
//           <select
//             value={formData.vehicleType}
//             onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
//             className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="Car/Jeep">Car/Jeep</option>
//             <option value="Lcv">Lcv</option>
//             <option value="Bus Truck">Bus Truck</option>
//             <option value="3 Axle">3 Axle</option>
//             <option value="Mav">Mav</option>
//           </select>
//         </div>

//         <div className="space-y-2">
//           <label className="block text-sm font-medium text-gray-700">
//             JOURNEY TYPE
//           </label>
//           <select
//             value={formData.journeyType}
//             onChange={(e) => setFormData({ ...formData, journeyType: e.target.value })}
//             className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="Penalty">Penalty</option>
//             <option value="Overweight">Overweight</option>
//           </select>
//         </div>

//         <div className="space-y-2">
//           <label className="block text-sm font-medium text-gray-700">
//             VEHICLE WT:
//           </label>
//           <div className="relative">
//             <input
//               type="text"
//               value={formData.vehicleWeight}
//               onChange={(e) => setFormData({ ...formData, vehicleWeight: e.target.value })}
//               className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <Scale className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//           </div>
//         </div>

//         <div className="pt-4">
//           <div className="text-lg font-semibold">
//             PRICE : {formData.price}
//           </div>
//         </div>

//         <button
//           onClick={handleSubmit}
//           disabled={isLoading}
//           className="w-full bg-black text-white p-4 rounded-full font-medium disabled:opacity-50"
//         >
//           {isLoading ? 'Processing...' : 'PRINT'}
//         </button>
//       </div>
//     </div>
//   )
// }

