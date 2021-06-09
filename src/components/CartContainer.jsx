import './styles/cart.css';
import CheckoutProductContainer from './CheckoutProductContainer.jsx';
import store from '../app-redux/store';

export default function CartContainer() {
    return (
        <section className='cart'>
            <section className='cart_container'>
                <h2>Shopping Cart</h2>
                <hr className='cart_divider' /><br />
                
                {store.getState().cartItems.map(cartItem => <CheckoutProductContainer product={cartItem} />)}
            </section>
        </section>
    );
}