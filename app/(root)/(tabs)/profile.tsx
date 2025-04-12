import {
  ActivityIndicator,
  Alert,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useRouter } from "expo-router";

// import { logout } from "@/lib/appwrite";
// import { useGlobalContext } from "@/lib/global-provider";

import icons from "@/constants/icons";
import { settings } from "@/constants/data";
import { ComponentProps } from "react";

type IconName = ComponentProps<typeof Ionicons>["name"];

// Define a more flexible interface for settings items
interface SettingItem {
  title: string;
  icon: IconName;
  description: string;
  isWallet?: boolean;
  isBookings?: boolean;
  route?: string;
}

// Organize settings into categories for better UI organization
const SETTINGS_CATEGORIES = {
  activity: [
    {
      title: "My Bookings",
      icon: "calendar-outline" as IconName,
      description: "View and manage your shifts",
      isBookings: true,
    },
    {
      title: "Payments",
      icon: "wallet-outline" as IconName,
      description: "Payment methods and history",
      isWallet: true,
    },
  ] as SettingItem[],
  account: [
    {
      title: "Profile Settings",
      icon: "person-outline" as IconName,
      description: "Update your personal information",
    },
    {
      title: "Notifications",
      icon: "notifications-outline" as IconName,
      description: "Manage your notification preferences",
    },
    {
      title: "Security",
      icon: "shield-checkmark-outline" as IconName,
      description: "Password and authentication settings",
    },
  ] as SettingItem[],
  preferences: [
    {
      title: "Language",
      icon: "language-outline" as IconName,
      description: "Change your app language",
    },
    {
      title: "Appearance",
      icon: "color-palette-outline" as IconName, 
      description: "Light, dark and system themes",
    },
  ] as SettingItem[],
  support: [
    {
      title: "Help Center",
      icon: "help-circle-outline" as IconName,
      description: "Get help with using the app",
    },
    {
      title: "Invite Friends",
      icon: "people-outline" as IconName,
      description: "Share the app with colleagues",
    },
    {
      title: "About",
      icon: "information-circle-outline" as IconName,
      description: "App version and legal information",
    },
  ] as SettingItem[],
};

interface SettingsItemProp {
  icon: IconName | ImageSourcePropType;
  title: string;
  description?: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
  isIconComponent?: boolean;
  isWallet?: boolean;
  isBookings?: boolean;
}

const SettingsItem = ({
  icon,
  title,
  description,
  onPress,
  textStyle,
  showArrow = true,
  isIconComponent = true,
}: SettingsItemProp) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex flex-row items-center justify-between py-4 px-1"
    style={styles.settingsItem}
  >
    <View className="flex flex-row items-center gap-4">
      {isIconComponent ? (
        <View className="bg-violet-50 p-2 rounded-full">
          <Ionicons name={icon as IconName} size={22} color="#8B5CF6" />
        </View>
      ) : (
        <Image source={icon as ImageSourcePropType} className="size-6" />
      )}
      <View>
        <Text className={`text-base font-rubik-medium text-gray-800 ${textStyle}`}>
          {title}
        </Text>
        {description && (
          <Text className="text-xs text-gray-500 mt-1" numberOfLines={1}>
            {description}
          </Text>
        )}
      </View>
    </View>

    {showArrow && (
      <Ionicons name="chevron-forward" size={18} color="#CCCCCC" />
    )}
  </TouchableOpacity>
);

const SettingsSection = ({ title, items }: { title: string; items: SettingItem[] }) => {
  const router = useRouter();
  
  const handleItemPress = (item: SettingItem) => {
    if (item.isWallet) {
      // Specifically handle the wallet navigation
      router.push("/payment/wallet" as any);
    } else if (item.isBookings) {
      // Navigate to bookings page
      router.push("/bookings" as any);
    }
  };
  
  return (
    <Animated.View entering={FadeInUp.duration(400).delay(200)} className="mt-4">
      <Text className="text-sm font-rubik uppercase text-gray-500 mb-2 px-1">{title}</Text>
      <View className="bg-white rounded-xl overflow-hidden shadow-sm">
        {items.map((item, index) => (
          <View key={index}>
            <SettingsItem 
              {...item} 
              onPress={() => handleItemPress(item)}
            />
            {index < items.length - 1 && <View className="h-[1px] bg-gray-100 ml-14 mr-2" />}
          </View>
        ))}
      </View>
    </Animated.View>
  );
};

const Profile = () => {
  // const { user, refetch } = useGlobalContext();
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const user = {
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    email: "john.doe@example.com",
    role: "Registered Nurse",
    memberSince: "Mar 2023"
  };

  const handleLogout = async () => {
    setLoading(true);
    // Simulate logout
    setTimeout(() => {
      setLoading(false);
      console.log("logout");
      Alert.alert("Logged Out", "You have been successfully logged out.");
    }, 1000);
  };

  return (
    <SafeAreaView style={{ paddingTop: insets.top }} className="flex-1 bg-gray-50">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-40"
      >
        {/* Header */}
        <LinearGradient
          colors={['rgba(139, 92, 246, 0.8)', 'rgba(139, 92, 246, 0.6)']}
          className="pt-2 pb-20"
        >
          <View className="flex flex-row items-center justify-between px-5">
            <Text className="text-xl font-rubik-bold text-white">Profile</Text>
            <TouchableOpacity className="bg-white/20 rounded-full p-2">
              <Ionicons name="notifications-outline" size={22} color="white" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Profile Card */}
        <Animated.View 
          entering={FadeInDown.duration(400)}
          className="mx-5 -mt-16 bg-white rounded-xl shadow-md overflow-hidden"
        >
          <View className="p-5">
            <View className="flex flex-row">
              <Image
                source={{ uri: user?.avatar }}
                className="size-20 rounded-full border-4 border-white"
              />
              <View className="ml-4 justify-center">
                <Text className="text-xl font-rubik-bold text-gray-800">{user?.name}</Text>
                <Text className="text-sm text-gray-500">{user?.email}</Text>
                <View className="flex-row items-center mt-1">
                  <View className="bg-violet-100 px-2 py-1 rounded-full">
                    <Text className="text-xs text-violet-700 font-rubik-medium">{user?.role}</Text>
                  </View>
                </View>
              </View>
            </View>
            
            <View className="flex-row justify-between mt-5 pt-4 border-t border-gray-100">
              <View className="items-center">
                <Text className="text-lg font-rubik-bold text-gray-800">24</Text>
                <Text className="text-xs text-gray-500">Shifts</Text>
              </View>
              <View className="items-center">
                <Text className="text-lg font-rubik-bold text-gray-800">18</Text>
                <Text className="text-xs text-gray-500">Completed</Text>
              </View>
              <View className="items-center">
                <Text className="text-lg font-rubik-bold text-gray-800">4.9</Text>
                <Text className="text-xs text-gray-500">Rating</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Settings Sections */}
        <View className="px-5 mt-6">
          <SettingsSection title="Activity" items={SETTINGS_CATEGORIES.activity} />
          <SettingsSection title="Account" items={SETTINGS_CATEGORIES.account} />
          <SettingsSection title="Preferences" items={SETTINGS_CATEGORIES.preferences} />
          <SettingsSection title="Support" items={SETTINGS_CATEGORIES.support} />

          <Animated.View 
            entering={FadeInUp.duration(400).delay(600)}
            className="mt-8"
          >
            <TouchableOpacity
              onPress={handleLogout}
              disabled={loading}
              className="bg-red-50 rounded-xl py-4 flex-row items-center justify-center"
            >
              {loading ? (
                <ActivityIndicator size="small" color="#EF4444" />
              ) : (
                <>
                  <Ionicons name="log-out-outline" size={20} color="#EF4444" />
                  <Text className="text-red-500 font-rubik-medium ml-2">Logout</Text>
                </>
              )}
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  settingsItem: {
    borderRadius: 12,
  },
});

export default Profile;