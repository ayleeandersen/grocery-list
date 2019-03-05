import { INCREMENT, INITIALIZE, NO_INITIALIZE } from './constants';
import store from '../ReduxStore';
import dataController from '../../services/datacontroller';

export function increment(val) {
    dataController.addItem('count', store.getState().count + val);
    return {
        type: INCREMENT,
        val: val
    };
}

export function initialize() {
    return new Promise((resolve, reject) => {
        dataController.getItem('count')
        .then(result => {
            resolve({type: INITIALIZE, val: result});
        })
        .catch(() => resolve({type: NO_INITIALIZE}))
    })
}