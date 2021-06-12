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
            orders: [...store.getState().orders, { items: store.getState().cartItems, time: Date.now() }],
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

export function cancelOrder(product) {

    let newOrders = [];

    store.getState().orders.forEach(order => {
        if (order.time === product.orderedAt) {
            let orderItems = order.items.filter(item => item.id !== product.id);
            newOrders.push({ items: orderItems, time: order.time });
        
        } else newOrders.push(order);
    });

    newOrders = newOrders.filter(order => order.items.length > 0);

    return {
        type: actionTypes.updateState,
        update: {
            currentUser: store.getState().currentUser,
            cartItems: store.getState().cartItems,
            orders: newOrders,
            addresses: store.getState().addresses,
        }
    }
}