import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface PaymentActivity {
  id: string;
  type: 'payout' | 'payment';
  status: 'success' | 'processing';
  amount: number;
  date: string;
}

const WalletScreen = () => {
  const router = useRouter();
  
  // Mock data for payment activities
  const paymentActivities: PaymentActivity[] = [
    {
      id: '1',
      type: 'payout',
      status: 'processing',
      amount: 231,
      date: '9 Jun, 2023',
    },
    {
      id: '2',
      type: 'payment',
      status: 'success',
      amount: 32,
      date: '5 Jun, 2023',
    },
    {
      id: '3',
      type: 'payment',
      status: 'success',
      amount: 898,
      date: '1 Jun, 2023',
    },
    {
      id: '4',
      type: 'payment',
      status: 'success',
      amount: 123,
      date: '29 May, 2023',
    },
    {
      id: '5',
      type: 'payment',
      status: 'success',
      amount: 2055,
      date: '20 May, 2023',
    },
  ];

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
        <Text className="text-lg font-semibold ml-2">Wallet</Text>
      </View>

      <ScrollView className="flex-1 px-4">
        {/* Balance Cards */}
        <View className="flex-row mt-4 mb-6">
          <View className="flex-1 mr-2 bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
            <Text className="text-2xl font-bold text-purple-500">$2367</Text>
            <View className="flex-row items-center mt-1">
              <Text className="text-gray-500 text-sm">Total Earnings</Text>
              <TouchableOpacity className="ml-1">
                <Ionicons name="information-circle-outline" size={16} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          </View>
          
          <View className="flex-1 ml-2 bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
            <Text className="text-2xl font-bold text-purple-500">$67.09</Text>
            <View className="flex-row items-center mt-1">
              <Text className="text-gray-500 text-sm">Processing</Text>
              <TouchableOpacity className="ml-1">
                <Ionicons name="information-circle-outline" size={16} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Account Section */}
        <View className="flex-row justify-between items-center bg-white border border-gray-100 rounded-xl p-4 shadow-sm mb-6">
          <Text className="text-gray-800">Account ********1234</Text>
          <TouchableOpacity>
            <Ionicons name="create-outline" size={20} color="#8B5CF6" />
          </TouchableOpacity>
        </View>
        
        {/* Payment Activity */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-4">Payment Activity</Text>
          
          {paymentActivities.map((activity) => (
            <View 
              key={activity.id}
              className="flex-row justify-between items-center py-4 border-b border-gray-100"
            >
              <View>
                <Text className="text-gray-800 font-medium">
                  {activity.type === 'payout' ? 'Pay out initiated' : 'Payment done'}
                </Text>
                <Text className="text-gray-500 text-sm mt-1">{activity.date}</Text>
              </View>
              
              <View className="flex-row items-center">
                <Text className="text-gray-800 font-semibold mr-2">
                  ${activity.amount}
                </Text>
                <View 
                  className={`px-2 py-1 rounded-md ${
                    activity.status === 'success' 
                    ? 'bg-green-50' 
                    : 'bg-orange-50'
                  }`}
                >
                  <Text 
                    className={`text-xs font-medium ${
                      activity.status === 'success' 
                      ? 'text-green-500' 
                      : 'text-orange-500'
                    }`}
                  >
                    {activity.status === 'success' ? 'Success' : 'In Progress'}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalletScreen;
