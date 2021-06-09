import { useEffect, useState } from 'react';
import image1 from '../assets/carousel_image1.jpg';
import image2 from '../assets/carousel_image2.jpg';
import image3 from '../assets/carousel_image3.jpg';
import image4 from '../assets/carousel_image4.jpg';
import './styles/dashboard.css';
import ProductContainer from './ProductContainer.jsx';
import Carousel from 'react-material-ui-carousel';
import axios from 'axios';
import jwt from 'jsonwebtoken';

export default function DashboardContainer() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let res = await axios.get(`${process.env.REACT_APP_BASE_URL}/get-products`);
            
            let decodedData = jwt.verify(res.data, process.env.REACT_APP_JWT_SECRET)
            setProducts(decodedData.products);
        }

        fetchData();

    }, []);

    return (
        <>
            <Carousel indicators={false} animation='slide'>
                <div>
                    <img src={image1} style={{objectFit: 'contain', width: '100%'}} alt='' />
                </div>

                <div>
                    <img src={image2} style={{objectFit: 'contain', width: '100%'}} alt='' />
                </div>

                <div>
                    <img src={image3} style={{objectFit: 'contain', width: '100%'}} alt='' />
                </div>

                <div>
                    <img src={image4} style={{objectFit: 'contain', width: '100%'}} alt='' />
                </div>

            </Carousel>
            {window.screen.width > 600 && <div className='effect_container' />}

            <br /><br />
            <section
                className="dashboard_container"
                style={{
                    marginTop: window.screen.width > 600 ? '-22vh' : 0,
                    position: window.screen.width > 600 && 'absolute',
                    zIndex: window.screen.width > 600 && 3,
                }}
            >

                {products.map((product, index) => <ProductContainer product={product} key={index} />)}
            
            </section>
        </>
    );
}