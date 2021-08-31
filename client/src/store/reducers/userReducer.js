import {SET_USER} from '../../constants/actionTypes';

const initialState = {
    name: "",
    _id: "",
    pk : null
};

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER:
            state.name=action.payload.name
            state._id=action.payload._id
            state.pk=action.payload.pk
            return state;
        default:
            return initialState;
    }
}

export default userReducer;