import * as actionTypes from './actionTypes.js';

const initialState = {
    currentUser: {},
    cartItems: [],
    orders: [],
    addresses: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.addToCart:
            return {
                ...state,
                cartItems: [...state.cartItems, action.product]
            };
        
        case actionTypes.updateState:
            return action.update;
        
        default:
            return state;

    }
}

export default reducer;