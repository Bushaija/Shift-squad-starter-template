import React from 'react';
import { View, ViewProps } from 'react-native';
import { useWindowDimensions } from 'react-native';

interface ContainerProps extends ViewProps {
  children: React.ReactNode;
  paddingHorizontal?: number;
  centered?: boolean;
  maxWidth?: number;
}

/**
 * Container component that provides consistent width across all screens
 */
export const Container = ({ 
  children, 
  paddingHorizontal = 16, 
  centered = false,
  maxWidth = 640, // Consistent max width for all screens
  style,
  ...props 
}: ContainerProps) => {
  const { width } = useWindowDimensions();
  const containerWidth = Math.min(width, maxWidth);
  
  return (
    <View
      style={[
        { 
          width: '100%', 
          maxWidth: containerWidth,
          paddingHorizontal,
          alignSelf: centered ? 'center' : undefined,
        },
        style
      ]}
      {...props}
    >
      {children}
    </View>
  );
}; 