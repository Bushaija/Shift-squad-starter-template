import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface ScheduleHeaderProps {
  activeTab: string;
  tabs: string[];
  onTabChange: (tab: string) => void;
}

/**
 * Header component for the Schedule screen with navigation tabs
 */
const ScheduleHeader: React.FC<ScheduleHeaderProps> = ({
  activeTab,
  tabs,
  onTabChange,
}) => {
  return (
    <>
      <Text className="text-2xl font-semibold text-center my-4">Schedule</Text>
      
      <View className="flex-row justify-between mb-4 border-b border-gray-200">
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            onPress={() => onTabChange(tab)}
            className={`py-2.5 px-5 border-b-2 ${activeTab === tab ? 'border-purple-500' : 'border-transparent'}`}
          >
            <Text 
              className={`text-base ${activeTab === tab ? 'text-purple-500 font-medium' : 'text-gray-400'}`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

export default ScheduleHeader; 