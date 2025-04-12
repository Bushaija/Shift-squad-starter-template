// "use client"

import { useState, useEffect } from "react"
import { View, SafeAreaView, ScrollView, RefreshControl } from "react-native"
import { StatusBar } from "expo-status-bar"
import { useSafeAreaInsets } from "react-native-safe-area-context"

// Import reusable dashboard components
import Header from "@/components/dashboard/Header"
import NextShift from "@/components/dashboard/NextShift"
import StatsCard from "@/components/dashboard/StatsCard"
import ChartSection from "@/components/dashboard/ChartSection"
import WalletCard from "@/components/dashboard/WalletCard"
import { Container } from "@/components/ui"

function ShiftManagementApp() {
  const insets = useSafeAreaInsets()
  const [refreshing, setRefreshing] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState(3) // September (index 3)
  const [stats, setStats] = useState({
    scheduledShifts: 12,
    workedShifts: 86,
    cancelledShifts: 3,
    currentMonthShifts: 20,
    pendingEarnings: 1250,
    totalEarnings: 4875
  })
  
  // Mock refresh function to simulate data loading
  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1500)
  }

  // Get current month name
  const getCurrentMonth = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December']
    const currentDate = new Date()
    return months[currentDate.getMonth()]
  }

  // Chart data
  const shiftsChartData = {
    bar: {
      data: {
        labels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
        datasets: [
          {
            data: [30, 15, 20, stats.currentMonthShifts, 0, 0],
            activeIndex: selectedMonth,
            colors: ['#e5e7eb', '#e5e7eb', '#e5e7eb', '#8B5CF6', '#e5e7eb', '#e5e7eb']
          },
        ],
        legend: ["Monthly Shifts"]
      }
    },
    line: {
      data: {
        labels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
        datasets: [
          {
            data: [30, 15, 20, stats.currentMonthShifts, 0, 0],
            strokeWidth: 4,
          },
        ],
        legend: ["Monthly Trend"]
      }
    },
    pie: {
      data: {
        labels: ["Completed", "Scheduled", "Cancelled"],
        datasets: [{
          data: [stats.workedShifts, stats.scheduledShifts, stats.cancelledShifts],
          colors: ['#3B82F6', '#0D9488', '#EF4444']
        }],
      }
    }
  }
  
  // Distribution data
  const distributionData = {
    pie: {
      data: {
        labels: ["Morning", "Afternoon", "Night"],
        datasets: [{
          data: [40, 35, 25],
          colors: ['#10B981', '#F59E0B', '#6366F1']
        }],
      }
    }
  }
  
  // Earnings trend data
  const earningsData = {
    line: {
      data: {
        labels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
        datasets: [{
          data: [1200, 800, 1800, 2500, 0, 0],
          strokeWidth: 4,
          colors: ['#10B981', '#10B981', '#10B981', '#10B981', '#10B981', '#10B981']
        }],
      }
    }
  }

  // Handle bar press to update selected month
  const handleBarPress = (value: number, index: number) => {
    setSelectedMonth(index)
    setStats(prev => ({
      ...prev,
      currentMonthShifts: value
    }))
  }

  // Shifts metrics
  const shiftMetrics = [
    {
      label: "AVERAGE",
      value: "18.75",
      valueClassName: "text-gray-800"
    },
    {
      label: "TARGET",
      value: "22",
      valueClassName: "text-gray-800"
    },
    {
      label: "TREND",
      value: "+5.3%",
      valueClassName: "text-green-500"
    }
  ]

  // Earnings metrics
  const earningsMetrics = [
    {
      label: "TOTAL EARNED",
      value: `$${stats.totalEarnings}`,
      valueClassName: "text-green-500"
    },
    {
      label: "MONTHLY AVG",
      value: "$1,625",
      valueClassName: "text-green-500"
    }
  ]

  // Wallet items
  const walletItems = [
    {
      title: "PENDING",
      value: stats.pendingEarnings,
      icon: {
        name: "wallet" as const,
        color: "#8B5CF6",
        backgroundColor: "bg-purple-100"
      }
    },
    {
      title: "TOTAL",
      value: stats.totalEarnings,
      icon: {
        name: "cash" as const,
        color: "#10B981",
        backgroundColor: "bg-green-100"
      }
    }
  ]

  return (
    <SafeAreaView style={{ paddingTop: insets.top }} className="flex-1 bg-gray-50">
      {/* App Content */}
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Container centered>
          {/* Header */}
          <Header 
            userName="Brooklyn Simmons"
            hasNotifications={true}
          />

          {/* Next Shift */}
          <NextShift 
            time="Tomorrow, 9:00 AM"
            location="Memorial Hospital, Floor 3"
          />

          {/* Stats Overview Title */}
          <View className="mb-2 w-full">
            <View className="flex-row justify-center items-center w-full">
              <StatsCard 
                value={stats.scheduledShifts}
                label="Scheduled Shifts"
                valueColor="text-teal-500"
                icon={{
                  name: "calendar",
                  color: "#0D9488",
                  backgroundColor: "bg-teal-100"
                }}
                showArrow={true}
              />
            </View>
          </View>

          {/* Smaller Stats Cards */}
          <View className="flex-row gap-3 mb-6">
            <StatsCard 
              value={stats.workedShifts}
              label="Worked"
              valueColor="text-blue-500"
              icon={{
                name: "checkmark-circle",
                color: "#3B82F6",
                backgroundColor: "bg-blue-100"
              }}
              size="small"
            />
            <StatsCard 
              value={stats.cancelledShifts}
              label="Cancelled"
              valueColor="text-red-500"
              icon={{
                name: "close-circle",
                color: "#EF4444",
                backgroundColor: "bg-red-100"
              }}
              size="small"
            />
          </View>

          {/* Shifts Chart */}
          <ChartSection 
            title="Shifts Worked"
            badge={getCurrentMonth()}
            badgeValue={stats.currentMonthShifts}
            data={shiftsChartData}
            metrics={shiftMetrics}
            availableChartTypes={['bar', 'line', 'pie']}
            defaultChartType="bar"
            onBarPress={handleBarPress}
            animationDelay={300}
          />
          
          {/* Shift Distribution */}
          <ChartSection 
            title="Shift Distribution"
            data={distributionData}
            defaultChartType="pie"
            animationDelay={350}
          />

          {/* Earnings Chart */}
          <ChartSection 
            title="Earnings Trend"
            badge="This Year"
            data={earningsData}
            metrics={earningsMetrics}
            defaultChartType="line"
            animationDelay={400}
          />

          {/* Wallet Section */}
          <WalletCard 
            title="My Wallet"
            items={walletItems}
            onViewAll={() => console.log('View all wallet items')}
          />
        </Container>
      </ScrollView>
    </SafeAreaView>
  )
}

export default function Dashboard() {
  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="auto" />
      <ShiftManagementApp />
    </View>
  )
}

