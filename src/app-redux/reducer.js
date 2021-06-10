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
            let ids = state.cartItems.map(item => item?.id);

            if (ids.includes(action.product.id)) {
                return state;
            }

            return {
                ...state,
                cartItems: [...state.cartItems, { ...action.product, quantity: 1 }].sort((a, b) => a.id - b.id)
            };
        
        case actionTypes.updateState:
            return {
                ...action.update,
                cartItems: action.update.cartItems.sort((a, b) => a.id - b.id),
            };
        
        case actionTypes.removeFromCart:
            let newCartItems = state.cartItems.filter(item => item?.id !== action.productId);
            return {
                ...state,
                cartItems: newCartItems
            }
        
        default:
            return state;

    }
}

export default reducer;