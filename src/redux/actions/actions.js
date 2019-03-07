import { INITIALIZE, NO_INITIALIZE, CREATE_NEW_LIST } from './constants';
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
            console.log("error");
            reject(error);
        })
    })
}