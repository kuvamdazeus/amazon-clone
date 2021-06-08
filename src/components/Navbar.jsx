import { useState, useEffect } from 'react';
import './styles/nav.css';
import navLogo from '../assets/nav_logo.png';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined';
import store from '../app-redux/store.js';
import { updateState } from '../app-redux/actions';
import { Dropdown } from 'semantic-ui-react'
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import jwt from 'jsonwebtoken';

export default function Navbar() {

    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        store.subscribe(() => {
            setCartTotal(store.getState().cartItems.length);
            console.log(store.getState());
        });

    }, []);

    const handleLogin = data => {
        // Send data to backend for authentication/creation of the user & get full data back
        let codedString = jwt.sign(data.profileObj, process.env.REACT_APP_JWT_SECRET);

        axios.post(`${process.env.REACT_APP_BASE_URL}/auth`, { encrypted: codedString })
        .then(res => {
            store.dispatch(updateState(res.data));
            
            let localData = jwt.sign({ email: res.data.email }, process.env.REACT_APP_JWT_SECRET);
            localStorage.setItem('amzclone', localData);
        });
    }

    return (
        <nav className='navbar'>
            <img className='nav_image' src={navLogo} alt='' />
            <input className='nav_search' placeholder='Search' />

            <Dropdown 
                text={`Hello, ${store.getState().currentUser?.name || 'Sign In'}`}
                style={{marginTop: -10}}
            >
                <Dropdown.Menu>
                    <Dropdown.Item>
                        <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            buttonText='Sign in with Google'
                            onSuccess={handleLogin}
                            onFailure={console.log}
                            cookiePolicy={'single_host_origin'}
                        />
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            

            <p className='nav_text'><b>Orders</b></p>

            <div>
                <ShoppingCartIcon style={{color: 'white', cursor: 'pointer', marginTop: -7}} />
                <span style={{color: '#f0a448'}}>{cartTotal}</span>
            </div>
        </nav>
    );
}