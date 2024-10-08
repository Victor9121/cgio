import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { addToCart, setProduct } from './Slicer';
import '../styles/proddesc.css';
import { ToastContainer, toast } from 'react-toastify';
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
    product: Product | null;
    cart: Product[];
  };
}

const Proddesc: React.FC = () => {
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { product, cart } = useSelector((state: State) => ({
    product: state.Ajio.product,
    cart: state.Ajio.cart
  }));
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product>(`http://localhost:3030/products/${id}`);
        dispatch(setProduct(response.data));
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id, dispatch]);

  useEffect(() => {
    if (product) {
      const existsInCart = cart.some(item => item.id === product.id);
      setIsAddedToCart(existsInCart);
    }
  }, [product, cart]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      setIsAddedToCart(true);
      toast.success('Product added to cart!');
    }
  };

  return (
    <div className='container'>
      <ToastContainer />
      {product ? (
        <div className='main'>
          <div className='imagediv'>
            <img className='image' src={product.link} alt='Selected product' />
          </div>
          <div className='descp'>
            <h2>{product.item}</h2>
            <h5>{product.name}</h5>
            <h3>Description:</h3>
            <p>{product.product_desc}</p>
            <h5>Rupees: {product.price}</h5>
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

export default Proddesc;
