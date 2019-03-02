import React from 'react';

import {
    createAppContainer,
    createStackNavigator,
    NavigationActions
} from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';

let NavigationService = class NavigationService {
    constructor() {
    }

    getTopNavigator() {
        return (
            <TopLevelNavigator
                ref={navigatorRef => {
                    this._navigator = navigatorRef;
                }}
            />
        );
    }

    // Navigate to any screen
    navigate(routeName, params) {
        this._navigator.dispatch(
            NavigationActions.navigate({
                routeName,
                params,
            })
        );
    }
}

const navigationService = new NavigationService();
export default navigationService;

const Root = createStackNavigator(
    {
        Home: HomeScreen,
    },
    {
        initialRouteName: 'Home'
    }
);

const TopLevelNavigator = createAppContainer(Root);
