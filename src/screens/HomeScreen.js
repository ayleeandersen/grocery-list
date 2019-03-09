/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    ListView,
} from 'react-native';
import {
    Body,
    Button,
    CardItem,
    Container,
    Content,
    Icon,
    Left,
    List,
    ListItem,
    Spinner,
    Text,
} from "native-base";
import { connect } from 'react-redux';

import navigationService from '../services/NavigationService';
import { initialize, createNewList, updateItem } from '../redux/actions/actions';
import styles from '../MainStyles';

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
        alert("Bonus Points\n\n3b (5/5 pts):\nI let my user include a URL when they add an item. I think I should get full points for this part, since they can add, edit, or not include an image.\n3a (3/5 pts): \nIf the user doesn't include a URL it defaults to a specific \"no image\" type image. I think I should get 3/5 points for this one since it doesn't search for a unique image for every item. It just defaults.");
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.props.dispatchInitialize();
    }

    render() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
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
            <List
                leftOpenValue={75}
                rightOpenValue={-75}
                dataSource={this.ds.cloneWithRows(this.props.lists)}
                renderRow={(data, secId, rowId) =>
                    <ListItem onPress={() => this.selectRow(data, rowId)}>
                        <CardItem>
                            <Left>
                                <Icon active style={styles.listIcon} name={data.icon} type="FontAwesome"/>
                                <Body>
                                    <Text style={styles.listText}>{data.name}</Text>
                                    <Text note style={styles.listTextNote}>{data.date}</Text>
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
                    <Button full danger onPress={()=> this.deleteRow(secId, rowId, rowMap)}>
                        <Icon active name="trash" />
                    </Button>
                }
            />
        );
    }

    selectRow(data, rowId) {
        navigationService.push('SubListScreen', {from: 'HomeScreen', data: data, index: rowId});
    }

    editRow(data, rowId) {
        navigationService.push('AddListScreen', {from: 'HomeScreen', data: data, index: rowId});
    }

    deleteRow(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.props.lists];
        newData.splice(rowId, 1);
        this.props.dispatchUpdateItem('lists', newData);
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchInitialize: () => dispatch(initialize()),
        dispatchUpdateItem: (key, value) => dispatch(updateItem(key, value)),
    };
}

function mapStateToProps(state) {
    return {
        isLoading: state.isLoading,
        lists: state.lists,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);