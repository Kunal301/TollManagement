import React, { useState } from 'react'
import { Search, X, ChevronLeft, ChevronRight, Copy } from 'lucide-react'

interface VehicleType {
  id: number
  type: string
  weight: string
}

export default function VehicleMaster() {
  const [searchTerm, setSearchTerm] = useState('')
  const [newVehicleType, setNewVehicleType] = useState('')
  const [newVehicleWeight, setNewVehicleWeight] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(50)
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([
    { id: 1, type: 'Car/Jeep', weight: '0000' },
    { id: 2, type: 'Lcv', weight: '0000' },
    { id: 3, type: 'Bus Truck', weight: '0000' },
    { id: 4, type: '3 Axle', weight: '0000' },
    { id: 5, type: 'Mav', weight: '0000' }
  ])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editValue, setEditValue] = useState({ type: '', weight: '' })

  const handleAddVehicle = () => {
    if (newVehicleType.trim()) {
      setVehicleTypes(prev => [...prev, {
        id: Math.max(0, ...prev.map(v => v.id)) + 1,
        type: newVehicleType.trim(),
        weight: newVehicleWeight.trim()
      }])
      setNewVehicleType('')
      setNewVehicleWeight('')
    }
  }

  const handleEdit = (id: number) => {
    const vehicleType = vehicleTypes.find(v => v.id === id)
    if (vehicleType) {
      setEditingId(id)
      setEditValue({ type: vehicleType.type, weight: vehicleType.weight })
    }
  }

  const handleSaveEdit = () => {
    if (editingId !== null) {
      setVehicleTypes(prev => prev.map(v => 
        v.id === editingId ? { ...v, type: editValue.type.trim(), weight: editValue.weight.trim() } : v
      ))
      setEditingId(null)
      setEditValue({ type: '', weight: '' })
    }
  }

  const filteredVehicleTypes = vehicleTypes.filter(vehicle =>
    vehicle.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const pageCount = Math.ceil(filteredVehicleTypes.length / rowsPerPage)
  const displayedVehicleTypes = filteredVehicleTypes.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  )

  return (
    <div className="p-6">
      {/* New Vehicle Master Input */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex items-center gap-4">
          <span className="text-gray-600 min-w-[150px]">New Vehicle Master :</span>
          <input
            type="text"
            placeholder="Vehicle Type"
            className="border rounded-lg px-3 py-2 flex-1"
            value={newVehicleType}
            onChange={(e) => setNewVehicleType(e.target.value)}
          />
          <input
            type="text"
            placeholder="Vehicle Weight"
            className="border rounded-lg px-3 py-2 flex-1"
            value={newVehicleWeight}
            onChange={(e) => setNewVehicleWeight(e.target.value)}
          />
          <button
            onClick={() => {
              setNewVehicleType('')
              setNewVehicleWeight('')
            }}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
          <button
            onClick={handleAddVehicle}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Copy className="h-5 w-5 text-blue-500" />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <input
            type="text"
            placeholder="search"
            className="pl-10 pr-4 py-2 w-full border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          )}
        </div>
      </div>

      {/* Vehicle Types Table */}
      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3 text-left">So No</th>
              <th className="px-4 py-3 text-left">Vehicle Type</th>
              <th className="px-4 py-3 text-left">Vehicle Weight</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedVehicleTypes.map((vehicle) => (
              <tr key={vehicle.id} className="border-b">
                <td className="px-4 py-3">{vehicle.id}</td>
                <td className="px-4 py-3">
                  {editingId === vehicle.id ? (
                    <input
                      type="text"
                      value={editValue.type}
                      onChange={(e) => setEditValue({ ...editValue, type: e.target.value })}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    vehicle.type
                  )}
                </td>
                <td className="px-4 py-3">
                  {editingId === vehicle.id ? (
                    <input
                      type="text"
                      value={editValue.weight}
                      onChange={(e) => setEditValue({ ...editValue, weight: e.target.value })}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    vehicle.weight
                  )}
                </td>
                <td className="px-4 py-3">
                  {editingId === vehicle.id ? (
                    <button
                      onClick={handleSaveEdit}
                      className="text-green-500 hover:text-green-600"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(vehicle.id)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-4 py-3 border-t flex items-center justify-between text-sm text-gray-600">
          <div>
            0 of {filteredVehicleTypes.length} row(s) selected.
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span>Rows per page</span>
              <select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                className="border rounded px-2 py-1"
              >
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={200}>200</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span>Page {currentPage} of {pageCount}</span>
              <div className="flex gap-1">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(pageCount, prev + 1))}
                  disabled={currentPage === pageCount}
                  className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}