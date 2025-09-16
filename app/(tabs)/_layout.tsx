import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'home',
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home"
              size={24}
              color={focused ? '#7965c1' : '#909090'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="diary/index"
        options={{
          title: 'diary',
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="cloud"
              size={24}
              color={focused ? '#7965c1' : '#909090'}
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
              color={focused ? '#7965c1' : '#909090'}
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
              color={focused ? '#7965c1' : '#909090'}
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
              color={focused ? '#7965c1' : '#909090'}
            />
          ),
        }}
      />
    </Tabs>
  );
}
