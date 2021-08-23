const initialState = {
    name: "Shilesh",
    _id: "123"
};

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return initialState;
    }
}

export default userReducer;