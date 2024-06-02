import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ProjectsScreen from '../screens/ProjectsScreen';
import CrudProjectScreen from '../screens/CrudProjectScreen';
import TasksScreen from '../screens/TasksScreen';
import CrudTaskScreen from '../screens/CrudTaskScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="TasksScreen"
        component={TasksScreen}
        options={{
          headerShown: false,
          title: 'Tasks',
          tabBarLabel: 'Tasks',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="calendar-check"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="CrudTaskScreen"
        component={CrudTaskScreen}
        options={{
          headerShown: false,
          tabBarButton: () => null,
          tabBarVisible: false
        }}
      />

      <Tab.Screen
        name="CrudProjectScreen"
        component={CrudProjectScreen}
        options={{
          headerShown: false,
          tabBarButton: () => null,
          tabBarVisible: false
        }}
      />

      <Tab.Screen
        name="ProjectsScreen"
        component={ProjectsScreen}
        options={{
          headerShown: false,
          title: 'Projects',
          tabBarLabel: 'Projects',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="note" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
