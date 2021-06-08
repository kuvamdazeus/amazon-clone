import * as actionTypes from './actionTypes.js';

export function addToCart(product) {
    return {
        type: actionTypes.addToCart,
        product,
    }
}

export function updateState(dbUser) {
    return {
        type: actionTypes.updateState,
        update: {
            currentUser: { name: dbUser.name, email: dbUser.email },
            cartItems: dbUser.cartItems,
            orders: dbUser.orders,
            addresses: dbUser.addresses
        }
    }
}