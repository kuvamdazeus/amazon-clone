import { useState, useEffect } from 'react';
import './styles/nav.css';
import navLogo from '../assets/nav_logo.png';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined';
import store from '../app-redux/store.js';
import { updateState } from '../app-redux/actions';
import { Dropdown, Icon } from 'semantic-ui-react'
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';

export default function Navbar() {

    const history = useHistory();

    const [cartTotal, setCartTotal] = useState(0);
    const [username, setUsername] = useState('');

    useEffect(() => {
        store.subscribe(() => {
            setCartTotal(store.getState().cartItems.length);
            setUsername(store.getState().currentUser.name);
        });

    }, []);

    const handleLogin = data => {
        // Send data to backend for authentication/creation of the user & get full data back
        let codedString = jwt.sign(data.profileObj, process.env.REACT_APP_JWT_SECRET);

        axios.post(`${process.env.REACT_APP_BASE_URL}/auth`, { encrypted: codedString })
        .then(res => {
            store.dispatch(updateState(res.data));
            
            let localData = jwt.sign({ email: res.data.email, name: res.data.name }, process.env.REACT_APP_JWT_SECRET);
            localStorage.setItem('amzclone', localData);
        });
    }

    return (
        <nav className='navbar'>
            <img className='nav_image' src={navLogo} alt='' onClick={() => history.push('/')} />
            
            <div className='nav_search_container'>
                <input className='nav_search' />

                <div className='icon_container'>
                    <Icon style={{marginTop: -7}} name='search' />
                </div>
            </div>

            {store.getState().currentUser?.name ? 
                <p className='nav_text'>Hello, {username.split(' ')[0]}</p>
                :
                <Dropdown 
                    text={`Hello, Sign In`}
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
            }

            

            <p className='nav_text' onClick={() => history.push('/orders')}><b>Orders</b></p>

            <div onClick={() => history.push('/cart')}>
                <ShoppingCartIcon style={{color: 'white', cursor: 'pointer', marginTop: -7}} />
                <span style={{color: '#f0a448'}}>{cartTotal}</span>
            </div>
        </nav>
    );
}