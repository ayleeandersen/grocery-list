import localStorage from './localstorage';

class DataController {
    constructor() {}
    
    addItem(key, value) {
        return new Promise((resolve, reject) => {
            localStorage.add(key, value)
            .then(() => {
                resolve();
            })
            .catch(error => {
                console.log('error: ', error)
                reject(error);
            })
        })
    }

    getItem(key) {
        return new Promise((resolve, reject) => {
            localStorage.get(key)
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error)
            })
        })
    }

    removeItem(key) {
        return new Promise((resolve, reject) => {
            localStorage.remove(key)
            .then(result => {
                resolve(result);
            })
            .catch(error => reject(error))
        })
    }
};

const dataController = new DataController();
export default dataController;
