import './styles/product.css';
import { Button, Icon } from 'semantic-ui-react';
import store from '../app-redux/store';
import { alterCart, removeFromCart } from '../app-redux/actions';

export default function CheckoutProductContainer({ product, cartTotal, setCartTotal }) {

    const handleRemoveOne = () => {
        if (product.quantity > 1)
            store.dispatch(alterCart({ ...product, quantity: product.quantity - 1 }));
    }

    const handleAddOne = () => {
        store.dispatch(alterCart({ ...product, quantity: product.quantity + 1 }));
    }

    const checkoutControlWideStyles = {
        flex: 0.3,
        minWidth: 220
    }

    const productDetailsWideStyles = {
        flex: 0.7,
        display: 'flex', 
        alignItems: 'center', 
        paddingRight: 10, 
        minWidth: 210
    }

    const checkoutControlSmallStyles = {

    }

    const productDetailsSmallStyles = {

    }

    return (
        <section className='cart_product'>
            {window.screen.width < 650 ? 
                <center>
                    <img className='cart_product_image' src={product.image} alt='' />

                    <div style={window.screen.width > 650 ? productDetailsWideStyles : productDetailsSmallStyles}>
                        <div>
                            <p className='cart_product_title'>{product.title}</p>
                            <p className='cart_product_description'>{product.description}</p>
                            <p className='cart_product_price'><b>${product.price}</b></p>
                        </div>
                    </div><br />

                    <div style={window.screen.width > 650 ? checkoutControlWideStyles : checkoutControlSmallStyles}>
                        <center>
                            <Button fluid style={{ backgroundColor: '#f3963f', marginBottom: 5 }}>
                                Buy Now
                            </Button>

                            <Button fluid
                                style={{ backgroundColor: '#f3b43f' }}
                                onClick={() => store.dispatch(removeFromCart(product))}
                            >
                                Remove Item
                            </Button>
                        </center>
                    </div>
                </center>
            :
                <>
                    <img className='cart_product_image' src={product.image} alt='' />

                    <div style={window.screen.width > 650 ? productDetailsWideStyles : productDetailsSmallStyles}>
                        <div>
                            <p className='cart_product_title'>{product.title}</p>
                            <p className='cart_product_description'>{product.description}</p>
                            <h4 style={{marginTop: 0}}>${product.price}</h4>
                        </div>
                    </div><br />

                    <div style={window.screen.width > 650 ? checkoutControlWideStyles : checkoutControlSmallStyles}>
                        <center>
                            <Button fluid style={{ backgroundColor: '#f3963f', marginBottom: 5 }}>
                                Buy Now
                            </Button>

                            <Button fluid
                                style={{ backgroundColor: '#f3b43f', marginBottom: 5 }}
                                onClick={() => store.dispatch(removeFromCart(product))}
                            >
                                Remove Item
                            </Button>

                            <Icon onClick={handleRemoveOne} name='minus' style={{color: 'gray', cursor: 'pointer'}} />
                            {product.quantity}
                            <Icon onClick={handleAddOne} name='add' style={{color: 'gray', cursor: 'pointer'}} />
                        </center>
                    </div>
                </>
            }
        </section>
    );
}