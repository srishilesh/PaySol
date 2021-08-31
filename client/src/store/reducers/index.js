import { combineReducers } from "redux";
import userReducer from "./userReducer";
import selectedConversationReducer from "./selectedConversationReducer";
import conversationsReducer from './conversationsReducer'

const rootReducer = combineReducers({
    userReducer,
    selectedConversationReducer,
    conversationsReducer,
});

export default rootReducer;