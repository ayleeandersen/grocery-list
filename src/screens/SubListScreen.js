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
    Button,
    CardItem,
    Container,
    Content,
    Icon,
    Left,
    List,
    ListItem,
    Right,
    Spinner,
    Text,
} from "native-base";
import { connect } from 'react-redux';

import navigationService from '../services/NavigationService';
import { toggleDone, updateItem } from '../redux/actions/actions';
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
                        if (navigation.getParam('index')) {
                            navigationService.push('AddItemScreen', {from: 'SubListScreen', index: navigation.getParam('index')});
                        } else {
                            navigationService.push('AddItemScreen', {from: 'SubListScreen'});
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
        this.state = {
            listIndex: null,
        }
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    }

    componentDidMount() {
        if(this.props.navigation.getParam('index')) {
            this.setState({listIndex: this.props.navigation.getParam('index')});
        } else {
            this.setState({listIndex: this.props.lists.length-1});
        }
    }

    render() {
        if (this.state.listIndex === null) {
            return <Spinner/>;
        }
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return (
            <Container>
                <Content>
                    <List
                        leftOpenValue={75}
                        rightOpenValue={-75}
                        dataSource={this.ds.cloneWithRows(this.props.lists[this.state.listIndex].items)}
                        renderRow={(data, secId, rowId) =>
                            <ListItem onPress={() => this.selectRow(data, rowId)}>
                                <CardItem style={data.done ? {backgroundColor: '#e3e4e5'} : {}}>
                                    <Left>
                                        <Text style={styles.listText}>{data.name}</Text>
                                    </Left>
                                    <Right>
                                        {data.done ? 
                                        <Icon active style={[styles.listIcon, {color:'green'}]} name="md-checkmark-circle"/> : 
                                        <Icon active style={styles.listIcon} name="md-checkmark-circle-outline"/>}
                                    </Right>
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
                </Content>
            </Container>
        );
    }

    selectRow(data, rowId) {
        this.props.dispatchToggleDone(this.state.listIndex, rowId);
        this.forceUpdate();
    }

    editRow(data, rowId) {
        alert("Editing ", rowId);
    }

    deleteRow(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.props.lists];
        newData[this.state.listIndex].items.splice(rowId, 1);
        this.props.dispatchUpdateItem('lists', newData);
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchUpdateItem: (key, value) => dispatch(updateItem(key, value)),
        dispatchToggleDone: (listIndex, itemIndex) => dispatch(toggleDone(listIndex, itemIndex)),
    };
}

function mapStateToProps(state) {
    return {
        lists: state.lists,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubListScreen);