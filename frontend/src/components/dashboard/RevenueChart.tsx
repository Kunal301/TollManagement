import React from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useRevenueTransactions } from '../../contexts/RevenueTransactionContext'
import { useTollPlazas } from '../../contexts/TollPlazaContext'

export default function RevenueChart() {
  const { transactions } = useRevenueTransactions()
  const { plazas } = useTollPlazas()

  const revenueByPlaza = plazas.map(plaza => {
    const revenue = transactions
      .filter(t => t.plazaId === plaza.id)
      .reduce((sum, t) => sum + t.amount, 0)
    return { name: plaza.name, revenue }
  })

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Revenue by Plaza</h2>
      <p className="text-sm text-gray-600 mb-4">Today's revenue breakdown by toll plaza</p>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={revenueByPlaza}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}