/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    TouchableOpacity,
    TextInput,
    View
} from 'react-native';
import {
    Button,
    Container,
    Content,
    Form,
    Icon,
    Input,
    Item,
    List,
    Spinner,
    SwipeRow,
    Text,
} from "native-base";
import { connect } from 'react-redux';

import navigationService from '../services/NavigationService';
import { createNewList } from '../redux/actions/actions';
import styles from '../MainStyles';


class AddListScreen extends Component {
    static navigationOptions = {
        title: 'Add List',
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle,
        headerTintColor: '#f4f4f4',
    }

    constructor(props) {
        super(props);

        this.state = {
            listNameText: "",
            iconName: ""
        }
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Item last>
                            <TextInput 
                                placeholder="List Name..." 
                                onChangeText={(listNameText) => this.setState({listNameText})}
                                value={this.state.listNameText}
                                autoFocus={true}
                                style={styles.inputField}
                            />
                        </Item>
                        <View style={styles.iconSelectionField}>
                            <Text style={styles.iconSectionTitle}>Select an icon:</Text>
                            {this._renderIconList()}
                        </View>
                        <View style={styles.iconSelectionButtons}>
                            <Button dark bordered style={styles.iconSelectionButton}
                            onPress={() => navigationService.pop()}><Text>Cancel</Text></Button>
                            <Button dark style={styles.iconSelectionButton}
                            onPress={() => this.submit()}><Text>Submit</Text></Button>
                        </View>
                    </Form>
                </Content>
            </Container>
        );
    }

    _renderIconList() {
        let values = ["list-ul", "shopping-cart", "address-card", "book", "film", "home", "paw", "user-md", "music", "calendar", "wrench", "building", "graduation-cap", "plane", "map"];

        let results = values.map((iconName) => 
            <TouchableOpacity transparent key={iconName} onPress={() => this.setState({iconName})}>
                <Icon active style={[styles.iconSelectionItem, this.state.iconName === iconName ? {color:'#B42203'} : {color:'#013549'}]} type="FontAwesome" name={iconName}/>
            </TouchableOpacity>
        );

        return results;
    }

    submit = () => {
        if (this.state.listNameText.length === 0 || this.state.iconName.length === 0) {
            alert("Please make sure the list has a name and an icon has been selected.");
        } else {
            this.props.dispatchCreateNewList(this.state.listNameText, this.state.iconName);
            navigationService.navigate('HomeScreen', {from: 'AddListScreen'});
        }
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchCreateNewList: (name, iconName) => dispatch(createNewList(name, iconName)),
    };
}

export default connect(null, mapDispatchToProps)(AddListScreen);