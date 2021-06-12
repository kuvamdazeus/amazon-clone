import './styles/product.css';
import StarIcon from '@material-ui/icons/Star';
import { useEffect, useState } from 'react';
import store from '../app-redux/store.js';
import { addToCart } from '../app-redux/actions.js';

export default function ProductContainer({ product }) {

    const [stars, setStars] = useState([]);

    useEffect(() => {
        const productStars = [];
        for (let i = 0; i < Math.ceil(Math.random() * 5); i++) {
            productStars.push(i);
        }

        setStars(productStars);

    }, []);

    const addProductToCart = () => {
        store.dispatch(addToCart(product));
    }

    return (
        <div className='product'>
            <center>
                <img className='product_image' src={product.image} alt='' />
            </center>

            <p className='product_title'>
                {product.title.split(' ').slice(0, 10).join(' ')}{product.title.split(' ').length > 7 && '...'}
            </p>

            <div style={{display: 'flex', alignItems: 'center', marginTop: -10}}>
                {stars.map((_, index) => <StarIcon style={{color: 'gold'}} key={index} />)}
            </div>

            <p className='product_description'>
                {product.description.split(' ').slice(0, 10).join(' ') + '...'}
            </p>

            <p className='product_price'>
                <b>{'$' + product.price}</b>
            </p>

            <center><button onClick={addProductToCart} className='product_button'>Add to cart</button></center>
        </div>
    );
}