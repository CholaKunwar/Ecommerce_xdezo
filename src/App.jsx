import React from 'react';
import { ToastContainer } from 'react-toastify';
// import { Navbar } from './Components/Navbar';
import SearchBar from './Components/SearchBar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import About from './pages/About';
import Login from './pages/Login';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import PlaceOrder from './pages/PlaceOrder';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailure from './pages/PaymentFailure';
import { useUser } from '@clerk/clerk-react';
import Product from './pages/Product';
import { Analytics } from "@vercel/analytics/react"
import Order from './pages/Order';
import Order2 from './pages/Order2';

const App = () => {
  const { user } = useUser();
  return (
    <div className='bg-gray-50 min-h-screen'>
      {/* Include Vercel Analytics component */}
      <Analytics />
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />  
        <Route path='/order' element={<Order />} />
        <Route path='/order2' element={<Order2 />} />
        <Route path='/collection' element={<Collection />} />
        {user && <Route path='/cart' element={<Cart />} />}  
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product/>} />
          <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        {user && <Route path='place-order' element={<PlaceOrder />} />}
        <Route path='/paymentsuccess' element={<PaymentSuccess />} />
        <Route path='/paymentfailure' element={<PaymentFailure />} />
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
