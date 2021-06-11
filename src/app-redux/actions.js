import * as actionTypes from './actionTypes.js';
import store from './store.js';

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

export function alterCart(newProduct) {
    let alteredItems = store.getState().cartItems.filter(item => item.id !== newProduct.id);
    alteredItems.push(newProduct);

    return {
        type: actionTypes.updateState,
        update: {
            currentUser: store.getState().currentUser,
            cartItems: alteredItems,
            orders: store.getState().orders,
            addresses: store.getState().addresses,
        }
    }
}

export function cartCheckout() {
    return {
        type: actionTypes.updateState,
        update: {
            currentUser: store.getState().currentUser,
            cartItems: [],
            orders: [...store.getState().orders, store.getState().cartItems],
            addresses: store.getState().addresses,
        }
    }
}

export function removeFromCart(product) {
    return {
        type: actionTypes.removeFromCart,
        productId: product.id,
    }
}