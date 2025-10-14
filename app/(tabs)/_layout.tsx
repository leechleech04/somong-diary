import { colors } from '@/utils/colors';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

const TabLayout = () => {
  return (
    <Container>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.backgroundPurple,
            borderTopWidth: 1,
            borderTopColor: 'white',
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
          name="setting"
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
    </Container>
  );
};

const Container = styled(SafeAreaView).attrs({
  edges: ['top', 'right', 'left'],
})`
  flex: 1;
  background-color: ${colors.backgroundPurple};
`;

export default TabLayout;
