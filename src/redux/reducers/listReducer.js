import { INCREMENT } from '../actions/constants';

let initialState = {   
    count: 10
};

export default function(state = initialState, action) {
    switch (action.type) {
        case INCREMENT:
            return { count: state.count + action.val };
        default: 
            return state;
    }
}
