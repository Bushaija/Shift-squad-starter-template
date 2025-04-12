import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, CardContent } from '@/components/ui/card';

interface StatsCardProps {
  value: number;
  label: string;
  icon: {
    name: React.ComponentProps<typeof Ionicons>['name'];
    color: string;
    backgroundColor: string;
  };
  valueColor?: string;
  onPress?: () => void;
  showArrow?: boolean;
  size?: 'small' | 'large';
}

/**
 * Reusable component for displaying statistics with an icon and label
 */
export const StatsCard: React.FC<StatsCardProps> = ({
  value,
  label,
  icon,
  valueColor = 'text-gray-800',
  onPress,
  showArrow = false,
  size = 'large',
}) => {
  if (size === 'small') {
    return (
      <Card className="flex-1 shadow-sm w-full">
        <CardContent className="">
          <View className="flex-row items-center justify-center gap-4">
            <View className={`w-10 h-10 ${icon.backgroundColor} rounded-full items-center justify-center `}>
              <Ionicons name={icon.name} size={18} color={icon.color} />
            </View>
            <View className="items-end mt-4">
              <Text className={`text-2xl font-bold ${valueColor}`}>{value}</Text>
              <Text className="text-xs text-gray-600">{label}</Text>
            </View>
          </View>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm">
      <CardContent className="py-4">
        <View className="flex-row items-center">
          <View className={`w-12 h-12 ${icon.backgroundColor} rounded-full items-center justify-center`}>
            <Ionicons name={icon.name} size={20} color={icon.color} />
          </View>
          <View className="ml-4">
            <Text className={`text-3xl font-bold ${valueColor}`}>{value}</Text>
            <Text className="text-sm text-gray-600">{label}</Text>
          </View>
          {showArrow && (
            <View className="ml-auto">
              <TouchableOpacity 
                className="bg-gray-100 p-2 rounded-full"
                onPress={onPress}
                accessibilityLabel={`View ${label} details`}
              >
                <Ionicons name="chevron-forward" size={18} color="#666" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </CardContent>
    </Card>
  );
};

export default StatsCard; 