/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import navigationService from '../services/NavigationService';


export default class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Home'
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>
                    Welcome to The Home Screen
            </Text>
                <TouchableOpacity>
                    <Text>
                        Go to Screen One
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}