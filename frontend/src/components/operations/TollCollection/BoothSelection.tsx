"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Scale, Printer } from "lucide-react";
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
  const [transactionData, setTransactionData] =
    useState<TransactionData | null>(null);

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
          "Car/Jeep": 80,
          Lcv: 120,
          "Bus Truck": 260,
          "3 Axle": 280,
          Mav: 410,
        };

        // const penaltyPrices: Record<string, number> = {
        //   "Car/Jeep": 50,
        //   Lcv: 100,
        //   "Bus Truck": 150,
        //   "3 Axle": 200,
        //   Mav: 360,
        // };

        const overweightPrices: Record<string, number> = {
          "Car/Jeep": 80,
          Lcv: 120,
          "Bus Truck": 260,
          "3 Axle": 280,
          Mav: 410,
        };

        let basePrice = mockPrices[formData.vehicleType] || 0;
        let additionalPrice = 0;

        // if (formData.journeyType === "Penalty") {
        //   additionalPrice = mockPrices[formData.vehicleType] || 0;
        // }
        if (formData.journeyType === "Overweight") {
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
      const response = await api.post<TransactionData>(
        "/api/transactions",
        formData
      );
      console.log("Raw transaction response:", response.data);
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
            font-family: Helvetica, sans-serif;
            margin: 0;
            padding: 0;
            width: 80mm;
            font-size: 8px;
            font-weight: 600;
            line-height: 0.9;

          }
          
         receipt {
            width: 100%;
            margin: 0 auto;
            // padding: 5mm;
          }
          .center{
          padding-left: 40px;
          }
          .center0{
                   padding-left: 30px;
          }
          .center1{
                    padding-left: 40px;
          }
          .center2{
                   padding-left: 30px;
          }
          .header {
            font-weight: 700;
            margin-bottom: 8px;
            font-size: 8px;
                    padding-left: 20px;

          }
          
          p {
            margin: 4px 0;
            
          }
          
          .separator {
            border: none;
            border-top: 1px dashed #000;
            margin: 8px 0;
          }
          
          .footer {
            margin-top: 8px;
            font-size: 8px;
margin-bottom:0px;
          }

          /* Hide the back button when printing */
          .no-print {
            display: none !important;
          }
        }

        /* Styles for the preview only (not printing) */
        .back-button {
          position: fixed;
          top: 20px;
          left: 20px;
          padding: 10px 20px;
          background-color: #2563eb;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-family: Arial, sans-serif;
          font-size: 14px;
        }
        
        `);
        printWindow.document.write("</style></head><body>");
        printWindow.document.write(
          '<button onclick="window.close()" class="back-button no-print">Back to Application</button>'
        );
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
      amount: 80,
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

    return date
      .toLocaleString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(",", " ,");
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
          <h2 className="text-3xl font-bold text-center mb-4">Toll Receipt</h2>
          <div ref={receiptRef} className="bg-white p-6 rounded-lg shadow-md">
          <pre>
            <div className="space-y-2">
            
              <div className="header">National Highways Authority of India</div>
             
              <p>Section          :  NH28A 1052</p>
              <p>Ticket No.       :  {transactionData.ticketNumber}</p>
              <p>Booth No.        :  {transactionData.boothNo}</p>
              <p>Date & Time      :  {formatDate(transactionData.createdAt)}</p>
              <p>Vehicle No.      :  {transactionData.vehicleNo}</p>
              <p>Type of Vehicle  :  {transactionData.vehicleType}</p>
              <p>Type of Journey  :  {transactionData.journeyType}</p>
              <p>Method Of        :  Cash</p>
              <p>Fee With Penalty :  ₹{transactionData.amount}</p>
              <div className="separator"></div>
              <p className="center">Only for Overloaded Vehicle</p>
              <p>Actual Wt of Vehicle    : {transactionData.vehicleWeight} KG</p>
              <p>Overloaded Vehicle Fees : 0</p>
              <p>Collect Fees            : 0</p>
            </div>
            <div className="separator"></div>
            <div className=" footer ">
              <p className="center0">All Toll Payments via FASTag Only.</p>
              <p className="center1">w.e.f 15th December 2019</p>
              <p className="center2">Wish You Safe & Happy Journey</p>
            </div>
            </pre>

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
