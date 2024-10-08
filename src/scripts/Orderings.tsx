import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { deleteToken } from './Slicer';
import '../styles/order.css';
import Button from '@mui/material/Button';

interface orders{
  name: string;
  price: string;
  brand: string;
}

interface OrderHistory {
  username: string;
  date: string;
  carts: orders[];
}

interface State {
  Ajio: {
    orders: orders[];
    username: string;
  };
}

function Order() {
  const dispatch = useDispatch();
  const [history, setHistory] = useState<OrderHistory[]>([]);
  const { orders, username } = useSelector((state: State) => ({
    orders: state.Ajio.orders,
    username: state.Ajio.username,
  }));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get<OrderHistory[]>('http://localhost:3030/OrderHistory');
        setHistory(response.data);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };
    
    fetchOrders();
  }, []);

  const filteredHistories = history.filter(item => item.username === username);

  return (
    <div className='orders'>
      <h1>Welcome, {username}</h1>
      
      <div className='ordersdisplay'>
        <img src='https://th.bing.com/th/id/OIP.uE5p825YGMHsKJyGckHSgwHaHa?w=181&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' alt='orders' />
        <h4>Your Current Order History</h4>
      </div>
      <ol>
        {orders.length > 0 ? (
          orders.map((item, index) => (
            <li key={index}>
              <div className='neworder'>
                <div><p><b>Item name:</b> {item.name}</p></div>
                <div><p><b>Price:</b> {item.price}</p></div>
                <div><p><b>Brand:</b> {item.brand}</p></div>
              </div>
              <hr />
            </li>
          ))
        ) : (
          <p>No orders available.</p>
        )}
      </ol>
      <div>
        <div className='ordersdisplay'>
          <img src='https://th.bing.com/th/id/OIP.e_R5mUGzHAqoQSa93VhIfAHaHN?w=173&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' alt='order history' />
          <h4>Your Total Order History Till Now</h4>
        </div>       
        <ol>
          {filteredHistories.length > 0 ? (
            filteredHistories.map((entry, index) => (
              <div key={index}>
                {entry.carts.length > 0 ? (
                  entry.carts.map((item, cartIndex) => (
                    <li key={cartIndex}>
                      <div className='oldorder'>
                        <div><p><b>Item:</b> {item.brand}</p></div>
                        <div><p><b>Price:</b> {item.price}</p></div>                     
                        <div><p><b>Date&Time:</b> {new Date(entry.date).toLocaleString()}</p></div>
                      </div>
                      <hr/>
                    </li>
                  ))
                ) : (
                  <p>No carts available.</p>
                )}
              </div>
            ))
          ) : (
            <p>No history available for {username}.</p>
          )}
        </ol>
      </div>
      <div className='nav'>
        <div className='thanks'>
          <img src='https://img.icons8.com/?size=48&id=utfNVOTLYip9&format=png' alt='thanks'/>
          <h4>Thanks for shopping with us!</h4>
        </div>
        <div className='last'>
          <Link to='/items'>
            <Button variant='contained'>Continue Shopping</Button>
          </Link>
          <Link to='/login'>
            <img 
              src='https://img.icons8.com/?size=48&id=wPhfVWUu3RLr&format=gif' 
              alt='logout' 
              title='Logout' 
              onClick={() => dispatch(deleteToken())} 
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Order;
