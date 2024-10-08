import React, { useEffect, useCallback } from 'react';
import axios from 'axios';
import '../styles/items.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './StoreComponent'; 
import { setproducts, setid } from './Slicer';

interface Product {
  id: string;
  brand: string;
  name: string;
  link: string;
  price: number; 
  oldprice: number; 
  item: string; 
  count?: number;
  available?: number; 
  product_desc?: string; 
}
const Items: React.FC = () => {
  const dispatch = useDispatch();
 
  const { products, searchTerm } = useSelector((state: RootState) => ({
    products: state.Ajio.products,
    searchTerm: state.Ajio.searchTerm
  }));


  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get<Product[]>('http://localhost:3030/products');
      dispatch(setproducts(response.data));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);


  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='container'>
      <ul className='mainbord'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => {
            if (!item || !item.id || !item.link || !item.brand || item.price === undefined) {
              return null; 
            }

            return (
              <li key={item.id}>
                <div className='bord'>
                  <Link to={`/proddesc/${item.id}`} onClick={() => dispatch(setid(item.id))}>
                    <div>
                      <img className='phot' src={item.link} alt='product'/>
                    </div>
                    <div className='dett'>
                      <h4>{item.brand}</h4>
                      <h5>
                        RS: {item.price} &nbsp;&nbsp;<s>{item.oldprice}</s>
                      </h5>
                    </div>
                  </Link>
                </div>
              </li>
            );
          })
        ) : (
          <li>No products found</li>
        )}
      </ul>
    </div>
  );
};

export default Items;
