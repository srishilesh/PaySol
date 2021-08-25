import {SET_CONVERSATION_ID, CLEAR_CONVERSATION_ID} from '../../constants/actionTypes';

const initialState = {
    conversation_id: -1
};

const selectedConversationReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_CONVERSATION_ID:
            state.conversation_id = action.payload;
            return state;
        case CLEAR_CONVERSATION_ID:
            state.conversation_id = -1;
            return state;
        default:
            return initialState;
    }
}

export default selectedConversationReducer;