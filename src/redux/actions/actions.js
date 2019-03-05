import { INCREMENT } from './constants';

export function increment(val) {
    return {
        type: INCREMENT,
        val: val
    };
}