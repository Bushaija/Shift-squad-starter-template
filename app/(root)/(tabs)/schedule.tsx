import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ScheduleHeader, ScheduleList, BottomNav, ScheduledShift } from '@/components/schedule';
import { Container } from '@/components/ui';
import { mockScheduledShifts } from '@/constants/schedule-data';

const Schedule = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('All');
  const [shifts, setShifts] = useState<ScheduledShift[]>(mockScheduledShifts);
  
  const tabs = ['All', 'Upcoming', 'Ongoing', 'Past'];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleCardPress = (shift: ScheduledShift) => {
    console.log('Shift pressed:', shift.id);
    router.push({
      pathname: "/schedule/[id]",
      params: { id: shift.id }
    });
  };

  const handleFavoritePress = (shift: ScheduledShift) => {
    console.log('Favorite pressed:', shift.id);
    // Toggle favorite status
    setShifts(currentShifts => 
      currentShifts.map(s => 
        s.id === shift.id ? { ...s, isFavorite: !s.isFavorite } : s
      )
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Container centered>
        <View className="flex-1 bg-gray-100">
          {/* Header with Tabs */}
          <ScheduleHeader 
            activeTab={activeTab}
            tabs={tabs}
            onTabChange={handleTabChange}
          />
          
          {/* Scheduled Shifts List */}
          <ScheduleList 
            shifts={shifts}
            activeTab={activeTab}
            onCardPress={handleCardPress}
            onFavoritePress={handleFavoritePress}
          />
        </View>
      </Container>
      
      {/* Bottom Navigation */}
      <BottomNav />
    </SafeAreaView>
  );
};

export default Schedule;
