import type { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import { Home } from 'lucide-react-native';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function TabBarBackground() {
  return (
    <View style={StyleSheet.absoluteFill}>
      <LinearGradient
        colors={['#3B82F6', '#1D4ED8']}
        style={{
          flex: 1,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
      />
    </View>
  );
}

function AnimatedBubbleTab({ children, onPress, accessibilityState }: BottomTabBarButtonProps) {
  const isFocused = accessibilityState?.selected;
  const scale = useSharedValue(isFocused ? 1.1 : 1);

  scale.value = withTiming(isFocused ? 1.1 : 1, { duration: 250 });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  if (isFocused) {
    return (
      <Animated.View style={[styles.centerTab, animatedStyle]}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.bubble}>
          {children}
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {children}
    </TouchableOpacity>
  );
}

export default function TabLayout() {
  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#1D4ED8',
          tabBarInactiveTintColor: '#9CA3AF',
          tabBarBackground: TabBarBackground,
          tabBarStyle: {
            position: 'absolute',
            height: 75,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            backgroundColor: '#ffffff',
            ...styles.shadow,
          },
          tabBarButton: (props) => {
            if (route.name === 'index') {
              return <AnimatedBubbleTab {...props} />;
            }
            return <TouchableOpacity {...props} style={{ flex: 1 }} />;
          },
        }
      )}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <Home size={24} color={color} />,
          }}
        />
        {/* <Tabs.Screen
          name="center"
          options={{
            title: 'Transfer',
            tabBarIcon: ({ color }) => <Repeat size={28} color="#fff" />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <User size={24} color={color} />,
          }}
        /> */}
      </Tabs>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  bubble: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#1D4ED8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerTab: {
    position: 'absolute',
    top: -32,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      android: {
        elevation: 10,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
    }),
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 10,
  },
});
