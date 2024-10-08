import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import '../styles/check.css';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip } from '@mui/material';
import TextField from '@mui/material/TextField';
import { RootState, AppDispatch } from './StoreComponent';
import { placeorder, removeFromCart, addItem, removingitem } from './Slicer';


const Checkout: React.FC = () => {
  const [val, setVal] = useState<boolean>(false);
  const [empty, setEmpty] = useState<boolean>(false);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const { count, cart, ids, totalamount, username } = useSelector((state: RootState) => ({
    count: state.Ajio.count,
    cart: state.Ajio.cart,
    totalamount: state.Ajio.totalamount,
    username: state.Ajio.username,
    ids: state.Ajio.ids
  }));

  useEffect(() => {
    if (count === 0) {
      setEmpty(true);
    }
  }, [count]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300); 
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const addingitem = (id: string) => {
    dispatch(addItem(id));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart({ id }));
    toast.success("Item removed");
  };

  const deletingitem = (id: string) => {
    dispatch(removingitem(id));
  };

  const handleClick = async () => {
    if (count === 0) {
      alert('Cart is empty');
    } else {
      setVal(true);
      dispatch(placeorder());

      const now = new Date();

      try {
        await axios.post('http://localhost:3030/OrderHistory', {
          carts: cart,
          username: username,
          date: now.toISOString()
        });
      } catch (error) {
        console.error('Error updating order history:', error);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (val) {
    return <Navigate to='/cart' />;
  }

  return (
    <div className='container'>
      <ToastContainer />
      {empty ? (
        <div>
          <img className='empty' src='v5ff6iea.png' alt='empty cart' />
        </div>
      ) : (
        <div>
          <div className='totaldisplay'>
            <div className='cart-items'>
              <h1>Shopping Cart</h1>
              <h5>{count}&nbsp;<b>Items</b></h5>
              <hr />
              <ul>
                {cart.map((item) => {
                  const idInfo = ids.find(idItem => idItem.id === item.id);

                  return (
                    <li key={item.id}>
                      <div className='wholeitem'>
                        <div>
                          <img className='imgs' src={item.link || 'default-image-url.png'} alt='product' />
                        </div>
                        <div className='itemdesc'>
                          <h2>{item.name}</h2>
                          <p>{item.brand}</p>
                        </div>
                        <div className='buttons'>
                          <Button size='small' variant='text' onClick={() => addingitem(item.id)} className='place'>+</Button>
                          <p>{idInfo?.count}</p>
                          <Button size='small' variant='text' className='place' onClick={() => deletingitem(item.id)}>-</Button>
                          <Tooltip title='remove item' placement="right-start">
                            <IconButton aria-label="delete" onClick={() => handleRemoveItem(item.id)} >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </div>
                        <div className='price'>
                          <img src='https://img.icons8.com/?size=50&id=23658&format=png' alt='rupee'/>
                          <p>{item.price}</p>  
                          <img src='https://img.icons8.com/?size=50&id=23661&format=png' alt='rupee'/>                     
                          <h4>{idInfo?.count * item.price}</h4>
                        </div>
                      </div>
                      <hr />
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className='navbar'>
              <h2>Summary</h2>
              <p><b>No. of items:</b>{count}</p>
              <hr />
              <TextField  
                label="Enter Your Address"
                style={{backgroundColor:"white"}}
                multiline
                rows={4}
                variant="filled" 
              />
              <hr />
              <p><b>Total amount is:</b>{totalamount}</p>
              <Button 
                type="button" 
                variant='contained' 
                onClick={handleClick}
              >
                Place Order
              </Button>
            </div>
          </div> 
        </div>       
      )}
      {count > 3 && showBackToTop && (
        <img src='backtotop.jpeg' alt='backtotop' className='backtotop' onClick={scrollToTop} />
      )}
    </div>
  );
};

export default Checkout;
