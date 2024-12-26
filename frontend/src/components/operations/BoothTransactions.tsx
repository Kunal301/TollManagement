import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, ChevronLeft, ChevronRight } from 'lucide-react'
import axios from 'axios'
import api from "../../services/api";

interface Transaction {
  _id: string
  transactionId: string
  vehicleNo: string
  boothNo: string
  vehicleType: string
  journeyType: string
  vehicleWeight: string
  amount: number
  timestamp: string
}

export default function BoothTransaction() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(50)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTransactions()
  }, [])

  useEffect(() => {
    filterTransactions()
  }, [searchTerm, fromDate, toDate, transactions])

  const fetchTransactions = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await api.get('/api/transactions')
      setTransactions(response.data)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(`Failed to fetch transactions: ${err.message}`)
      } else {
        setError('An unexpected error occurred')
      }
      console.error('Error fetching transactions:', err)
    }
    setIsLoading(false)
  }

  const filterTransactions = () => {
    let filtered = transactions

    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (fromDate && toDate) {
      filtered = filtered.filter(t => {
        const transactionDate = new Date(t.timestamp)
        return transactionDate >= new Date(fromDate) && transactionDate <= new Date(toDate)
      })
    }

    setFilteredTransactions(filtered)
  }

  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex)

  const handleRemove = async (id: string) => {
    try {
      await api.delete(`/api/transactions/${id}`)
      setTransactions(prev => prev.filter(t => t._id !== id))
    } catch (err) {
      console.error('Error removing transaction:', err)
      alert('Failed to remove transaction')
    }
  }

  const handleRevenue = () => {
    if (!fromDate || !toDate) {
      alert('Please select both From and To dates')
      return
    }
    navigate(`/revenue-report?from=${fromDate}&to=${toDate}`)
  }

  if (isLoading) return <div className="p-6">Loading...</div>
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <input
            type="text"
            placeholder="search by vehicle no."
            className="pl-10 pr-4 py-2 w-full border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">From:</span>
          <input
            type="datetime-local"
            className="border rounded-lg px-3 py-2"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">To:</span>
          <input
            type="datetime-local"
            className="border rounded-lg px-3 py-2"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <button
          onClick={() => {
            setSearchTerm('')
            setFromDate('')
            setToDate('')
          }}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
        <button
          onClick={handleRevenue}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Revenue
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3 text-left">S.No</th>
              <th className="px-4 py-3 text-left">Transaction Id</th>
              <th className="px-4 py-3 text-left">Vehicle No</th>
              <th className="px-4 py-3 text-left">Booth No</th>
              <th className="px-4 py-3 text-left">Vehicle Type</th>
              <th className="px-4 py-3 text-left">Journey Type</th>
              <th className="px-4 py-3 text-left">Vehicle Weight</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((transaction, index) => (
              <tr key={transaction._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{startIndex + index + 1}</td>
                <td className="px-4 py-3">{transaction.transactionId}</td>
                <td className="px-4 py-3">{transaction.vehicleNo}</td>
                <td className="px-4 py-3">{transaction.boothNo}</td>
                <td className="px-4 py-3">{transaction.vehicleType}</td>
                <td className="px-4 py-3">{transaction.journeyType}</td>
                <td className="px-4 py-3">{transaction.vehicleWeight}</td>
                <td className="px-4 py-3">{transaction.amount}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleRemove(transaction._id)}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 py-3 border-t flex items-center justify-between text-sm text-gray-600">
          <div>
            {filteredTransactions.length} row(s) found.
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
              <span>Page {currentPage} of {totalPages}</span>
              <div className="flex gap-1">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
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