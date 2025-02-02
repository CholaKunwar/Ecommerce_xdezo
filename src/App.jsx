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
import Product from './pages/product';
import PlaceOrder from './pages/PlaceOrder';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailure from './pages/PaymentFailure';
import { useUser } from '@clerk/clerk-react';

const App = () => {
  const { user } = useUser();
  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />       
        <Route path='/collection' element={<Collection />} />
        {user && <Route path='/cart' element={<Cart />} />}  
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product/>} />
          <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        {user && <Route path='place-order' element={<PlaceOrder />} />}
        {user && <Route path='/paymentsuccess' element={<PaymentSuccess />} />}
        {user && <Route path='/paymentfailure' element={<PaymentFailure />} />}
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
