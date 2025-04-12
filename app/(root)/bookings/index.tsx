import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface BookedShift {
  id: string;
  role: string;
  roleColor: string;
  facility: string;
  location: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'canceled';
  amount: number;
}

const BookingsScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'all'>('all');
  
  // Mock data for booked shifts
  const bookedShifts: BookedShift[] = [
    {
      id: '1',
      role: 'RN',
      roleColor: '#FF3B30',
      facility: 'Rocky Mtn. Care',
      location: 'Heber City, Utah',
      date: 'June 15, 2023',
      time: '8:00 AM - 5:00 PM',
      status: 'upcoming',
      amount: 400,
    },
    {
      id: '2',
      role: 'CNA',
      roleColor: '#FF9500',
      facility: 'University Medical Center',
      location: 'Salt Lake City, Utah',
      date: 'June 18, 2023',
      time: '7:00 AM - 3:00 PM',
      status: 'upcoming',
      amount: 320,
    },
    {
      id: '3',
      role: 'LPN',
      roleColor: '#34C759',
      facility: 'Aspen Ridge',
      location: 'Park City, Utah',
      date: 'June 5, 2023',
      time: '3:00 PM - 11:00 PM',
      status: 'completed',
      amount: 350,
    },
    {
      id: '4',
      role: 'RN',
      roleColor: '#FF3B30',
      facility: 'Sunrise Senior Living',
      location: 'Sandy, Utah',
      date: 'May 28, 2023',
      time: '8:00 AM - 5:00 PM',
      status: 'completed',
      amount: 390,
    },
    {
      id: '5',
      role: 'CNA',
      roleColor: '#FF9500',
      facility: 'Mountain View Hospital',
      location: 'Payson, Utah',
      date: 'May 25, 2023',
      time: '7:00 PM - 7:00 AM',
      status: 'canceled',
      amount: 280,
    }
  ];
  
  // Filter shifts based on active tab
  const filteredShifts = bookedShifts.filter(shift => {
    if (activeTab === 'all') return true;
    return shift.status === activeTab;
  });

  const getStatusColor = (status: BookedShift['status']) => {
    switch(status) {
      case 'upcoming': return { bg: 'bg-blue-50', text: 'text-blue-500' };
      case 'completed': return { bg: 'bg-green-50', text: 'text-green-500' };
      case 'canceled': return { bg: 'bg-red-50', text: 'text-red-500' };
      default: return { bg: 'bg-gray-50', text: 'text-gray-500' };
    }
  };

  const getStatusText = (status: BookedShift['status']) => {
    switch(status) {
      case 'upcoming': return 'Upcoming';
      case 'completed': return 'Completed';
      case 'canceled': return 'Canceled';
      default: return status;
    }
  };
  
  const renderShiftCard = ({ item }: { item: BookedShift }) => {
    const statusStyle = getStatusColor(item.status);
    
    return (
      <TouchableOpacity 
        className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100"
        onPress={() => router.push({ pathname: '/schedule/[id]', params: { id: item.id } } as any)}
      >
        <View className="flex-row justify-between items-center mb-3">
          <View className="flex-row items-center">
            <View 
              className="w-10 h-10 rounded-full justify-center items-center"
              style={{ backgroundColor: item.roleColor }}
            >
              <Text className="text-white font-semibold">{item.role}</Text>
            </View>
            <Text className="ml-3 font-semibold text-gray-800">{item.facility}</Text>
          </View>
          
          <View className={`px-3 py-1 rounded-full ${statusStyle.bg}`}>
            <Text className={`text-xs font-medium ${statusStyle.text}`}>
              {getStatusText(item.status)}
            </Text>
          </View>
        </View>
        
        <View className="flex-row items-center mb-1.5">
          <Ionicons name="location-outline" size={16} color="#9CA3AF" />
          <Text className="ml-2 text-gray-600">{item.location}</Text>
        </View>
        
        <View className="flex-row items-center mb-1.5">
          <Ionicons name="calendar-outline" size={16} color="#9CA3AF" />
          <Text className="ml-2 text-gray-600">{item.date}</Text>
        </View>
        
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={16} color="#9CA3AF" />
            <Text className="ml-2 text-gray-600">{item.time}</Text>
          </View>
          
          <Text className="font-semibold text-gray-800">${item.amount}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-4 pt-4 pb-2 bg-white border-b border-gray-100">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="p-2 -ml-2"
          >
            <Ionicons name="chevron-back" size={24} color="#007AFF" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold ml-2">My Bookings</Text>
        </View>
        
        {/* Tabs */}
        <View className="flex-row border-b border-gray-100">
          <TouchableOpacity 
            className={`pb-2 mr-6 ${activeTab === 'all' ? 'border-b-2 border-purple-500' : ''}`}
            onPress={() => setActiveTab('all')}
          >
            <Text className={`font-medium ${activeTab === 'all' ? 'text-purple-500' : 'text-gray-500'}`}>
              All
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`pb-2 mr-6 ${activeTab === 'upcoming' ? 'border-b-2 border-purple-500' : ''}`}
            onPress={() => setActiveTab('upcoming')}
          >
            <Text className={`font-medium ${activeTab === 'upcoming' ? 'text-purple-500' : 'text-gray-500'}`}>
              Upcoming
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`pb-2 ${activeTab === 'completed' ? 'border-b-2 border-purple-500' : ''}`}
            onPress={() => setActiveTab('completed')}
          >
            <Text className={`font-medium ${activeTab === 'completed' ? 'text-purple-500' : 'text-gray-500'}`}>
              Completed
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Shift List */}
      {filteredShifts.length > 0 ? (
        <FlatList
          data={filteredShifts}
          renderItem={renderShiftCard}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className="flex-1 justify-center items-center p-6">
          <View className="bg-gray-100 p-4 rounded-full mb-4">
            <Ionicons name="calendar-outline" size={32} color="#8B5CF6" />
          </View>
          <Text className="text-lg font-semibold text-gray-800 mb-2">No Bookings Found</Text>
          <Text className="text-gray-500 text-center">
            You don't have any {activeTab !== 'all' ? activeTab : ''} shifts booked at the moment.
          </Text>
          <TouchableOpacity 
            className="mt-6 bg-purple-500 py-3 px-6 rounded-full"
            onPress={() => router.push('/shifts' as any)}
          >
            <Text className="text-white font-medium">Find Shifts</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default BookingsScreen; 