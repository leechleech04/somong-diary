import { colors } from '@/utils/colors';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.backgroundPurple,
        },
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: 'home',
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home"
              size={24}
              color={focused ? colors.lightPurple : colors.gray}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="diary"
        options={{
          title: 'diary',
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="cloud"
              size={24}
              color={focused ? colors.lightPurple : colors.gray}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chart/index"
        options={{
          title: 'chart',
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="bar-chart"
              size={24}
              color={focused ? colors.lightPurple : colors.gray}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="training/index"
        options={{
          title: 'training',
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="moon"
              size={24}
              color={focused ? colors.lightPurple : colors.gray}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="setting/index"
        options={{
          title: 'setting',
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="settings"
              size={24}
              color={focused ? colors.lightPurple : colors.gray}
            />
          ),
        }}
      />
    </Tabs>
  );
}
