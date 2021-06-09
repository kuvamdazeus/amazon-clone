import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import store from './app-redux/store.js';
import { updateState } from './app-redux/actions.js';
import DashboardContainer from './components/DashboardContainer.jsx';
import CartContainer from './components/CartContainer.jsx';
import Navbar from'./components/Navbar.jsx';
import './styles/App.css';
import axios from 'axios';
import jwt from 'jsonwebtoken';

function App() {

	useEffect(() => {
		if (localStorage.getItem('amzclone')) {
			axios.post(`${process.env.REACT_APP_BASE_URL}/auth`, { encrypted: localStorage.getItem('amzclone') })
			.then(res => {
				console.log(res);
				store.dispatch(updateState(res.data));
			});
		}

		window.addEventListener('beforeunload', async () => {
			let storeData = store.getState();
            let rawData = {
				cartItems: storeData.cartItems,
				orders: storeData.orders,
				email: storeData.currentUser.email,
			}
			let codedString = jwt.sign(rawData, process.env.REACT_APP_JWT_SECRET);

			await axios.post(`${process.env.REACT_APP_BASE_URL}/update-user`, { encrypted: codedString });
        });

	}, []);

	return (
		<Router>
			<Navbar />

			<Switch>
				<Route exact path='/' component={DashboardContainer} />
				<Route exact path='/cart' component={CartContainer} />
			</Switch>
		</Router>
  	);
}

export default App;
