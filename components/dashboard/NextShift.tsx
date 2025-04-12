import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, CardContent } from '@/components/ui/card';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface NextShiftProps {
  time: string;
  location: string;
  onViewDetails?: () => void;
  animationDelay?: number;
}

/**
 * Component displaying the next upcoming shift with time and location
 */
export const NextShift: React.FC<NextShiftProps> = ({
  time,
  location,
  onViewDetails,
  animationDelay = 100,
}) => {
  return (
    <Animated.View 
      entering={FadeInDown.delay(animationDelay).duration(400)}
      className="px-5 mb-5"
    >
      <Card className="bg-gradient-to-r from-purple-500 to-violet-500">
        <CardContent className="py-4">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-white text-xs font-medium opacity-80">NEXT SHIFT</Text>
              <Text className="text-white text-lg font-bold mt-1">{time}</Text>
              <Text className="text-white opacity-80 mt-1">{location}</Text>
            </View>
            <View className="bg-white/20 rounded-full p-3">
              <Ionicons name="time-outline" size={24} color="white" />
            </View>
          </View>
          <View className="mt-4 flex-row">
            <TouchableOpacity 
              className="bg-white/20 rounded-md py-2 px-3 flex-row items-center"
              onPress={onViewDetails}
              accessibilityLabel="View shift details"
              accessibilityHint="Shows more information about your upcoming shift"
            >
              <Ionicons name="calendar-outline" size={16} color="white" />
              <Text className="text-white text-xs ml-1">View Details</Text>
            </TouchableOpacity>
          </View>
        </CardContent>
      </Card>
    </Animated.View>
  );
};

export default NextShift; 