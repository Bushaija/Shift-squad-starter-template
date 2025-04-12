import React from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import ShiftCard from './ShiftCard';
import { Container } from '@/components/ui';

export interface Shift {
  id: string;
  role: string;
  roleType: 'RN' | 'CNA' | 'LPN' | 'OTHER';
  location: string;
  date: string;
  time: string;
  hourlyRate: number;
  distance: number;
  isFavorite?: boolean;
  longTerm?: boolean;
}

interface ShiftsListProps {
  shifts: Shift[];
  loading?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  onEndReached?: () => void;
  onShiftPress?: (shift: Shift) => void;
  onFavoritePress?: (shift: Shift) => void;
}

/**
 * Component to display a list of available shifts following iOS design guidelines
 */
const ShiftsList: React.FC<ShiftsListProps> = ({
  shifts,
  loading = false,
  refreshing = false,
  onRefresh,
  onEndReached,
  onShiftPress,
  onFavoritePress,
}) => {
  // Handle empty state
  if (shifts.length === 0 && !loading) {
    return (
      <Container centered>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No shifts available</Text>
          <Text style={styles.emptyDescription}>Try adjusting your search criteria</Text>
        </View>
      </Container>
    );
  }

  return (
    <FlatList
      data={shifts}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => (
        <Container centered>
          <ShiftCard
            role={item.role}
            roleType={item.roleType}
            location={item.location}
            date={item.date}
            time={item.time}
            hourlyRate={item.hourlyRate}
            distance={item.distance}
            isFavorite={item.isFavorite}
            longTerm={item.longTerm}
            onPress={() => onShiftPress?.(item)}
            onFavoritePress={() => onFavoritePress?.(item)}
          />
        </Container>
      )}
      ListFooterComponent={
        loading ? (
          <Container centered>
            <View style={styles.loaderContainer}>
              <ActivityIndicator color="#8B5CF6" />
            </View>
          </Container>
        ) : null
      }
    />
  );
};

// iOS-inspired styling
const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 40,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#8A8A8E',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 15,
    color: '#8A8A8E',
    textAlign: 'center',
  },
  loaderContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});

export default ShiftsList; 