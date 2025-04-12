import type React from "react"
import { View, Text } from "react-native"

export const Card = ({ className, children, ...props }: React.ComponentProps<typeof View>) => {
  return (
    <View
      className={`bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden ${className || ""}`}
      {...props}
    >
      {children}
    </View>
  )
}

export const CardHeader = ({ className, children, ...props }: React.ComponentProps<typeof View>) => {
  return (
    <View className={`p-4 ${className || ""}`} {...props}>
      {children}
    </View>
  )
}

export const CardTitle = ({ className, children, ...props }: React.ComponentProps<typeof Text>) => {
  return (
    <Text className={`text-lg font-semibold text-gray-900 ${className || ""}`} {...props}>
      {children}
    </Text>
  )
}

export const CardDescription = ({ className, children, ...props }: React.ComponentProps<typeof Text>) => {
  return (
    <Text className={`text-sm text-gray-500 ${className || ""}`} {...props}>
      {children}
    </Text>
  )
}

export const CardContent = ({ className, children, ...props }: React.ComponentProps<typeof View>) => {
  return (
    <View className={`p-4 pt-0 ${className || ""}`} {...props}>
      {children}
    </View>
  )
}

export const CardFooter = ({ className, children, ...props }: React.ComponentProps<typeof View>) => {
  return (
    <View className={`flex-row items-center p-4 pt-0 ${className || ""}`} {...props}>
      {children}
    </View>
  )
}
