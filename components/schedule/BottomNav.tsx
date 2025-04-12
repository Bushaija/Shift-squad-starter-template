import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';

/**
 * Bottom navigation component for the app
 */
const BottomNav: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname.includes(path);
  };
  
  return (
    <View className="flex-row justify-around items-center py-2.5 bg-white border-t border-gray-200">
      <TouchableOpacity 
        className="items-center justify-center"
        onPress={() => router.push('/home')}
      >
        <Ionicons 
          name={isActive('home') ? "home" : "home-outline"} 
          size={24} 
          color={isActive('home') ? "#8B5CF6" : "#8E8E93"} 
        />
        <Text className={`text-xs mt-1 ${isActive('home') ? 'text-purple-500 font-medium' : 'text-gray-400'}`}>
          Home
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        className="items-center justify-center"
        onPress={() => router.push('/shifts')}
      >
        <Ionicons 
          name={isActive('shifts') ? "list" : "list-outline"} 
          size={24} 
          color={isActive('shifts') ? "#8B5CF6" : "#8E8E93"}
        />
        <Text className={`text-xs mt-1 ${isActive('shifts') ? 'text-purple-500 font-medium' : 'text-gray-400'}`}>
          Shifts
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        className="items-center justify-center"
        onPress={() => router.push('/schedule')}
      >
        <Ionicons 
          name={isActive('schedule') ? "calendar" : "calendar-outline"} 
          size={24} 
          color={isActive('schedule') ? "#8B5CF6" : "#8E8E93"}
        />
        <Text className={`text-xs mt-1 ${isActive('schedule') ? 'text-purple-500 font-medium' : 'text-gray-400'}`}>
          Schedule
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        className="items-center justify-center"
        onPress={() => router.push('/profile')}
      >
        <Ionicons 
          name={isActive('profile') ? "person" : "person-outline"} 
          size={24} 
          color={isActive('profile') ? "#8B5CF6" : "#8E8E93"}
        />
        <Text className={`text-xs mt-1 ${isActive('profile') ? 'text-purple-500 font-medium' : 'text-gray-400'}`}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNav; 