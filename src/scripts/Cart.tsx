import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import '../styles/Cart.css';
import Button from '@mui/material/Button';

const Cart: React.FC = () => {
  return (
    <div className='carts'>
      <div>
        <img
          className='tickS'
          src='https://th.bing.com/th?id=OIP.SC5uo87aRvsscHAbPCInMQHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&cb=13&dpr=1.3&pid=3.1&rm=2'
          alt='successfully placed'
        />
      </div>
      <h1>Your order is successfully placed</h1>
      <div>
        <Link to='/order'>
          <Button variant='contained'>Order history</Button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
