import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ScheduledShift } from '@/components/schedule';
import { mockScheduledShifts } from '@/constants/schedule-data';

const ShiftDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [shift, setShift] = useState<ScheduledShift | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch with a delay
    const timer = setTimeout(() => {
      const foundShift = mockScheduledShifts.find(s => String(s.id) === id);
      setShift(foundShift || null);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="px-4 py-4 flex-row items-center">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="p-2 -ml-2"
          >
            <Ionicons name="chevron-back" size={24} color="#007AFF" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold ml-2">Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!shift) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="px-4 py-4 flex-row items-center">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="p-2 -ml-2"
          >
            <Ionicons name="chevron-back" size={24} color="#007AFF" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold ml-2">Shift Details</Text>
        </View>
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg text-gray-500">Shift not found</Text>
          <TouchableOpacity 
            className="mt-4 bg-purple-500 px-6 py-2 rounded-full"
            onPress={() => router.back()}
          >
            <Text className="text-white font-medium">Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 py-4 flex-row items-center border-b border-gray-100">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="p-2 -ml-2"
        >
          <Ionicons name="chevron-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold ml-2">Shift Details</Text>
      </View>

      <ScrollView className="flex-1">
        {/* Role Badge and Status */}
        <View className="flex-row justify-between items-center px-4 py-4">
          <View className="flex-row items-center">
            <View className="w-12 h-12 rounded-full bg-red-500 justify-center items-center">
              <Text className="text-white font-bold text-base">{shift.role}</Text>
            </View>
            <View className="ml-3">
              <Text className="text-sm text-gray-500">{shift.badge}</Text>
              <Text className="text-gray-400">{shift.distance}</Text>
            </View>
          </View>
          
          <View className={`py-1.5 px-3 rounded-full ${
            shift.status === 'Scheduled' ? 'bg-green-500' : 
            shift.status === 'Requested' ? 'bg-orange-500' : 'bg-gray-500'
          }`}>
            <Text className="text-white font-medium">{shift.status}</Text>
          </View>
        </View>

        {/* Shift Title */}
        <View className="px-4 mb-6">
          <Text className="text-xl font-semibold text-gray-800">{shift.title}</Text>
        </View>

        {/* Shift Details */}
        <View className="bg-gray-50 p-4 mb-6">
          <View className="flex-row items-center mb-4">
            <View className="w-8 h-8 bg-purple-100 rounded-full items-center justify-center">
              <Ionicons name="location-outline" size={18} color="#8B5CF6" />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-sm text-gray-400">Location</Text>
              <Text className="text-base text-gray-800">{shift.location}</Text>
            </View>
          </View>

          <View className="flex-row items-center mb-4">
            <View className="w-8 h-8 bg-purple-100 rounded-full items-center justify-center">
              <Ionicons name="calendar-outline" size={18} color="#8B5CF6" />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-sm text-gray-400">Date & Time</Text>
              <Text className="text-base text-gray-800">{shift.date}</Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <View className="w-8 h-8 bg-purple-100 rounded-full items-center justify-center">
              <Ionicons name="cash-outline" size={18} color="#8B5CF6" />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-sm text-gray-400">Payment</Text>
              <Text className="text-base text-gray-800">
                {shift.payRate} <Text className="text-sm text-gray-500">(${shift.hourlyRate})</Text>
              </Text>
            </View>
          </View>
        </View>

        {/* Job Description */}
        <View className="px-4 mb-6">
          <Text className="text-lg font-semibold mb-2">Job Description</Text>
          <Text className="text-gray-600 leading-6">
            As a {shift.role} at this facility, you will be responsible for providing direct patient care, 
            administering medications, documenting care, and collaborating with the healthcare team to 
            ensure optimal patient outcomes. This position requires excellent communication skills, 
            attention to detail, and a compassionate approach to patient care.
          </Text>
        </View>

        {/* Requirements */}
        <View className="px-4 mb-8">
          <Text className="text-lg font-semibold mb-2">Requirements</Text>
          <View className="ml-2">
            <View className="flex-row items-center mb-2">
              <View className="w-2 h-2 rounded-full bg-purple-500 mr-2" />
              <Text className="text-gray-600">Active {shift.role} license in the state</Text>
            </View>
            <View className="flex-row items-center mb-2">
              <View className="w-2 h-2 rounded-full bg-purple-500 mr-2" />
              <Text className="text-gray-600">1+ years of experience in similar setting</Text>
            </View>
            <View className="flex-row items-center mb-2">
              <View className="w-2 h-2 rounded-full bg-purple-500 mr-2" />
              <Text className="text-gray-600">BLS/CPR certification</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-2 h-2 rounded-full bg-purple-500 mr-2" />
              <Text className="text-gray-600">Excellent communication skills</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View className="px-4 py-4 border-t border-gray-200 bg-white">
        <View className="flex-row justify-between">
          <TouchableOpacity 
            className="bg-white border border-purple-500 rounded-full px-4 py-3 flex-1 mr-2 items-center"
          >
            <Text className="text-purple-500 font-medium">Cancel Shift</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="bg-purple-500 rounded-full px-4 py-3 flex-1 ml-2 items-center"
          >
            <Text className="text-white font-medium">Contact Facility</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ShiftDetails; 