import React from 'react';

import {
    createAppContainer,
    createStackNavigator,
    NavigationActions,
    StackActions,
} from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import AddListScreen from '../screens/AddListScreen';

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
            StackActions.push({
                routeName,
                params,
            })
        );
    }

    pop() {
        this._navigator.dispatch(
            StackActions.pop()
        );
    }
}

const navigationService = new NavigationService();
export default navigationService;

const Root = createStackNavigator(
    {
        Home: HomeScreen,
        AddListScreen: AddListScreen,
    },
    {
        initialRouteName: 'Home'
    }
);

const TopLevelNavigator = createAppContainer(Root);
