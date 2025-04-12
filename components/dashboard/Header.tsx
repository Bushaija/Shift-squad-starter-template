import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';

interface HeaderProps {
  userName: string;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
  hasNotifications?: boolean;
}

/**
 * Header component with greeting message, user info, and notifications
 */
export const Header: React.FC<HeaderProps> = ({
  userName,
  onNotificationPress,
  onProfilePress,
  hasNotifications = false,
}) => {
  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <View className="pt-4 pb-4 px-5 flex-row justify-between items-center">
      <View>
        <Text className="text-gray-500 text-sm">{getGreeting()}</Text>
        <Text className="text-xl font-semibold">{userName}</Text>
      </View>
      <View className="flex-row items-center gap-3">
        <TouchableOpacity 
          className="relative p-2" 
          onPress={onNotificationPress}
          accessibilityLabel="Notifications"
          accessibilityHint="View your notifications"
        >
          <Ionicons name="notifications-outline" size={22} color="#666" />
          {hasNotifications && (
            <Badge variant="default" className="absolute top-0 right-0 w-2 h-2 p-0">{""}</Badge>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={onProfilePress}>
          <Avatar size="sm" fallback={userName.substring(0, 2)} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header; 