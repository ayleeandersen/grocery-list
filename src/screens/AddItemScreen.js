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
    Item,
    Text,
} from "native-base";
import { connect } from 'react-redux';

import navigationService from '../services/NavigationService';
import { createNewList, updateListItemAtIndex } from '../redux/actions/actions';
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
        }
    }

    componentDidMount() {
        if(this.props.navigation.getParam('index')) {
            this.setState({listIndex: this.props.navigation.getParam('index')});
        } else {
            this.setState({listIndex: this.props.lists.length-1});
        }
    }

    render() {
        console.log(this.state.listIndex);
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
            //TODO: save item
            //TODO: fix this so it goes to subListScreen
            navigationService.navigate('Home', {from: 'AddListScreen'});
        }
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchUpdateListItemAtIndex: (index, oldData, newData) => dispatch(updateListItemAtIndex(index, oldData, newData)),
    };
}

function mapStateToProps(state) {
    return {
        lists: state.lists,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddItemScreen);