/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    TextInput,
    View
} from 'react-native';
import {
    Button,
    Container,
    Content,
    Form,
    Item,
    Text,
} from "native-base";
import { connect } from 'react-redux';

import navigationService from '../services/NavigationService';
import { updateListItemAtIndex, updateItemNameAndImage } from '../redux/actions/actions';
import styles from '../MainStyles';


class AddItemScreen extends Component {
    static navigationOptions = {
        title: 'Add Item',
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle,
        headerTintColor: '#f4f4f4',
    }

    constructor(props) {
        super(props);

        this.state = {
            itemText: "",
            listIndex: null,
            urlText: ""
        }
    }

    componentDidMount() {
        if(this.props.navigation.getParam('index')) {
            this.setState({listIndex: this.props.navigation.getParam('index')});
        } else {
            this.setState({listIndex: this.props.lists.length-1});
        }

        let data = this.props.navigation.getParam('data');
        if (data) {
            this.setState({itemText: data.name, listIndex: this.props.navigation.getParam('listIndex'), urlText: data.url});
        }
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Item last>
                            <TextInput 
                                placeholder="Item Name..." 
                                onChangeText={(itemText) => this.setState({itemText})}
                                value={this.state.itemText}
                                style={styles.inputField}
                                autoFocus={true}
                            />
                        </Item>
                        <Item last>
                            <TextInput 
                                placeholder="Optional image URL..." 
                                onChangeText={(urlText) => this.setState({urlText})}
                                value={this.state.urlText}
                                style={styles.inputField}
                            />
                        </Item>
                        <View style={styles.iconSelectionButtons}>
                            <Button dark bordered style={styles.iconSelectionButton}
                            onPress={() => navigationService.pop()}><Text>Cancel</Text></Button>
                            <Button dark style={styles.iconSelectionButton}
                            onPress={() => this.submit()}><Text>Done</Text></Button>
                        </View>
                    </Form>
                </Content>
            </Container>
        );
    }

    submit = () => {
        if (this.state.itemText.length === 0) {
            alert("Please make sure the item has a name.");
        } else {
            if (this.props.navigation.getParam('data')) {
                this.props.dispatchUpdateItemNameAndImage(this.state.listIndex, this.props.navigation.getParam('itemIndex'), this.state.itemText, this.state.urlText);

                navigationService.navigate('SubListScreen', {from: 'AddItemScreen', index: this.state.listIndex});
            } else {
                this.props.dispatchUpdateListItemAtIndex(this.state.listIndex, this.props.lists[this.state.listIndex], {item: {name: this.state.itemText, done: false, url: this.state.urlText}});

                if (this.props.navigation.getParam('index')) {
                    navigationService.navigate('SubListScreen', {from: 'AddItemScreen', index: this.props.navigation.getParam('index')});
                } else {
                    navigationService.navigate('SubListScreen', {from: 'AddItemScreen'});
                }
            }
        }
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchUpdateListItemAtIndex: (index, oldData, newData) => dispatch(updateListItemAtIndex(index, oldData, newData)),
        dispatchUpdateItemNameAndImage: (listIndex, itemIndex, newName, newURL) => dispatch(updateItemNameAndImage(listIndex, itemIndex, newName, newURL)),
    };
}

function mapStateToProps(state) {
    return {
        lists: state.lists,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddItemScreen);