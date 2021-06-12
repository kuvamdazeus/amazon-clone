import { useEffect, useState } from 'react';
import store from '../app-redux/store';
import { cancelOrder } from '../app-redux/actions';
import { dataUpdate } from '../App';
import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import './styles/orders.css';

function Order({ orderItem }) {
    return (
        <section
            style={{
                margin: 15, display: 'flex', alignItems: 'center', 
                marginBottom: 20, justifyContent: 'space-between',
                flexWrap: 'wrap'
            }}
        >
            <div style={{display: 'flex', alignItems: 'center'}}>
                <img 
                    src={orderItem.image} alt='' 
                    style={{
                        objectFit: 'contain',
                        height: 50,
                        width: 50,
                        marginRight: 10
                    }}
                />

                <div>
                    <h4>{orderItem.title} - ${orderItem.price}</h4>
                    <p style={{color: 'grey', marginTop: -15, fontSize: 12 }}>
                        {new Date(orderItem.orderedAt).toString().split(' ').slice(0, 5).join(' ')}
                    </p>
                </div>
            </div>

            <Button 
                style={{ maxWidth: 100, backgroundColor: '#f3c33fb7' }}
                onClick={() => store.dispatch(cancelOrder(orderItem))}
            >
                Cancel
            </Button>
        </section>
    );
}

export default function Orders() {

    const history = useHistory();

    let orderedItems = [];
    store.getState().orders.forEach(order => {
        order.items.forEach(item => {
            orderedItems.push({ ...item, orderedAt: order.time });
        });
    });
    const [orders, setOrders] = useState(orderedItems);

    useEffect(() => {
        let allItems = [];

        let unsubscribe = store.subscribe(() => {
            console.log(store.getState());
            store.getState().orders.forEach(order => {
                order.items.forEach(item => {
                    allItems.push({ ...item, orderedAt: order.time });
                });
            });

            console.log(allItems);
            setOrders(allItems);
        });

        return () => unsubscribe();

    }, [orders]);

    return (
        <section className='cart'>
            <section className='cart_container'>
                <h2 style={{ marginTop: 10 }}>Your Orders</h2>
                <hr className='cart_divider' /><br />

                {orders.length > 0 ? orders.map((item, index) => <Order orderItem={item} key={index} />):

                    <center>
                        <h3 style={{color: 'grey',marginTop: -10, marginBottom: 10}}>You haven't ordered anything yet !</h3>
                    </center>

                }

                <hr className='cart_divider' /><br />

                <Button 
                    style={{backgroundColor: '#f3c33fb7'}}
                    onClick={() => {history.push('/');dataUpdate()}}
                >
                    Continue Shopping
                </Button>
            </section>
        </section>
    );
}