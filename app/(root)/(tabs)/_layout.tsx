import { View, Text, Image } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import icons from '@/constants/icons';
import { Ionicons } from "@expo/vector-icons"
import { ComponentProps } from 'react';

type IconName = ComponentProps<typeof Ionicons>['name'];

type TabIconProps = {
    focused: boolean;
    title: string;
    icon: IconName;
};

const TabIcon = ({ focused, title, icon }: TabIconProps) => {
    return (
        <View className="flex-1 mt-3 flex-col items-center">
            {/* <Image source={icon} tintColor={focused ? "#0061FF" : "#666876"} resizeMode="contain" className="size-6" /> */}
            <Ionicons name={icon} size={20} color={focused ? "#8B5CF6" : "#999"}/>
            <Text className={`${focused ? 'text-primary-300 font-rubik-medium' : 'text-black-200 font-rubik'} text-xs w-full text-center mt-1`}>{title}</Text>
        </View>
    )
}

export default function TabsLayout() {
  
  return (
    <Tabs
     screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
            backgroundColor: "white",
            position: "absolute",
            borderTopColor: "#0061FF1A",
            borderTopWidth: 1,
            minHeight: 70,
        }
     }}
    >
        <Tabs.Screen 
            name="home"
            options={{
                title: "Home",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon
                        icon={focused ? "home" : "home-outline"}  
                        title="Home"
                        focused={focused}
                    />
                )
            }}
        />

        <Tabs.Screen 
            name="shifts"
            options={{
                title: "Shifts",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon
                        icon={focused ? "briefcase" : "briefcase-outline"}  
                        title="Shifts"
                        focused={focused}
                    />
                )
            }}
        />

        <Tabs.Screen 
            name="schedule"
            options={{
                title: "Schedule",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon
                        icon={focused ? "calendar" : "calendar-outline"}  
                        title="Schedule"
                        focused={focused}
                    />
                )
            }}
        />

        <Tabs.Screen 
            name="profile"
            options={{
                title: "Profile",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon
                        icon={focused ? "person" : "person-outline"}  
                        title="Profile"
                        focused={focused}
                    />
                )
            }}
        />

    </Tabs>
  )
}