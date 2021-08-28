import { combineReducers } from "redux";
import userReducer from "./userReducer";
import selectedConversationReducer from "./selectedConversationReducer";

const rootReducer = combineReducers({
    userReducer,
    selectedConversationReducer,
});

export default rootReducer;