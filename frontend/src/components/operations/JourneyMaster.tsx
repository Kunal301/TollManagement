import React, { useState, useEffect } from 'react'
import { Search, X, ChevronLeft, ChevronRight, Copy, Edit2, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface JourneyType {
  id: number
  type: string
}

export default function JourneyMaster() {
  const [searchTerm, setSearchTerm] = useState('')
  const [newJourneyType, setNewJourneyType] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(50)
  const [journeyTypes, setJourneyTypes] = useState<JourneyType[]>([
    { id: 1, type: 'Panelty' }
  ])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editValue, setEditValue] = useState('')
const navigate = useNavigate();
  useEffect(() => {
    // Reset to first page when search term changes
    setCurrentPage(1)
  }, [searchTerm])

  const handleAddJourney = () => {
    if (newJourneyType.trim()) {
      setJourneyTypes(prev => [...prev, {
        id: Math.max(0, ...prev.map(j => j.id)) + 1,
        type: newJourneyType.trim()
      }])
      setNewJourneyType('')
    }
  }

  const handleEdit = (id: number) => {
    const journeyType = journeyTypes.find(j => j.id === id)
    if (journeyType) {
      setEditingId(id)
      setEditValue(journeyType.type)
    }
  }

  const handleSaveEdit = () => {
    if (editingId !== null) {
      setJourneyTypes(prev => prev.map(j => 
        j.id === editingId ? { ...j, type: editValue.trim() } : j
      ))
      setEditingId(null)
      setEditValue('')
    }
  }

  const filteredJourneyTypes = journeyTypes.filter(journey =>
    journey.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const pageCount = Math.ceil(filteredJourneyTypes.length / rowsPerPage)
  const displayedJourneyTypes = filteredJourneyTypes.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  )

  return (
    <div className="p-6">
      {/* New Journey Master Input */}
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center text-gray-700 hover:text-gray-900 mb-4"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        <span>Back to Dashboard</span>
      </button>
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex items-center gap-4">
          <span className="text-gray-600 min-w-[150px]">New Journey Master :</span>
          <input
            type="text"
            placeholder="Journey Type"
            className="border rounded-lg px-3 py-2 flex-1"
            value={newJourneyType}
            onChange={(e) => setNewJourneyType(e.target.value)}
          />
          <button
            onClick={() => setNewJourneyType('')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
          <button
            onClick={handleAddJourney}
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

      {/* Journey Types Table */}
      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3 text-left">So No</th>
              <th className="px-4 py-3 text-left">Journey Type</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedJourneyTypes.map((journey) => (
              <tr key={journey.id} className="border-b">
                <td className="px-4 py-3">{journey.id}</td>
                <td className="px-4 py-3">
                  {editingId === journey.id ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    journey.type
                  )}
                </td>
                <td className="px-4 py-3">
                  {editingId === journey.id ? (
                    <button
                      onClick={handleSaveEdit}
                      className="text-green-500 hover:text-green-600"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(journey.id)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <Edit2 className="h-4 w-4" />
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
            0 of {filteredJourneyTypes.length} row(s) selected.
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