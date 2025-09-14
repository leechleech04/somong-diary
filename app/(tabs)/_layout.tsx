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
        name="list"
        options={{
          title: 'list',
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="list"
              size={24}
              color={focused ? '#7965c1' : '#909090'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chart"
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
        name="training"
        options={{
          title: 'training',
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={focused ? '#7965c1' : '#909090'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
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
