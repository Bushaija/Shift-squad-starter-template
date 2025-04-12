import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface LocationHeaderProps {
  address: string;
  totalShifts: number;
  radius: number;
  onLocationPress?: () => void;
  onSearchPress?: () => void;
}

/**
 * Header component displaying current location and search details following iOS design guidelines
 */
const LocationHeader: React.FC<LocationHeaderProps> = ({
  address,
  totalShifts,
  radius,
  onLocationPress,
  onSearchPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity 
          style={styles.locationButton}
          onPress={onLocationPress}
          activeOpacity={0.7}
        >
          <Ionicons name="location" size={18} color="#8B5CF6" />
          <Text style={styles.addressText} numberOfLines={1}>{address}</Text>
          <Ionicons name="chevron-down" size={16} color="#8B5CF6" />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.searchButton}
          onPress={onSearchPress}
        >
          <Ionicons name="search" size={20} color="#8B5CF6" />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.infoText}>
        <Text style={styles.boldText}>{totalShifts} shifts </Text>
        found for your location within 
        <Text style={styles.boldText}> {radius} miles</Text>
      </Text>
    </View>
  );
};

// iOS-inspired styling
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5EA', // iOS light gray border
    backgroundColor: '#FFFFFF',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  searchButton: {
    padding: 8,
    backgroundColor: '#F2F2F7',
    borderRadius: 20,
    marginLeft: 8,
  },
  addressText: {
    fontSize: 17,
    color: '#000000',
    fontWeight: '400',
    flex: 1,
    marginHorizontal: 8,
  },
  infoText: {
    fontSize: 15,
    color: '#8A8A8E', // iOS secondary text
    lineHeight: 20,
  },
  boldText: {
    fontWeight: '600',
    color: '#3A3A3C', // iOS primary text
  },
});

export default LocationHeader; 