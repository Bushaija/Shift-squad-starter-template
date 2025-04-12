import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { mockShifts } from '@/constants/shifts-data';

interface ShiftDetails {
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
  facilityName?: string;
  description?: string;
  requirements?: string[];
  address?: string;
  contactPerson?: string;
  contactPhone?: string;
}

const ShiftDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [shift, setShift] = useState<ShiftDetails | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching shift details
  useEffect(() => {
    const loadShift = async () => {
      setLoading(true);
      // Find shift in mock data
      const foundShift = mockShifts.find(s => s.id === id);
      
      // Enhance with additional details for this screen
      if (foundShift) {
        setShift({
          ...foundShift,
          facilityName: "Rocky Mountain Care Center",
          description: "As a healthcare professional, you will be responsible for providing high-quality care to patients in a fast-paced environment. You will work with an experienced team of healthcare providers to ensure the best possible outcomes for patients.",
          requirements: [
            "Active license in good standing",
            "BLS/CPR certification",
            "Minimum 1 year of experience",
            "Excellent communication skills",
            "Ability to work in a team environment"
          ],
          address: "123 Healthcare Ave, Salt Lake City, UT 84101",
          contactPerson: "Sarah Johnson",
          contactPhone: "(801) 555-1234"
        });
      }
      
      setLoading(false);
    };
    
    loadShift();
  }, [id]);

  // Handle taking the shift
  const handleTakeShift = () => {
    Alert.alert(
      "Confirm Booking",
      "Are you sure you want to book this shift?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Confirm",
          onPress: () => {
            // Simulate booking process
            Alert.alert(
              "Shift Booked!",
              "This shift has been added to your schedule.",
              [
                {
                  text: "View My Bookings",
                  onPress: () => router.push('/bookings' as any)
                },
                {
                  text: "Find More Shifts",
                  onPress: () => router.back()
                }
              ]
            );
          }
        }
      ]
    );
  };

  // Color based on role type
  const getRoleBadgeColor = (roleType: string) => {
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

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-row items-center p-4 border-b border-gray-100">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="p-2 -ml-2"
          >
            <Ionicons name="chevron-back" size={24} color="#007AFF" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold ml-2">Loading Shift Details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!shift) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-row items-center p-4 border-b border-gray-100">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="p-2 -ml-2"
          >
            <Ionicons name="chevron-back" size={24} color="#007AFF" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold ml-2">Shift Details</Text>
        </View>
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-lg text-gray-400 mb-4">Shift not found</Text>
          <TouchableOpacity 
            className="bg-purple-500 px-6 py-3 rounded-full"
            onPress={() => router.back()}
          >
            <Text className="text-white font-medium">Back to Shifts</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center p-4 border-b border-gray-100">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="p-2 -ml-2"
        >
          <Ionicons name="chevron-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold ml-2">Shift Details</Text>
        
        <View className="flex-1 flex-row justify-end">
          <TouchableOpacity 
            className="p-2"
            onPress={() => Alert.alert("Share", "Sharing functionality will be implemented here.")}
          >
            <Ionicons name="share-outline" size={24} color="#8A8A8E" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Role Badge and Quick Info */}
        <View className="p-4 bg-white">
          <View className="flex-row items-center mb-4">
            <View 
              className="w-12 h-12 rounded-full items-center justify-center"
              style={{ backgroundColor: getRoleBadgeColor(shift.roleType) }}
            >
              <Text className="text-white font-bold">{shift.roleType}</Text>
            </View>
            <View className="ml-3">
              <Text className="text-lg font-semibold">{shift.role}</Text>
              <Text className="text-gray-500">{shift.facilityName}</Text>
            </View>
          </View>

          {/* Favorite and Distance */}
          <View className="flex-row justify-between items-center mb-4">
            <View className="flex-row items-center">
              <Ionicons name="location-outline" size={18} color="#8A8A8E" />
              <Text className="text-gray-700 ml-2">{shift.distance} miles away</Text>
            </View>
            
            <TouchableOpacity 
              className="flex-row items-center bg-gray-100 py-1 px-3 rounded-full"
            >
              <Ionicons 
                name={shift.isFavorite ? "star" : "star-outline"} 
                size={18} 
                color={shift.isFavorite ? "#FFD700" : "#8A8A8E"} 
              />
              <Text className="text-gray-700 ml-1">{shift.isFavorite ? "Saved" : "Save"}</Text>
            </TouchableOpacity>
          </View>

          {/* Tags / Badges */}
          <View className="flex-row flex-wrap mb-4">
            {shift.longTerm && (
              <View className="bg-purple-100 py-1 px-3 rounded-full mr-2 mb-2">
                <Text className="text-purple-600 text-sm">Long Term</Text>
              </View>
            )}
            <View className="bg-blue-100 py-1 px-3 rounded-full mr-2 mb-2">
              <Text className="text-blue-600 text-sm">{shift.roleType}</Text>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View className="h-2 bg-gray-100" />

        {/* Shift Details */}
        <View className="p-4 bg-white">
          <Text className="text-lg font-semibold mb-4">Shift Details</Text>
          
          <View className="mb-3">
            <Text className="text-gray-500 mb-1">Date & Time</Text>
            <View className="flex-row items-center">
              <Ionicons name="calendar-outline" size={18} color="#8A8A8E" />
              <Text className="text-gray-800 ml-2">{shift.date}, {shift.time}</Text>
            </View>
          </View>
          
          <View className="mb-3">
            <Text className="text-gray-500 mb-1">Pay Rate</Text>
            <View className="flex-row items-center">
              <Ionicons name="cash-outline" size={18} color="#8A8A8E" />
              <Text className="text-gray-800 ml-2">${shift.hourlyRate}/hr</Text>
            </View>
          </View>
          
          <View className="mb-3">
            <Text className="text-gray-500 mb-1">Location</Text>
            <View className="flex-row items-center">
              <Ionicons name="location-outline" size={18} color="#8A8A8E" />
              <Text className="text-gray-800 ml-2">{shift.address}</Text>
            </View>
          </View>
          
          <View className="mb-3">
            <Text className="text-gray-500 mb-1">Contact</Text>
            <View className="flex-row items-center">
              <Ionicons name="person-outline" size={18} color="#8A8A8E" />
              <Text className="text-gray-800 ml-2">{shift.contactPerson}, {shift.contactPhone}</Text>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View className="h-2 bg-gray-100" />

        {/* Job Description */}
        <View className="p-4 bg-white">
          <Text className="text-lg font-semibold mb-2">Job Description</Text>
          <Text className="text-gray-700 leading-6 mb-4">{shift.description}</Text>
          
          <Text className="text-lg font-semibold mb-2">Requirements</Text>
          <View className="ml-2">
            {shift.requirements?.map((req, index) => (
              <View key={index} className="flex-row items-start mb-2">
                <View className="w-2 h-2 rounded-full bg-purple-500 mt-2 mr-2" />
                <Text className="text-gray-700 flex-1">{req}</Text>
              </View>
            ))}
          </View>
        </View>
        
        {/* Add some padding at the bottom for scroll */}
        <View className="h-20" />
      </ScrollView>

      {/* Fixed bottom button */}
      <View className="px-4 py-4 bg-white border-t border-gray-200">
        <TouchableOpacity 
          className="bg-purple-500 py-3 rounded-full items-center"
          onPress={handleTakeShift}
        >
          <Text className="text-white font-medium text-lg">Book This Shift</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ShiftDetailsScreen;