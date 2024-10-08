import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Items from './Items';
import Proddesc from './Proddesc';
import Checkout from './Checkout';
import Cart from './Cart';
import Laptop from './Laptop';
import Laptopdesc from './Laptopdesc';
import Login from './Login';
import Signup from './Signup';
import Order from './Orderings';
import Protected from './Protected';
import Layout from './Layout';
import Nopage from './Nopage';
import Profile from './Profile';
import Navbar from '../sharedcomponents/Navbar';
import Footer from '../sharedcomponents/Footer';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={
          <>
            <Navbar />
            <Signup />
            <Footer />
          </>
        } />
        <Route path="/login" element={
          <>
            <Navbar />
            <Login />
            <Footer />
          </>
        } />

        <Route path="/" element={<Protected />}>
          <Route element={<Layout />}>
            <Route path="/items" element={<Items />} />
            <Route path="/order" element={<Order />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/proddesc/:id" element={<Proddesc />} />
            <Route path="/laptopdesc/:id" element={<Laptopdesc />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/laptop" element={<Laptop />} />
          </Route>
        </Route>

        <Route path="*" element={<Nopage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
