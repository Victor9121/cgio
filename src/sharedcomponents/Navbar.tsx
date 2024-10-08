import React, { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { deleteToken, setSearchTerm } from '../scripts/Slicer';
import '../styles/App.css';

interface RootState {
  Ajio: {
    count: number;
    searchTerm: string;
  };
}

const Navbar: React.FC = () => {
  const dispatch = useDispatch(); 
  const { count, searchTerm } = useSelector((state: RootState) => ({
    count: state.Ajio.count,
    searchTerm: state.Ajio.searchTerm,
  }));

  const token = sessionStorage.getItem('token');
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  return (
    <nav className='naving'>
      <span>
        <h1 className='bolder'>Mentra</h1>
        <h1 className='normal'>Fashion&Laptops</h1>
      </span>
      <div>
        <Link to='/items'><h5>CLOTHING</h5></Link>
      </div>
      <div className='nav-item'>
        <Link to='/laptop'><h5>LAPTOPs</h5></Link>
      </div>
      <span>
        <Formik
          initialValues={{ search: searchTerm }}
          onSubmit={(values) => { /* Handle submit logic */ }}
        >
          {({ values, handleChange }) => (
            <Form>
              <div className={token ? 'display' : 'hidden'}>
                <Field
                  className='searchbar'
                  name='search'
                  placeholder='Enter keyword for search'
                  value={values.search}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                    dispatch(setSearchTerm(e.target.value));
                  }}
                />
              </div>
            </Form>
          )}
        </Formik>
      </span>
      <span>
        <Link to='/checkout' className={token ? 'display' : 'hidden'}>
          <img
            src='https://dapper-pastelito-04ff24.netlify.app/static/media/outline-shopping-bag.4f0d175650e8195eb42924280be3b2f9.svg'
            alt='Cart items'
          />
          <sub><h6>{count}</h6></sub>
        </Link>
      </span>
      <span>
        <div
          className='nav-item'
          onMouseEnter={() => setDropdownVisible(true)}
          onMouseLeave={() => setDropdownVisible(false)}
        >
          <Link to='/profile' className={token ? 'displayimg' : 'hidden'}>
            <img
              src='https://cdn-icons-png.flaticon.com/128/1077/1077114.png'
              style={{ height: '20px', width: '20px' }}
              alt='profile'
            />
          </Link>
          {dropdownVisible && (
            <div className='dropdown-menu'>
              <Link to='/order'>Order History</Link>
              <Link to='/login' onClick={() => dispatch(deleteToken())}>Logout</Link>
              <Link to='/profile'>Feedback</Link>
            </div>
          )}
        </div>
      </span>
    </nav>
  );
}

export default Navbar;
