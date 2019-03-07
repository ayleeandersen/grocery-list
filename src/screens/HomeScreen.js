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
    Container,
    Content,
    Icon,
    List,
    Spinner,
    SwipeRow,
    Text,
} from "native-base";
import { connect } from 'react-redux';

import navigationService from '../services/NavigationService';
import { increment, initialize } from '../redux/actions/actions';
import styles from '../MainStyles';
import dataController from '../services/datacontroller';


class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Grocerying',
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle,
        headerRight: (
            <Button transparent light
              onPress={() => navigationService.push('AddListScreen', {from: 'HomeScreen'})}
              title="AddList"
            >
                <Icon active name="add" type="MaterialIcons"/>
            </Button>
        ),
    }

    constructor(props) {
        super(props);
        this.props.dispatchInitialize();
    }

    render() {
        return (
            <Container>
                <Content>
                    {this.props.isLoading ? <Spinner/> : this._renderList()}
                </Content>
            </Container>
        );
    }

    _renderList() {
        return (
            <SwipeRow 
                leftOpenValue={75}
                rightOpenValue={-75}
                left={
                <Button success onPress={() => alert('Edit')}>
                    <Icon active name="edit" type="MaterialIcons"/>
                </Button>
                }
                body={
                <List>
                    <Text>SwipeRow Body Text</Text>
                </List>
                }
                right={
                <Button danger onPress={() => alert('Trash')}>
                    <Icon active name="trash" />
                </Button>
                }
            />
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchInitialize: () => dispatch(initialize()),
    };
}

function mapStateToProps(state) {
    return {
        isLoading: state.isLoading,
        lists: state.lists,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);