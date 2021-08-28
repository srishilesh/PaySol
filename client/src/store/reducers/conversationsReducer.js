import {SET_CONVERSATIONS, CLEAR_CONVERSATIONS} from '../../constants/actionTypes';

const initialState = {};

const conversationsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_CONVERSATIONS:
            state = action.payload;
            return state;
        case CLEAR_CONVERSATIONS:
            state = {};
            return state;
        default:
            return initialState;
    }
}

export default conversationsReducer;