import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { addToCart, setLaptop } from './Slicer';
import '../styles/proddesc.css';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';

interface Product {
  link: string;
  id: string;
  brand: string;
  name: string;
  item: string;
  price: number;
  oldprice: number;
  count: number;
  available: number;
  product_desc: string;
}

interface State {
  Ajio: {
    Laptop: Product | null;
    cart: Product[];
  };
}

const Laptopdesc: React.FC = () => {
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  const { Laptop, cart } = useSelector((state: State) => ({
    Laptop: state.Ajio.Laptop,
    cart: state.Ajio.cart
  }));
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product>(`http://localhost:3030/laptops/${id}`);
        dispatch(setLaptop(response.data));
      } catch (error) {
        console.error("Error fetching laptop:", error);
      }
    };
    fetchProduct();
  }, [id, dispatch]);

  useEffect(() => {
    if (Laptop) {
      const isInCart = cart.some(item => item.id === Laptop.id);
      setIsAddedToCart(isInCart);
    }
  }, [Laptop, cart]);

  const handleAddToCart = () => {
    if (Laptop) {
      dispatch(addToCart(Laptop));
      toast.success("Product added to cart");
      setIsAddedToCart(true);
    }
  };

  return (
    <div className='container'>
      <ToastContainer />
      {Laptop ? (
        <div className='main'>
          <div className='imagediv'>
            <img className='image' src={Laptop.link} alt='Selected Laptop' />
          </div>
          <div className='descp'>
            <h2>{Laptop.item}</h2>
            <h6>{Laptop.name}</h6>
            <h3>Description:</h3>
            <p>{Laptop.product_desc}</p>
            <h5>RS: {Laptop.price}</h5>
            {isAddedToCart ? (
              <Link to='/checkout'>
                <Button variant='contained'>Go to Cart</Button>
              </Link>
            ) : (
              <Button variant='outlined' onClick={handleAddToCart}>Add to cart</Button>
            )}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Laptopdesc;
