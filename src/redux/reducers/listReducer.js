import { INCREMENT, INITIALIZE, NO_INITIALIZE } from '../actions/constants';

let initialState = {
    isLoading: true,   
    count: 10,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case NO_INITIALIZE:
            return { ...state, isLoading: false};
        case INITIALIZE:
            return { count: action.val, isLoading: false };
        case INCREMENT:
            return { ...state, count: state.count + action.val };
        default: 
            return state;
    }
}
