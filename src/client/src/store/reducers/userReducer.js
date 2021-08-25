const initialState = {
    name: "Shilesh",
    _id: "123",
    conversationId: "61222b82a8a98c256c58d84e"
};

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return initialState;
    }
}

export default userReducer;