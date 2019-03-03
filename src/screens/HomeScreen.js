/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  TouchableOpacity,
  View
} from 'react-native';
import {
    Button,
    Text,
} from "native-base";
import styles from '../MainStyles';


export default class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Home',
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle,
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.body}>
                <Text>
                    Welcome to The Home Screen
                </Text>
                <Button bordered>
                    <Text>Hello There</Text>
                </Button>
            </View>
        );
    }
}