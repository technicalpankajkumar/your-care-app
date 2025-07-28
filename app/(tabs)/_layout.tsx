import { Tabs } from 'expo-router';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Use NativeWind classes if working, else fallback to style
function TabBarBackground() {
  return (
    <LinearGradient
      colors={['#667eea', '#1D4ED8']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        // height: 88,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 16,
        elevation: 8,
      }}
    >
      {/* Optional: Add a subtle overlay for glass effect */}
      <View className="absolute inset-0 bg-white/10 rounded-t-2xl" />
    </LinearGradient>
  );
}

import type { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { IconSymbol } from 'app-example/components/ui/IconSymbol';
import { LinearGradient } from 'expo-linear-gradient';

function HapticTab({
  children,
  onPress,
  accessibilityState,
  ...props
}: BottomTabBarButtonProps) {
  const isSelected = accessibilityState?.selected;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className={`flex-1 items-center justify-center ${isSelected ? "bg-blue-100 dark:bg-blue-900" : ""}`}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
}

export default function TabLayout() {
  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#ffffff",
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: "600",
          },
          tabBarStyle: Platform.select({
            ios: {
              position: 'absolute',
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              height: 64,
              backgroundColor: "#fff",
              shadowColor: "#000",
              shadowOpacity: 0.08,
              shadowRadius: 12,
            },
            default: {
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              height: 64,
              backgroundColor: "#fff",
              elevation: 8,
            },
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <IconSymbol
                size={28}
                name="house.fill"
                color={focused ? "#2563eb" : "#6b7280"}
              />
            ),
            tabBarLabel: ({ focused }) => (
              <Text className={focused ? "text-blue-600" : "text-gray-500"}>
                Home
              </Text>
            ),
          }}
        />
        {/* Add more Tabs.Screen for other tabs here */}
      </Tabs>
    </SafeAreaProvider>
  );
}