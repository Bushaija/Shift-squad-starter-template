import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, CardContent } from '@/components/ui/card';

interface ShiftCardProps {
  role: string;
  roleType: 'RN' | 'CNA' | 'LPN' | 'OTHER';
  location: string;
  date: string;
  time: string;
  hourlyRate: number;
  distance: number;
  isFavorite?: boolean;
  longTerm?: boolean;
  onPress?: () => void;
  onFavoritePress?: () => void;
}

/**
 * Card component displaying available shift details following iOS design guidelines
 */
const ShiftCard: React.FC<ShiftCardProps> = ({
  role,
  roleType,
  location,
  date,
  time,
  hourlyRate,
  distance,
  isFavorite = false,
  longTerm = false,
  onPress,
  onFavoritePress,
}) => {
  // iOS-aligned role badge colors
  const getRoleBadgeStyle = () => {
    switch (roleType) {
      case 'RN':
        return '#FF3B30'; // iOS red
      case 'CNA':
        return '#FF3B30'; // iOS red
      case 'LPN':
        return '#007AFF'; // iOS blue
      default:
        return '#AF52DE'; // iOS purple
    }
  };

  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.container}
    >
      <Card style={styles.card}>
        <CardContent style={styles.cardContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.leftHeader}>
              <View style={[styles.roleBadge, { backgroundColor: getRoleBadgeStyle() }]}>
                <Text style={styles.roleText}>{roleType}</Text>
              </View>
              <Text style={styles.distanceText}>{distance} mi</Text>
              
              {longTerm && (
                <View style={styles.tagContainer}>
                  <Text style={styles.tagText}>Long Term</Text>
                </View>
              )}
            </View>
            
            <TouchableOpacity 
              onPress={onFavoritePress} 
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={styles.favoriteButton}
            >
              <Ionicons 
                name={isFavorite ? "star" : "star-outline"} 
                size={22} 
                color={isFavorite ? "#FFD700" : "#C7C7CC"} 
              />
            </TouchableOpacity>
          </View>
          
          {/* Job Title */}
          <Text style={styles.roleTitle} numberOfLines={2}>{role}</Text>
          
          {/* Location */}
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={16} color="#8A8A8E" style={styles.infoIcon} />
            <Text style={styles.infoText} numberOfLines={2}>{location}</Text>
          </View>
          
          {/* Date & Time */}
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={16} color="#8A8A8E" style={styles.infoIcon} />
            <Text style={styles.infoText}>{date} · {time}</Text>
          </View>
          
          {/* Pay Rate */}
          <View style={styles.payContainer}>
            <Text style={styles.payText}>${hourlyRate}<Text style={styles.payRate}>, 50/hr</Text></Text>
          </View>
        </CardContent>
      </Card>
    </TouchableOpacity>
  );
};

// iOS-inspired styling
const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  card: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#E5E5EA', // iOS light gray border
  },
  cardContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  roleBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  distanceText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#3A3A3C', // iOS dark gray
  },
  tagContainer: {
    backgroundColor: '#F2F2F7', // iOS light gray background
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  tagText: {
    fontSize: 12,
    color: '#8A8A8E', // iOS gray
    fontWeight: '500',
  },
  favoriteButton: {
    padding: 4,
  },
  roleTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
    lineHeight: 22,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  infoIcon: {
    marginTop: 2,
    marginRight: 6,
  },
  infoText: {
    fontSize: 15,
    color: '#3A3A3C', // iOS dark gray
    flex: 1,
    lineHeight: 20,
  },
  payContainer: {
    alignItems: 'flex-end',
    marginTop: 4,
  },
  payText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
  },
  payRate: {
    fontWeight: '400',
    color: '#8A8A8E', // iOS gray
    fontSize: 15,
  },
});

export default ShiftCard; 