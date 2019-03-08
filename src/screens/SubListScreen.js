/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    ListView,
    TouchableOpacity,
    TextInput,
    View
} from 'react-native';
import {
    Body,
    Button,
    CardItem,
    Container,
    Content,
    Form,
    Icon,
    Left,
    List,
    ListItem,
    Item,
    Text,
} from "native-base";
import { connect } from 'react-redux';

import navigationService from '../services/NavigationService';
import { createNewList, updateListItemAtIndex } from '../redux/actions/actions';
import styles from '../MainStyles';


class SubListScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('data').name,
            headerStyle: styles.headerStyle,
            headerTitleStyle: styles.headerTitleStyle,
            headerTintColor: '#f4f4f4',
            headerRight: (
                <Button transparent light
                  onPress={() => {
                        if (navigation.getParam('from') === 'AddListScreen') {
                            navigationService.push('AddItemScreen', {from: 'SubListScreen'});
                        } else {
                            navigationService.push('AddItemScreen', {from: 'SubListScreen', index: navigation.getParam('index')});
                        }
                  }}
                  title="AddList"
                >
                    <Icon active name="add" type="MaterialIcons"/>
                </Button>
            ),
        };
    }

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    }

    render() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        let viewList;
        if (this.props.navigation.getParam('from') === 'AddListScreen') {
            viewList = this.props.lists[this.props.lists.length - 1].items;
        } else {
            viewList = this.props.lists[this.props.navigation.getParam('index')].items;
        }
        return (
            <Container>
                <Content>
                    <List
                        leftOpenValue={75}
                        rightOpenValue={-75}
                        dataSource={this.ds.cloneWithRows(viewList)}
                        renderRow={(data, secId, rowId) =>
                            <ListItem onPress={() => this.selectRow(data, rowId)}>
                                <CardItem>
                                    <Left>
                                        <Body>
                                            <Text style={styles.listText}>{data.name}</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                            </ListItem>
                        }
                        renderLeftHiddenRow={(data, secId, rowId) =>
                            <Button full warning onPress={() => this.editRow(data, rowId)}>
                                <Icon active name="edit" type="MaterialIcons"/>
                            </Button>
                        }
                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                            <Button full danger onPress={()=> this.deleteRow(secId, rowId, rowMap, viewList)}>
                                <Icon active name="trash" />
                            </Button>
                        }
                    />
                </Content>
            </Container>
        );
    }

    selectRow(data, rowId) {
        alert("Selected ", rowId);
    }

    editRow(data, rowId) {
        alert("Editing ", rowId);
    }

    deleteRow(secId, rowId, rowMap, viewList) {
        alert("Deleting ", rowId);
        // rowMap[`${secId}${rowId}`].props.closeRow();
        // const newData = [...viewList];
        // newData.splice(rowId, 1);
        //TODO: fix this one
        // this.props.dispatchUpdateItem('lists', newData);
      }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchUpdateItem: (key, value) => dispatch(updateItem(key, value)),
    };
}

function mapStateToProps(state) {
    return {
        lists: state.lists,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubListScreen);