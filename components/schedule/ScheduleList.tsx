import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import ScheduleCard from './ScheduleCard';
import { Container } from '@/components/ui';

export interface ScheduledShift {
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
}

interface ScheduleListProps {
  shifts: ScheduledShift[];
  activeTab: string;
  onCardPress?: (shift: ScheduledShift) => void;
  onFavoritePress?: (shift: ScheduledShift) => void;
}

/**
 * Component to display a list of scheduled shifts
 */
const ScheduleList: React.FC<ScheduleListProps> = ({
  shifts,
  activeTab,
  onCardPress,
  onFavoritePress,
}) => {
  // Filter shifts based on active tab
  const filteredShifts = shifts.filter(shift => {
    switch (activeTab) {
      case 'All':
        return true;
      case 'Upcoming':
        // This is a simplified filter logic. In a real app, you would check dates
        return true;
      case 'Ongoing':
        // This is a simplified filter logic. In a real app, you would check dates
        return false;
      case 'Past':
        // This is a simplified filter logic. In a real app, you would check dates
        return false;
      default:
        return true;
    }
  });

  if (filteredShifts.length === 0) {
    return (
      <Container centered>
        <View className="flex-1 justify-center items-center py-10">
          <Text className="text-gray-500 text-lg font-medium">No shifts found</Text>
          <Text className="text-gray-400 mt-2 text-center px-6">
            There are no {activeTab.toLowerCase()} shifts to display
          </Text>
        </View>
      </Container>
    );
  }

  return (
    <ScrollView className="flex-1">
      {filteredShifts.map(shift => (
        <Container key={shift.id} centered>
          <ScheduleCard
            id={shift.id}
            role={shift.role}
            roleColor={shift.roleColor}
            distance={shift.distance}
            badge={shift.badge}
            title={shift.title}
            location={shift.location}
            date={shift.date}
            payRate={shift.payRate}
            hourlyRate={shift.hourlyRate}
            status={shift.status}
            isFavorite={shift.isFavorite}
            onCardPress={() => onCardPress?.(shift)}
            onFavoritePress={() => onFavoritePress?.(shift)}
          />
        </Container>
      ))}
    </ScrollView>
  );
};

export default ScheduleList; 