import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Chart } from '@/components/ui/chart';
import Animated, { FadeInDown } from 'react-native-reanimated';

type ChartType = 'bar' | 'line' | 'pie';

interface ChartSectionProps {
  title: string;
  badge?: string;
  badgeValue?: number | string;
  data: {
    [key in ChartType]?: {
      data: {
        labels: string[];
        datasets: {
          data: number[];
          colors?: string[];
          activeIndex?: number;
          strokeWidth?: number;
        }[];
        legend?: string[];
      };
    };
  };
  metrics?: {
    label: string;
    value: string | number;
    valueClassName?: string;
  }[];
  height?: number;
  availableChartTypes?: ChartType[];
  defaultChartType?: ChartType;
  onBarPress?: (value: number, index: number) => void;
  animationDelay?: number;
}

/**
 * A reusable chart section that supports multiple chart types with metrics
 */
export const ChartSection: React.FC<ChartSectionProps> = ({
  title,
  badge,
  badgeValue,
  data,
  metrics,
  height = 180,
  availableChartTypes = ['bar'],
  defaultChartType = 'bar',
  onBarPress,
  animationDelay = 300,
}) => {
  const [activeChart, setActiveChart] = useState<ChartType>(defaultChartType);

  return (
    <Animated.View 
      entering={FadeInDown.delay(animationDelay).duration(400)}
      className="px-5 mb-6"
    >
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <View className="flex-row justify-between items-center">
            <CardTitle>{title}</CardTitle>
            {badge && (
              <View className="flex-row items-center">
                <Badge variant="secondary">{badge}</Badge>
                {badgeValue && (
                  <Text className="text-lg font-bold text-purple-500 ml-2">
                    {badgeValue}
                  </Text>
                )}
              </View>
            )}
          </View>
          
          {/* Chart type selector */}
          {availableChartTypes.length > 1 && (
            <View className="flex-row mt-3">
              {availableChartTypes.map(type => (
                <TouchableOpacity 
                  key={type}
                  onPress={() => setActiveChart(type)}
                  className={`mr-3 px-3 py-1 rounded-full ${activeChart === type ? 'bg-purple-100' : 'bg-gray-100'}`}
                >
                  <Text 
                    className={`text-xs font-medium ${activeChart === type ? 'text-purple-600' : 'text-gray-500'}`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </CardHeader>
        <CardContent className="pt-0">
          {/* Render active chart */}
          {data[activeChart] && (
            <Chart 
              data={data[activeChart]!.data} 
              height={height}
              type={activeChart} 
              onBarPress={onBarPress}
            />
          )}
          
          {/* Metrics below chart */}
          {metrics && metrics.length > 0 && (
            <View className="flex-row justify-between mt-2 px-2">
              {metrics.map((metric, index) => (
                <View key={index} className="items-center">
                  <Text className="text-xs text-gray-500">{metric.label}</Text>
                  <Text className={`font-bold ${metric.valueClassName || 'text-gray-800'}`}>
                    {metric.value}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </CardContent>
      </Card>
    </Animated.View>
  );
};

export default ChartSection; 