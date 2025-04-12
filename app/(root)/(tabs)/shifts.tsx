import React, { useState, useCallback } from 'react';
import { View, SafeAreaView, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';

// Import components
import { LocationHeader, ShiftsList, Shift } from '@/components/shifts';
import { Container } from '@/components/ui';

// Import mock data
import { mockShifts } from '@/constants/shifts-data';

const ShiftsScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [shifts, setShifts] = useState<Shift[]>(mockShifts);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Simulate data loading
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      setTimeout(() => {
        setShifts(mockShifts);
        setLoading(false);
      }, 500);
    }, [])
  );

  // Handle refresh
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  // Handle shift press
  const handleShiftPress = (shift: Shift) => {
    console.log('Shift pressed:', shift.id);
    // Navigate to shift details
    router.push({
      pathname: "/shifts/[id]",
      params: { id: shift.id }
    });
  };

  // Handle favorite toggle
  const handleFavoritePress = (shift: Shift) => {
    const updatedShifts = shifts.map(s => {
      if (s.id === shift.id) {
        return { ...s, isFavorite: !s.isFavorite };
      }
      return s;
    });
    setShifts(updatedShifts);
  };

  // Handle location press
  const handleLocationPress = () => {
    console.log('Location pressed');
    // Navigate to filters screen
    router.push('/filters' as any);
  };

  // Handle search press in LocationHeader
  const handleSearchPress = () => {
    // Navigate to filters screen
    router.push('/filters' as any);
  };

  // Handle filter press
  const handleFilterPress = () => {
    // Navigate to filters screen
    router.push('/filters' as any);
  };

  // Load more shifts
  const handleLoadMore = () => {
    console.log('Loading more shifts...');
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <Container centered>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Shifts</Text>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={handleFilterPress}
          >
            <Ionicons name="options-outline" size={24} color="#8A8A8E" />
          </TouchableOpacity>
        </View>

        {/* Current location and search results */}
        <LocationHeader 
          address="2972 Westheimer Rd. Santa Ana, Illinois 85486"
          totalShifts={223}
          radius={23}
          onLocationPress={handleLocationPress}
          onSearchPress={handleSearchPress}
        />
      </Container>

      {/* Shifts list */}
      <ShiftsList 
        shifts={shifts}
        loading={loading}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReached={handleLoadMore}
        onShiftPress={handleShiftPress}
        onFavoritePress={handleFavoritePress}
      />

      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

// iOS-inspired styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  headerButton: {
    padding: 4,
  }
});

export default ShiftsScreen;