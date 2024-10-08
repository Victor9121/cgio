import React, { useEffect, useCallback } from 'react';
import axios from 'axios';
import '../styles/Laptop.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './StoreComponent'; 
import { setLaptops, setid } from './Slicer';

interface Llaptop {
  id: number;
  brand: string;
  name: string;
  link: string;
  price: string;
  oldprice: string;
}
const Laptop: React.FC = () => {
  const dispatch = useDispatch();
  
  const { Laptops, searchTerm } = useSelector((state: RootState) => ({
    searchTerm: state.Ajio.searchTerm,
    Laptops: state.Ajio.Laptops
  }));

  const fetchLaptops = useCallback(async () => {
    try {
      const response = await axios.get<Llaptop[]>('http://localhost:3030/laptops');
      dispatch(setLaptops(response.data));
    } catch (error) {
      console.error("Error fetching laptops:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchLaptops();
  }, [fetchLaptops]);

  // Filter laptops based on search term
  const filteredLaptops = Laptops.filter(laptop =>
    laptop.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='container'>
      <ul className='mainbord'>
        {filteredLaptops.map((item) => (
          <li key={item.id}>
            <div className='bord'>
              <Link to={`/laptopdesc/${item.id}`} onClick={() => dispatch(setid(item.id))}>
                <div>
                  <img className='Pphot' src={item.link} alt='laptop' />
                </div>
                <div className='dett'>
                  <h4>{item.brand}</h4>
                  <h5 style={{ color: "green" }}>
                    RS:{item.price} &nbsp;&nbsp;<s>{item.oldprice}</s>
                  </h5>
                </div>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Laptop;
