import { View, Text, Dimensions, TouchableOpacity } from "react-native"
import { BarChart, LineChart, PieChart, ContributionGraph, ProgressChart } from "react-native-chart-kit"
import { useState } from "react"

interface ChartProps {
  data: {
    labels: string[]
    datasets: {
      data: number[]
      colors?: string[]
      activeIndex?: number
      strokeWidth?: number
      color?: string
    }[]
    legend?: string[]
  }
  title?: string
  subtitle?: string
  height?: number
  width?: number
  className?: string
  type?: "bar" | "line" | "pie" | "contribution" | "progress"
  onBarPress?: (value: number, index: number) => void
}

export const Chart = ({ 
  data, 
  title, 
  subtitle, 
  height = 200, 
  width, 
  className,
  type = "bar",
  onBarPress
}: ChartProps) => {
  const screenWidth = width || Dimensions.get("window").width - 40
  const [selectedIndex, setSelectedIndex] = useState<number | null>(data.datasets[0].activeIndex || null)
  
  // Create a custom color function to handle active bar
  const customColors = data.datasets[0].colors || Array(data.datasets[0].data.length).fill("#e5e7eb")
  const activeIndex = selectedIndex !== null ? selectedIndex : (data.datasets[0].activeIndex || -1)

  if (activeIndex >= 0 && activeIndex < customColors.length) {
    customColors[activeIndex] = "#8B5CF6" // Purple for active bar
  }

  // Common chart configuration
  const commonConfig = {
    backgroundColor: "transparent",
    backgroundGradientFrom: "white",
    backgroundGradientTo: "white",
    decimalPlaces: 0,
    color: (opacity = 1, index) => {
      return index !== undefined && index < customColors.length
        ? customColors[index]
        : `rgba(139, 92, 246, ${opacity})`
    },
    labelColor: () => "#9CA3AF",
    style: {
      borderRadius: 16,
    },
    propsForLabels: {
      fontSize: 10,
      fontWeight: '500',
    },
    propsForBackgroundLines: {
      strokeDasharray: '', // solid background lines
      strokeWidth: 0.5,
    },
  }

  // Handle bar/segment press
  const handlePress = (_, index) => {
    if (onBarPress) {
      onBarPress(data.datasets[0].data[index], index)
    }
    setSelectedIndex(index === selectedIndex ? null : index)
  }

  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <LineChart
            data={{
              labels: data.labels,
              datasets: [
                {
                  data: data.datasets[0].data,
                  color: (opacity = 1) => `rgba(139, 92, 246, ${opacity})`,
                  strokeWidth: data.datasets[0].strokeWidth || 2
                }
              ],
              legend: data.legend || []
            }}
            width={screenWidth}
            height={height}
            yAxisLabel=""
            yAxisSuffix=""
            withHorizontalLines={true}
            withVerticalLines={false}
            withDots={true}
            bezier={true}
            withShadow={false}
            chartConfig={{
              ...commonConfig,
              strokeWidth: 2,
              propsForDots: {
                r: "4",
                strokeWidth: "1",
                stroke: "#8B5CF6"
              },
              fillShadowGradientOpacity: 0.25,
              fillShadowGradient: '#8B5CF6',
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        )
      case "pie":
        const pieData = data.datasets[0].data.map((value, index) => {
          return {
            name: data.labels[index] || `Item ${index}`,
            value,
            color: customColors[index],
            legendFontColor: "#9CA3AF",
            legendFontSize: 12,
          }
        })
        return (
          <PieChart
            data={pieData}
            width={screenWidth}
            height={height}
            chartConfig={commonConfig}
            accessor="value"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
            hasLegend={true}
          />
        )
      case "contribution":
        return (
          <ContributionGraph
            values={
              data.datasets[0].data.map((value, index) => ({
                date: `2023-${index + 1}-01`,
                count: value
              }))
            }
            endDate={new Date("2023-12-31")}
            numDays={104}
            width={screenWidth}
            height={height}
            chartConfig={{
              ...commonConfig,
              backgroundGradientFrom: "white",
              backgroundGradientTo: "white",
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        )
      case "progress":
        return (
          <ProgressChart
            data={{
              data: data.datasets[0].data.map(value => value / 100)
            }}
            width={screenWidth}
            height={height}
            strokeWidth={16}
            radius={32}
            chartConfig={{
              ...commonConfig,
              color: (opacity = 1, index) => {
                const colors = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B']
                return index !== undefined && index < colors.length
                  ? colors[index]
                  : `rgba(139, 92, 246, ${opacity})`
              }
            }}
            hideLegend={false}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        )
      case "bar":
      default:
        return (
          <BarChart
            data={{
              labels: data.labels,
              datasets: [
                {
                  data: data.datasets[0].data,
                }
              ],
            }}
            width={screenWidth}
            height={height}
            yAxisLabel=""
            yAxisSuffix=""
            withHorizontalLabels={true}
            showBarTops={false}
            fromZero={true}
            withInnerLines={true}
            chartConfig={{
              ...commonConfig,
              fillShadowGradientFrom: '#8B5CF6',
              fillShadowGradientTo: '#B794F4',
              fillShadowGradientOpacity: 1,
              barPercentage: 0.6,
              barRadius: 6,
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            flatColor={true}
            onDataPointClick={handlePress}
          />
        )
    }
  }

  return (
    <View className={`${className || ""}`}>
      {(title || subtitle) && (
        <View className="flex-row justify-between items-center mb-4">
          {title && <Text className="font-semibold">{title}</Text>}
          {subtitle && <Text className="text-xs text-gray-500">{subtitle}</Text>}
        </View>
      )}

      {renderChart()}

      {/* Optional legend for bar/line charts */}
      {(type === "bar" || type === "line") && data.legend && (
        <View className="flex-row justify-center mt-3 flex-wrap">
          {data.legend.map((item, index) => (
            <View key={index} className="flex-row items-center mr-4 mb-2">
              <View 
                className="w-3 h-3 rounded-full mr-1" 
                style={{ backgroundColor: customColors[index] }} 
              />
              <Text className="text-xs text-gray-600">{item}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  )
}

export const ChartContainer = View
export const ChartTooltip = View
export const ChartTooltipContent = Text
export const ChartLegend = View
export const ChartLegendContent = Text
export const ChartStyle = View
