import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface ScheduleCardProps {
  id: number | string;
  role: string;
  roleColor: string;
  distance: string;
  badge?: string;
  title: string;
  location: string;
  date: string;
  payRate: string;
  hourlyRate: string;
  status: string;
  isFavorite: boolean;
  onCardPress?: () => void;
  onFavoritePress?: () => void;
}

/**
 * A card component displaying a scheduled shift with details
 */
const ScheduleCard: React.FC<ScheduleCardProps> = ({
  id,
  role,
  roleColor,
  distance,
  badge,
  title,
  location,
  date,
  payRate,
  hourlyRate,
  status,
  isFavorite,
  onCardPress,
  onFavoritePress,
}) => {
  const router = useRouter();
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Scheduled':
        return 'bg-green-500';
      case 'Requested':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleCardPress = () => {
    if (onCardPress) {
      onCardPress();
    } else {
      // Navigate to shift details using the correct Expo Router format
      router.push({
        pathname: "/schedule/[id]",
        params: { id }
      });
    }
  };

  return (
    <TouchableOpacity 
      className="bg-white rounded-xl p-4 mb-4 shadow-sm"
      onPress={handleCardPress}
    >
      <View className="flex-row justify-between items-center mb-1">
        <View className="flex-row items-center">
          <View className="w-8 h-8 rounded-full bg-red-500 justify-center items-center">
            <Text className="text-white font-semibold text-xs">{role}</Text>
          </View>
          <Text className="ml-2 text-sm text-gray-400">{distance}</Text>
        </View>
        
        <View className="flex-row items-center">
          <View className={`py-1.5 px-3 rounded-full ${getStatusColor(status)} mr-2`}>
            <Text className="text-white font-medium text-sm">{status}</Text>
          </View>
          <TouchableOpacity 
            className="p-1"
            onPress={onFavoritePress}
          >
            <Ionicons 
              name={isFavorite ? "star" : "star-outline"} 
              size={22} 
              color={isFavorite ? "#FFD700" : "#C7C7CC"} 
            />
          </TouchableOpacity>
        </View>
      </View>
      
      <View className="mb-1.5">
        {badge && (
          <Text className="text-sm text-gray-400">{badge}</Text>
        )}
      </View>
      
      <Text className="text-base font-semibold text-gray-800 mb-2">{title}</Text>
      
      <View className="flex-row items-center mb-2">
        <Ionicons name="location-outline" size={16} color="#8E8E93" />
        <Text className="ml-2 text-sm text-gray-400 flex-1">{location}</Text>
      </View>
      
      <View className="flex-row items-center">
        <Ionicons name="calendar-outline" size={16} color="#8E8E93" />
        <Text className="ml-2 text-sm text-gray-400 flex-1">{date}</Text>
        <Text className="text-sm font-semibold text-gray-800">
          {payRate}, <Text className="text-xs text-gray-400">${hourlyRate}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ScheduleCard; 