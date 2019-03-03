import React from 'react';

import {
    createAppContainer,
    createStackNavigator,
    NavigationActions
} from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';

let NavigationService = class NavigationService {
    constructor() {}

    getTopNavigator() {
        return (
            <TopLevelNavigator
                ref={navigatorRef => {
                    this._navigator = navigatorRef;
                }}
            />
        );
    }

    navigate(routeName, params) {
        this._navigator.dispatch(
            NavigationActions.navigate({
                routeName,
                params,
            })
        );
    }

    push(routeName, params) {
        this._navigator.dispatch(
            NavigationActions.push({
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
