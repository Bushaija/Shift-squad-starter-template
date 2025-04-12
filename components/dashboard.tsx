"use client"

import { useState } from "react"
import { Bell, Home, Calendar, User, Briefcase } from "lucide-react"

export default function ShiftManagementApp() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      {/* iPhone frame */}
      <div className="relative w-[320px] h-[650px] bg-white rounded-[40px] overflow-hidden border-8 border-black shadow-xl">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[150px] h-[30px] bg-black rounded-b-[14px] z-10"></div>

        {/* Status bar */}
        <div className="relative pt-8 px-5 pb-2 flex justify-between items-center text-xs">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <span className="block w-4 h-4 rounded-full border-2 border-black"></span>
            <span className="block w-4 h-4 rounded-full border-2 border-black"></span>
          </div>
        </div>

        {/* App content */}
        <div className="h-[calc(100%-110px)] overflow-y-auto px-5">
          {/* Header */}
          <div className="pt-2 pb-4">
            <p className="text-gray-500 text-sm">Good Morning</p>
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold">Brooklyn Simmons</h1>
              <div className="relative">
                <Bell className="h-5 w-5 text-gray-500" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full"></span>
              </div>
            </div>
          </div>

          {/* Stats cards */}
          <div className="mb-6">
            <div className="border rounded-xl p-4 mb-3">
              <p className="text-center text-3xl font-bold text-teal-500">00</p>
              <p className="text-center text-sm text-gray-600">Scheduled Shifts</p>
            </div>

            <div className="flex gap-3">
              <div className="flex-1 border rounded-xl p-4">
                <p className="text-center text-3xl font-bold">00</p>
                <p className="text-center text-sm text-gray-600">Worked Shifts</p>
              </div>
              <div className="flex-1 border rounded-xl p-4">
                <p className="text-center text-3xl font-bold text-red-500">00</p>
                <p className="text-center text-sm text-gray-600">Cancelled Shifts</p>
              </div>
            </div>
          </div>

          {/* Chart section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Shifts Worked</h2>
              <span className="text-xs text-gray-500">This Month</span>
            </div>

            <div className="flex items-end justify-between h-[120px]">
              <div className="flex flex-col items-center">
                <div className="w-8 bg-gray-200 rounded-t-md" style={{ height: "30px" }}></div>
                <span className="text-xs text-gray-500 mt-1">Jun</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 bg-gray-200 rounded-t-md" style={{ height: "15px" }}></div>
                <span className="text-xs text-gray-500 mt-1">Jul</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 bg-gray-200 rounded-t-md" style={{ height: "20px" }}></div>
                <span className="text-xs text-gray-500 mt-1">Aug</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 bg-purple-500 rounded-t-md" style={{ height: "90px" }}></div>
                <span className="text-xs text-gray-500 mt-1">Sep</span>
                <span className="text-xs">•</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 bg-gray-200 rounded-t-md" style={{ height: "0px" }}></div>
                <span className="text-xs text-gray-500 mt-1">Oct</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 bg-gray-200 rounded-t-md" style={{ height: "0px" }}></div>
                <span className="text-xs text-gray-500 mt-1">Nov</span>
              </div>
            </div>
          </div>

          {/* Wallet section */}
          <div>
            <h2 className="font-semibold mb-4">My Wallet</h2>
            <div className="flex gap-3">
              <div className="flex-1 border rounded-xl p-4 flex flex-col items-center">
                <p className="text-center text-xl font-bold text-purple-500">$0</p>
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mt-2">
                  <Home className="h-4 w-4 text-purple-500" />
                </div>
              </div>
              <div className="flex-1 border rounded-xl p-4 flex flex-col items-center">
                <p className="text-center text-xl font-bold text-purple-500">$0</p>
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mt-2">
                  <Briefcase className="h-4 w-4 text-gray-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom navigation */}
        <div className="absolute bottom-0 left-0 right-0 h-[70px] border-t flex justify-around items-center bg-white px-4">
          <button className="flex flex-col items-center" onClick={() => setActiveTab("home")}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${activeTab === "home" ? "bg-purple-100" : ""}`}
            >
              <Home className={`h-5 w-5 ${activeTab === "home" ? "text-purple-500" : "text-gray-400"}`} />
            </div>
            <span className={`text-xs ${activeTab === "home" ? "text-purple-500" : "text-gray-400"}`}>Home</span>
          </button>

          <button className="flex flex-col items-center" onClick={() => setActiveTab("shifts")}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${activeTab === "shifts" ? "bg-purple-100" : ""}`}
            >
              <Briefcase className={`h-5 w-5 ${activeTab === "shifts" ? "text-purple-500" : "text-gray-400"}`} />
            </div>
            <span className={`text-xs ${activeTab === "shifts" ? "text-purple-500" : "text-gray-400"}`}>Shifts</span>
          </button>

          <button className="flex flex-col items-center" onClick={() => setActiveTab("schedule")}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${activeTab === "schedule" ? "bg-purple-100" : ""}`}
            >
              <Calendar className={`h-5 w-5 ${activeTab === "schedule" ? "text-purple-500" : "text-gray-400"}`} />
            </div>
            <span className={`text-xs ${activeTab === "schedule" ? "text-purple-500" : "text-gray-400"}`}>
              Schedule
            </span>
          </button>

          <button className="flex flex-col items-center" onClick={() => setActiveTab("profile")}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${activeTab === "profile" ? "bg-purple-100" : ""}`}
            >
              <User className={`h-5 w-5 ${activeTab === "profile" ? "text-purple-500" : "text-gray-400"}`} />
            </div>
            <span className={`text-xs ${activeTab === "profile" ? "text-purple-500" : "text-gray-400"}`}>Profile</span>
          </button>
        </div>
      </div>
    </div>
  )
}
