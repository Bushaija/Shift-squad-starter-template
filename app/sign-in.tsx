import icons from '@/constants/icons';
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, Image, ScrollView, View } from 'react-native';

const SignIn = () => {
  return (
    <SafeAreaView className="h-full bg-white">
      <View className="h-full">
        <View className="h-full">
          <View className="w-full px-10 rounded-br-[100px] bg-[#4837E6] flex items-center justify-center pt-10">
            <Text className="text-white text-[1.75rem] font-bold mb-2 text-center mt-2">
              Shift Selection Made Easy
            </Text>
            <Text className="text-white text-center text-lg mb-6 px-6">
              Take control of your schedule, pick shifts on your own terms.
            </Text>
            <Image source={icons.nurse1} />
          </View>

          <View className="bg-white py-5 px-10 h-full">
            <TouchableOpacity className="bg-[#4837E6] py-3 px-6 rounded-full mb-4">
              <Text className="text-white text-lg text-center font-semibold">
                Create New Account
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-[#f0eff7] hover:bg-[#4837E6] py-3 px-6 rounded-full">
              <Text className="text-[#4837E6] text-center font-medium text-lg hover:text-white">Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
