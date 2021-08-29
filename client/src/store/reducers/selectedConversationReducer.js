import {SET_CONVERSATION_ID, CLEAR_CONVERSATION_ID} from '../../constants/actionTypes';

const initialState = {
    conversation_id: -1,
    toaddress:"",
    name:""
};

const selectedConversationReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_CONVERSATION_ID:
            state.conversation_id = action.payload.conversationId;
            state.toaddress=action.payload.toaddress
            state.name=action.payload.name
            return state;
        case CLEAR_CONVERSATION_ID:
            return initialState;
        default:
            return initialState;
    }
}

export default selectedConversationReducer;