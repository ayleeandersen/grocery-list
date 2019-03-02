import { INCREMENT, DECREMENT } from '../actions/constants';

let initialState = {   
    count: 0
};

export default function(state = initialState, action) {
    switch (action.type) {
        case INCREMENT:
            return { count: state.count + action.val };
        case DECREMENT:
            return { count: state.count - 1 };
        default: 
            return state;
    }
}
