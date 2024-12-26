"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Scale, Printer } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../../services/api";

interface VehicleEntry {
  vehicleNo: string;
  vehicleType: string;
  journeyType: string;
  vehicleWeight: string;
  amount: number;
  boothNo: string;
}

interface TransactionData extends VehicleEntry {
  _id: string;
  ticketNumber: number;
  transactionId: string;
  createdAt: string;
  updatedAt: string;
}

export default function BoothAndVehicleForm() {
  const navigate = useNavigate();
  const [selectedBooth, setSelectedBooth] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showReceipt, setShowReceipt] = useState<boolean>(false);
  const receiptRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<VehicleEntry>({
    vehicleNo: "",
    vehicleType: "Car/Jeep",
    journeyType: "Regular",
    vehicleWeight: "0000",
    amount: 0,
    boothNo: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [transactionData, setTransactionData] = useState<TransactionData | null>(null);

  const handleBoothSelect = () => {
    if (selectedBooth) {
      setShowForm(true);
      setFormData((prev) => ({ ...prev, boothNo: selectedBooth }));
    } else {
      alert("Please select a booth first!!");
    }
  };

  useEffect(() => {
    const calculatePrice = async () => {
      try {
        const mockPrices: Record<string, number> = {
          "Car/Jeep": 160,
          Lcv: 260,
          "Bus Truck": 550,
          "3 Axle": 600,
          Mav: 860,
        };

        const penaltyPrices: Record<string, number> = {
          "Car/Jeep": 50,
          Lcv: 100,
          "Bus Truck": 150,
          "3 Axle": 200,
          Mav: 360,
        };

        const overweightPrices: Record<string, number> = {
          "Car/Jeep": 100,
          Lcv: 150,
          "Bus Truck": 250,
          "3 Axle": 300,
          Mav: 500,
        };

        let basePrice = mockPrices[formData.vehicleType] || 0;
        let additionalPrice = 0;

        if (formData.journeyType === "Penalty") {
          additionalPrice = penaltyPrices[formData.vehicleType] || 0;
        } else if (formData.journeyType === "Overweight") {
          additionalPrice = overweightPrices[formData.vehicleType] || 0;
        }

        setFormData((prev) => ({
          ...prev,
          amount: basePrice + additionalPrice,
        }));
      } catch (error) {
        console.error("Error calculating price:", error);
      }
    };

    calculatePrice();
  }, [formData.vehicleType, formData.journeyType]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await api.post<TransactionData>('/api/transactions', formData);
      console.log('Raw transaction response:', response.data);
      setTransactionData(response.data);
      setShowReceipt(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error creating transaction. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    if (receiptRef.current) {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write("<html><head><title>Toll Receipt</title>");
        printWindow.document.write("<style>");
        printWindow.document.write(`
          @media print {
            body { 
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              font-size: 10px; /* Reduced font size */
            }
            .receipt { 
              max-width: 80mm;
              margin: 0 auto;
              padding: 5mm; /* Reduced padding */
              box-sizing: border-box;
            }
            h2 { 
              text-align: center;
              margin-bottom: 3mm; /* Reduced margin */
              font-size: 14px; /* Adjusted heading size */
            }
            p { 
              margin: 1mm 0; /* Reduced margin */
              text-align: left;
            }
            .center {
              text-align: center;
            }
            .bold {
              font-weight: bold;
            }
            .footer {
              margin-top: 3mm;
              text-align: center;
              font-size: 9px;
              width: 100%; /* Ensure full width */
            }
            .footer p {
              margin: 0; /* Remove default paragraph margins */
              text-align: center; /* Explicitly set text alignment for footer paragraphs */
            }
          }
        `);
        printWindow.document.write("</style></head><body>");
        printWindow.document.write('<div class="receipt">');
        printWindow.document.write(receiptRef.current.innerHTML);
        printWindow.document.write("</div></body></html>");
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const handleNewEntry = () => {
    setFormData({
      vehicleNo: "",
      vehicleType: "Car/Jeep",
      journeyType: "Regular",
      vehicleWeight: "0000",
      amount: 160,
      boothNo: formData.boothNo,
    });
    setShowReceipt(false);
    setTransactionData(null);
  };

  const formatDate = (dateString: string) => {
    console.log("Received date string:", dateString);
    
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      console.error("Invalid date string:", dateString);
      return "Invalid Date";
    }

    return date.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white px-4 py-3 flex items-center gap-4 shadow mb-4">
        <button
          onClick={() => navigate(-1)}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold">
          {selectedBooth ? selectedBooth : "Select Booth"}
        </h1>
      </div>

      {!showForm ? (
        <div className="max-w-md mx-auto space-y-6">
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-700">
              Select Booth No
            </label>
            <select
              value={selectedBooth || ""}
              onChange={(e) => setSelectedBooth(e.target.value)}
              className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            >
              <option value="">Select Booth</option>
              <option value="Booth 6">Booth 6</option>
              <option value="Booth 7">Booth 7</option>
            </select>
          </div>

          <button
            onClick={handleBoothSelect}
            className="w-full bg-blue-500 text-white p-4 rounded-full font-medium text-lg"
          >
            Select
          </button>
        </div>
      ) : showReceipt && transactionData ? (
        <div className="max-w-md mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-center mb-4">
              Toll Receipt
            </h2>
          <div ref={receiptRef} className="bg-white p-6 rounded-lg shadow-md">
          
            <div className="space-y-2">
              <p className="center bold">
                National Highways Authority of India
              </p>
              <br></br>
              <p>
                <span className="bold">Ticket No. :</span> {transactionData.ticketNumber}
              </p>
              <p>
                <span className="bold">Booth No:</span> {transactionData.boothNo}
              </p>
              <p>
                <span className="bold">Date & Time:</span> {formatDate(transactionData.createdAt)}
              </p>
              <p>
                <span className="bold">Vehicle No:</span> {transactionData.vehicleNo}
              </p>
              <p>
                <span className="bold">Type of Vehicle:</span> {transactionData.vehicleType}
              </p>
              <p>
                <span className="bold">Type of Journey:</span> {transactionData.journeyType}
              </p>
              <p>
                <span className="bold">Method Of:</span> Cash
              </p>
              <p>
                <span className="bold">Fee With Penalty:</span> ₹{transactionData.amount}
              </p>
              ------------------------------------------------------------------------
              <p className="center">Only for Overloaded Vehicle</p>
              
              <p>
                <span className="bold">Actual Wt of Vehicle :</span> {transactionData.vehicleWeight}
              </p>
              <p>
                <span className="bold">Overloaded Vehicle Fees :</span> 0
              </p>
              <p>
                <span className="bold">Collect Fees :</span> 0
              </p>
            </div>
            --------------------------------------------------------------------------
            <div className="mt-6 text-sm text-gray-500 footer text-center">
              <p>All Toll Payments via FASTag Only.</p>
              <p>w.e.f 15th December 2019</p>
              <p>Wish You Safe & Happy Journey</p>
            </div>
          </div>
          <button
            onClick={handlePrint}
            className="w-full bg-blue-500 text-white p-4 rounded-full font-medium flex items-center justify-center"
          >
            <Printer className="mr-2" /> Print Receipt
          </button>
          <button
            onClick={handleNewEntry}
            className="w-full bg-gray-300 text-gray-800 p-4 rounded-full font-medium"
          >
            New Entry
          </button>
        </div>
      ) : (
        <div className="max-w-md mx-auto space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              VEHICLE NO
            </label>
            <input
              type="text"
              value={formData.vehicleNo}
              onChange={(e) =>
                setFormData({ ...formData, vehicleNo: e.target.value })
              }
              className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter vehicle number"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              VEHICLE TYPE
            </label>
            <select
              value={formData.vehicleType}
              onChange={(e) =>
                setFormData({ ...formData, vehicleType: e.target.value })
              }
              className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Car/Jeep">Car/Jeep</option>
              <option value="Lcv">Lcv</option>
              <option value="Bus Truck">Bus Truck</option>
              <option value="3 Axle">3 Axle</option>
              <option value="Mav">Mav</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              JOURNEY TYPE
            </label>
            
            <select
              value={formData.journeyType}
              onChange={(e) => {
                console.log("Journey Type Changed:", e.target.value);
                setFormData({ ...formData, journeyType: e.target.value });
              }}
              className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Regular">Regular</option>
              <option value="Penalty">Penalty</option>
              <option value="Overweight">Overweight</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              VEHICLE WT:
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.vehicleWeight}
                onChange={(e) =>
                  setFormData({ ...formData, vehicleWeight: e.target.value })
                }
                className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Scale className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="pt-4">
            <div className="text-lg font-semibold">
              AMOUNT : {formData.amount}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-black text-white p-4 rounded-full font-medium disabled:opacity-50"
          >
            {isLoading ? "Processing..." : "PRINT"}
          </button>
        </div>
      )}
    </div>
  );
}