import React from 'react';
import { Tabs } from 'expo-router';
import { TabBar } from '../../components/navigation';
import { colors } from '../../constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' },
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="mylist" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
