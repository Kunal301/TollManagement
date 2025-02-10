import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, ChevronLeft, ChevronRight, Copy , ArrowLeft} from 'lucide-react'

interface FeeRule {
  id: number
  vehicleType: string
  journeyType: string
  amount: number
}

export default function TollPlazaFeeRules() {
  const [searchTerm, setSearchTerm] = useState('')
  const [newVehicleType, setNewVehicleType] = useState('')
  const [newJourneyType, setNewJourneyType] = useState('')
  const [newAmount, setNewAmount] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(50)
  const [feeRules, setFeeRules] = useState<FeeRule[]>([
    { id: 1, vehicleType: 'Car/Jeep', journeyType: 'Penalty', amount: 160 },
    { id: 2, vehicleType: 'Lcv', journeyType: 'Penalty', amount: 260 },
    { id: 3, vehicleType: 'Bus Truck', journeyType: 'Penalty', amount: 550 },
    { id: 4, vehicleType: '3 Axle', journeyType: 'Penalty', amount: 600 },
    { id: 5, vehicleType: 'Mav', journeyType: 'Penalty', amount: 860 }
  ])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editValue, setEditValue] = useState({ vehicleType: '', journeyType: '', amount: '' })
const navigate = useNavigate();
  const vehicleTypes = ['Car/Jeep', 'Lcv', 'Bus Truck', '3 Axle', 'Mav']
  const journeyTypes = ['Penalty']

  const handleAddFeeRule = () => {
    if (newVehicleType && newJourneyType && newAmount) {
      setFeeRules(prev => [...prev, {
        id: Math.max(0, ...prev.map(f => f.id)) + 1,
        vehicleType: newVehicleType,
        journeyType: newJourneyType,
        amount: Number(newAmount)
      }])
      setNewVehicleType('')
      setNewJourneyType('')
      setNewAmount('')
    }
  }

  const handleEdit = (id: number) => {
    const feeRule = feeRules.find(f => f.id === id)
    if (feeRule) {
      setEditingId(id)
      setEditValue({
        vehicleType: feeRule.vehicleType,
        journeyType: feeRule.journeyType,
        amount: feeRule.amount.toString()
      })
    }
  }

  const handleSaveEdit = () => {
    if (editingId !== null && editValue.amount) {
      setFeeRules(prev => prev.map(f =>
        f.id === editingId ? {
          ...f,
          vehicleType: editValue.vehicleType,
          journeyType: editValue.journeyType,
          amount: Number(editValue.amount)
        } : f
      ))
      setEditingId(null)
      setEditValue({ vehicleType: '', journeyType: '', amount: '' })
    }
  }

  const filteredFeeRules = feeRules.filter(rule =>
    rule.vehicleType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.journeyType.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const pageCount = Math.ceil(filteredFeeRules.length / rowsPerPage)
  const displayedFeeRules = filteredFeeRules.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  )

  return (
    <div className="p-6">
      {/* New Toll Fee Input */}
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center text-gray-700 hover:text-gray-900 mb-4"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        <span>Back to Dashboard</span>
      </button>
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex items-center gap-4">
          <span className="text-gray-600 min-w-[100px]">New Toll Fee :</span>
          <select
            className="border rounded-lg px-3 py-2 flex-1"
            value={newVehicleType}
            onChange={(e) => setNewVehicleType(e.target.value)}
          >
            <option value="">Vehicle Type</option>
            {vehicleTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select
            className="border rounded-lg px-3 py-2 flex-1"
            value={newJourneyType}
            onChange={(e) => setNewJourneyType(e.target.value)}
          >
            <option value="">Journey Type</option>
            {journeyTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="0"
            className="border rounded-lg px-3 py-2 w-24"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
          />
          <button
            onClick={() => {
              setNewVehicleType('')
              setNewJourneyType('')
              setNewAmount('')
            }}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
          <button
            onClick={handleAddFeeRule}
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

      {/* Fee Rules Table */}
      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3 text-left">So No</th>
              <th className="px-4 py-3 text-left">Vehicle Type</th>
              <th className="px-4 py-3 text-left">Journey Type</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedFeeRules.map((rule) => (
              <tr key={rule.id} className="border-b">
                <td className="px-4 py-3">{rule.id}</td>
                <td className="px-4 py-3">
                  {editingId === rule.id ? (
                    <select
                      value={editValue.vehicleType}
                      onChange={(e) => setEditValue({ ...editValue, vehicleType: e.target.value })}
                      className="border rounded px-2 py-1 w-full"
                    >
                      {vehicleTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  ) : (
                    rule.vehicleType
                  )}
                </td>
                <td className="px-4 py-3">
                  {editingId === rule.id ? (
                    <select
                      value={editValue.journeyType}
                      onChange={(e) => setEditValue({ ...editValue, journeyType: e.target.value })}
                      className="border rounded px-2 py-1 w-full"
                    >
                      {journeyTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  ) : (
                    rule.journeyType
                  )}
                </td>
                <td className="px-4 py-3">
                  {editingId === rule.id ? (
                    <input
                      type="number"
                      value={editValue.amount}
                      onChange={(e) => setEditValue({ ...editValue, amount: e.target.value })}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    rule.amount
                  )}
                </td>
                <td className="px-4 py-3">
                  {editingId === rule.id ? (
                    <button
                      onClick={handleSaveEdit}
                      className="text-green-500 hover:text-green-600"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(rule.id)}
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
            0 of {filteredFeeRules.length} row(s) selected.
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