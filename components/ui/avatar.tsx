import type React from "react"
import { View, Text, Image } from "react-native"

interface AvatarProps extends React.ComponentProps<typeof View> {
  src?: string
  fallback?: string
  size?: "sm" | "md" | "lg"
}

export const Avatar = ({ src, fallback, size = "md", className, ...props }: AvatarProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  }

  const fallbackSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  return (
    <View
      className={`relative flex-row items-center justify-center rounded-full overflow-hidden bg-gray-200 ${sizeClasses[size]} ${className || ""}`}
      {...props}
    >
      {src ? (
        <Image source={{ uri: src }} className="w-full h-full" />
      ) : fallback ? (
        <Text className={`font-medium text-gray-600 ${fallbackSizeClasses[size]}`}>
          {fallback.substring(0, 2).toUpperCase()}
        </Text>
      ) : null}
    </View>
  )
}
