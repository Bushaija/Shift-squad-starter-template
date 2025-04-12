import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface WalletCardItemProps {
  title: string;
  value: number;
  valuePrefix?: string;
  icon: {
    name: React.ComponentProps<typeof Ionicons>['name'];
    color: string;
    backgroundColor: string;
  };
}

interface WalletCardProps {
  title: string;
  items: WalletCardItemProps[];
  onViewAll?: () => void;
  animationDelay?: number;
}

/**
 * Reusable wallet component showing financial information
 */
export const WalletCard: React.FC<WalletCardProps> = ({
  title,
  items,
  onViewAll,
  animationDelay = 450,
}) => {
  return (
    <Animated.View 
      entering={FadeInDown.delay(animationDelay).duration(400)}
      className="px-5 mb-10"
    >
      <View className="flex-row justify-between items-center mb-3">
        <CardTitle>{title}</CardTitle>
        {onViewAll && (
          <TouchableOpacity 
            className="flex-row items-center"
            onPress={onViewAll}
            accessibilityLabel="View all financial information"
          >
            <Text className="text-sm text-purple-500 mr-1">View All</Text>
            <Ionicons name="chevron-forward" size={14} color="#8B5CF6" />
          </TouchableOpacity>
        )}
      </View>
      <View className="flex-row gap-3">
        {items.map((item, index) => (
          <Card key={index} className="flex-1 shadow-sm">
            <CardContent className="py-4">
              <View className="items-center">
                <View className={`w-10 h-10 ${item.icon.backgroundColor} rounded-full items-center justify-center mb-2`}>
                  <Ionicons name={item.icon.name} size={18} color={item.icon.color} />
                </View>
                <Text className="text-xs text-gray-600">{item.title}</Text>
                <Text className="text-xl font-bold" style={{ color: item.icon.color }}>
                  {item.valuePrefix || '$'}{item.value}
                </Text>
              </View>
            </CardContent>
          </Card>
        ))}
      </View>
    </Animated.View>
  );
};

export default WalletCard; 