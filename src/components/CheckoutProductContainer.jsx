import './styles/product.css';
import { Button } from 'semantic-ui-react';

export default function CheckoutProductContainer({ product }) {

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
                        </div>
                    </div><br />

                    <div style={window.screen.width > 650 ? checkoutControlWideStyles : checkoutControlSmallStyles}>
                        <center>
                            <Button fluid style={{ backgroundColor: '#f3963f', marginBottom: 5 }}>
                                Buy Now
                            </Button>

                            <Button fluid style={{ backgroundColor: '#f3b43f' }}>
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
                        </div>
                    </div>

                    <div style={window.screen.width > 650 ? checkoutControlWideStyles : checkoutControlSmallStyles}>
                        <center>
                            <Button fluid style={{ backgroundColor: '#f3963f', marginBottom: 5 }}>
                                Buy Now
                            </Button>

                            <Button fluid style={{ backgroundColor: '#f3b43f' }}>
                                Remove Item
                            </Button>
                        </center>
                    </div>
                </>
            }
            <br /><br />
        </section>
    );
}