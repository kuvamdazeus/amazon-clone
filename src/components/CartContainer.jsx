import './styles/cart.css';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CheckoutProductContainer from './CheckoutProductContainer.jsx';
import store from '../app-redux/store';
import { cartCheckout } from '../app-redux/actions';
import { Button, Dimmer, Header, Icon } from 'semantic-ui-react'
import { dataUpdate } from '../App.js';

export default function CartContainer() {

    const history = useHistory();

    const [storeState, setStoreState] = useState(store.getState());
    const [cartTotal, setCartTotal] = useState(0);
    const [checkedOut, setCheckedOut] = useState(false);

    useEffect(() => {
        let unsubscribe = store.subscribe(() => {
            setStoreState({ ...store.getState(), cartItems: store.getState().cartItems.sort((a, b) => a.id - b.id) });
        });

        return () => unsubscribe();

    }, []);

    const handleCartCheckout = () => {
        if (store.getState().cartItems.length > 0) {
            store.dispatch(cartCheckout());
            setCheckedOut(true);
            dataUpdate();
        }
    }

    return (
        <>
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

                <section className='checkout_section' style={{width: window.screen.width < 1180 && '100%', maxWidth: 900}}>
                    <p style={{fontSize: 16, marginTop: 15}}>
                        Subtotal ({storeState.cartItems.length} items):{' '}
                        <b>${Math.ceil(storeState.cartItems.length > 0 && storeState.cartItems.map(item => item.price * item.quantity).reduce((a, b) => a + b))}</b>
                    </p>

                    <Button fluid
                        style={{backgroundColor: '#f3c33fb7' }}
                        onClick={handleCartCheckout}
                    >
                        Proceed to checkout
                    </Button>
                    <br />
                </section>
            </section>

            <Dimmer active={checkedOut} onClickOutside={() => setCheckedOut(false)} page>
                <Header as='h2' icon inverted>
                    <Icon name='check' />
                        Order placed
                        {console.log(storeState, '\n', store.getState())}
                    <Header.Subheader>Items ordered successfully</Header.Subheader>
                </Header>
            </Dimmer>
        </>
    );
}