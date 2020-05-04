import React from 'react';
import { createBottomTabNavigator, createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';
import AddEntry from './AddEntry';
import History from './History';
import { Platform } from 'react-native';
import { purple, white } from '../utils/colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const router = {
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: 'History',
      tabBarIcon: ({ tintColor }) =>
        Platform.OS === 'ios' && <Ionicons name="ios-bookmarks" size={30} color={tintColor} />,
    },
  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: 'Add Entry',
      tabBarIcon: ({ tintColor }) =>
        Platform.OS === 'ios' && <FontAwesome name="plus-square" size={30} color={tintColor} />,
    },
  },
};

const navigationOptions = {
  tabBarOptions: {
    showIcon: true,
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      padding: 10,
      height: Platform.OS === 'ios' ? 60 : 'auto',
      fontSize: 18,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    },
  },
};

const TabNav =
  Platform.OS === 'ios'
    ? createBottomTabNavigator(router, navigationOptions)
    : createMaterialTopTabNavigator(router, navigationOptions);

export default createAppContainer(TabNav);