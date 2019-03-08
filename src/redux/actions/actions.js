import { INITIALIZE, NO_INITIALIZE, CREATE_NEW_LIST, UPDATE_ITEM, UPDATE_LIST_ITEM_AT_INDEX, TOGGLE_DONE } from './constants';
import store from '../ReduxStore';
import dataController from '../../services/datacontroller';

export function initialize() {
    return new Promise((resolve, reject) => {
        dataController.getItem('lists')
        .then(result => {
            resolve({type: INITIALIZE, val: result});
        })
        .catch(() => resolve({type: NO_INITIALIZE}))
    })
}

export function createNewList(name, iconName) {
    let today = new Date();
    today = parseInt(today.getMonth()+1) + "/"+ today.getDate() +"/"+ today.getFullYear();
    let list = {
        name,
        icon: iconName,
        date: today,
        items: []
    }
    return new Promise((resolve, reject) => {
        dataController.addItem('lists', store.getState().lists.concat(list))
        .then(() => {
            resolve({type: CREATE_NEW_LIST, val: list});
        })
        .catch(error => {
            console.log("error ", error);
            reject(error);
        })
    })
}

export function updateListItemAtIndex(index, oldData, newData) {
    let newItems = store.getState().lists[index].items;
    if (newData.item) {
        newItems.push(newData.item);
    }
    let list = {
        name: newData.name ? newData.name : oldData.name,
        icon: newData.icon ? newData.icon : oldData.icon,
        date: oldData.date,
        items: newItems
    }
    let newList = store.getState().lists;
    newList[index] = list;
    return new Promise((resolve, reject) => {
        dataController.addItem('lists', newList)
        .then(() => {
            resolve({type: UPDATE_LIST_ITEM_AT_INDEX, val: newList});
        })
        .catch(error => {
            console.log("error ", error);
            reject(error);
        })
    })
}

export function updateItem(key, value) {
    return new Promise((resolve, reject) => {
        dataController.addItem(key, value)
        .then(() => {
            resolve({type: UPDATE_ITEM, val: value})
        })
        .catch(error => {
            console.log("error ", error);
            reject(error);
        })
    })
}

export function toggleDone(listIndex, itemIndex) {
    let newList = store.getState().lists;
    newList[listIndex].items[itemIndex].done = !newList[listIndex].items[itemIndex].done; 
    return new Promise((resolve, reject) => {
        dataController.addItem('lists', newList)
        .then(() => {
            resolve({type: TOGGLE_DONE, val: newList});
        })
        .catch(error => {
            console.log("error ", error);
            reject(error);
        })
    })
}
