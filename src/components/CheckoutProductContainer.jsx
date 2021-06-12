import './styles/product.css';
import { Button, Icon } from 'semantic-ui-react';
import store from '../app-redux/store';
import { updateState } from '../app-redux/actionTypes.js';
import { alterCart, removeFromCart } from '../app-redux/actions';
import { dataUpdate } from '../App';

export default function CheckoutProductContainer({ product }) {
    const handleRemoveOne = () => {
        if (product.quantity > 1)
            store.dispatch(alterCart({ ...product, quantity: product.quantity - 1 }));
    }

    const handleAddOne = () => {
        store.dispatch(alterCart({ ...product, quantity: product.quantity + 1 }));
    }

    const handleBuyNow = () => {
        if (store.getState().currentUser?.name) {
            store.dispatch({
                type: updateState,
                update: {
                    ...store.getState(),
                    cartItems: store.getState().cartItems.filter(item => item.id !== product.id),
                    orders: [...store.getState().orders, { items: [product], time: Date.now() }]
                }
            });

            store.dispatch(removeFromCart(product));
            dataUpdate();
        }
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
        <>
            <section className='cart_product'>
                {window.screen.width < 650 ? 
                    <center>
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
                                <Button fluid 
                                    style={{ backgroundColor: '#f3c33fb7', marginBottom: 5 }}
                                    onClick={handleBuyNow}
                                >
                                    Buy Now
                                </Button>

                                <Button fluid
                                    style={{ backgroundColor: '#f3c33fb7', marginBottom: 5 }}
                                    onClick={() => store.dispatch(removeFromCart(product))}
                                >
                                    Remove Item
                                </Button>

                                <Icon onClick={handleRemoveOne} name='minus' style={{color: 'gray', cursor: 'pointer'}} />
                                    {product.quantity}
                                <Icon onClick={handleAddOne} name='add' style={{color: 'gray', cursor: 'pointer'}} />
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
                                <Button fluid 
                                    style={{ backgroundColor: '#f3c33fb7', marginBottom: 5 }}
                                    onClick={handleBuyNow}
                                >
                                    Buy Now
                                </Button>

                                <Button fluid
                                    style={{ backgroundColor: '#f3c33fb7', marginBottom: 5 }}
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
        </>
    );
}