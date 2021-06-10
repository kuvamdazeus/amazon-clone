import './styles/cart.css';
import CheckoutProductContainer from './CheckoutProductContainer.jsx';
import store from '../app-redux/store';
import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function CartContainer() {

    const history = useHistory();

    const [storeState, setStoreState] = useState(store.getState());
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        let unsubscribe = store.subscribe(() => {
            setStoreState({ ...store.getState(), cartItems: store.getState().cartItems.sort((a, b) => a.id - b.id) });
        });

        return () => unsubscribe();

    }, []);

    return (
        <section className='cart'>
            <section className='cart_container'>
                <h2>Shopping Cart</h2>
                <hr className='cart_divider' /><br />

                {storeState && storeState.cartItems.length > 0 ? storeState.cartItems.map(
                    cartItem => <CheckoutProductContainer setCartTotal={setCartTotal} cartTotal={cartTotal} 
                        product={cartItem} key={cartItem.id} />)
                :
                    <center>
                        <h3 style={{color: 'grey',marginTop: -10, marginBottom: 10}}>You don't have anything in your cart yet</h3>
                    </center>
                }

                <hr className='cart_divider' /><br />

                <Button 
                    style={{backgroundColor: '#f3c33fb7'}}
                    onClick={() => history.push('/')}
                >
                    Continue Shopping
                </Button>
            </section>
        </section>
    );
}