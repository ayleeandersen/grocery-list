import { INCREMENT, INITIALIZE, NO_INITIALIZE, CREATE_NEW_LIST } from '../actions/constants';

let initialState = {
    isLoading: true,   
    lists: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case NO_INITIALIZE:
            return { ...state, isLoading: false};
        case INITIALIZE:
            return { ...state, lists: action.val, isLoading: false };
        case CREATE_NEW_LIST:
            return { ...state, lists: state.lists.concat(action.val) }
        default: 
            return state;
    }
}