import type React from "react"
import { View, Text } from "react-native"

interface BadgeProps extends React.ComponentProps<typeof View> {
  variant?: "default" | "secondary" | "destructive" | "outline"
  children: React.ReactNode
  className?: string
}

export const Badge = ({ variant = "default", className, children, ...props }: BadgeProps) => {
  const variantClasses = {
    default: "bg-purple-100 text-purple-800",
    secondary: "bg-gray-100 text-gray-800",
    destructive: "bg-red-100 text-red-800",
    outline: "border border-gray-200 text-gray-800",
  }

  return (
    <View className={`px-2.5 py-0.5 rounded-full ${variantClasses[variant]} ${className || ""}`} {...props}>
      <Text
        className={`text-xs font-medium ${variant === "default" ? "text-purple-800" : variant === "destructive" ? "text-red-800" : "text-gray-800"}`}
      >
        {children}
      </Text>
    </View>
  )
}
