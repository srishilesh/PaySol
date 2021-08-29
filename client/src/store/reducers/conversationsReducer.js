import {SET_CONVERSATIONS, CLEAR_CONVERSATIONS} from '../../constants/actionTypes';

const initialState = {
    conversations: [],
};

const conversationsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_CONVERSATIONS:
            state.conversations = action.payload;
            return state;
        case CLEAR_CONVERSATIONS:
            return initialState;
        default:
            return initialState;
    }
}

export default conversationsReducer;