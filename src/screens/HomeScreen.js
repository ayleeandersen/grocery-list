/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View
} from 'react-native';
import {
    Button,
    Spinner,
    Text,
} from "native-base";
import { connect } from 'react-redux';

import { increment, initialize } from '../redux/actions/actions';
import styles from '../MainStyles';


class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Home',
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle,
    }

    constructor(props) {
        super(props);
        this.props.dispatchInitialize();
    }

    render() {
        return (
            <View style={styles.body}>
                <Text>
                    Welcome to The Home Screen
                </Text>
                <Text>{this.props.count}</Text>
                <Button bordered onPress={() => this.props.dispatchIncrement(1)}>
                    <Text>Hello There</Text>
                </Button>
                {this.props.isLoading && <Spinner/>}
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchIncrement: (val) => dispatch(increment(val)),
        dispatchInitialize: () => dispatch(initialize()),
    };
}

function mapStateToProps(state) {
    return {
        count: state.count,
        isLoading: state.isLoading
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);