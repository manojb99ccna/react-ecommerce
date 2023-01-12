import logo from './logo.svg';
import './App.css';

import { Button,Navbar } from 'react-bootstrap';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import About from './pages/About';
import Product from './pages/Product';
import Contact from './pages/Contact';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';

function App() {
  return (
	<>
	<BrowserRouter>

	<Header/> 
	<Routes> 
		<Route path="/"  element={<Home/>} />
		<Route path="product"  element={<Product/>} />
        <Route path="about" element={<About/>} />
		<Route path="contact" element={<Contact/>} />
		<Route path="product/:slug" element={<ProductDetails />} />	
		<Route path="cart" element={<Cart/>} />
		<Route path="checkout" element={<Checkout/>} />
		<Route path="wishlist" element={<Wishlist/>} />
      </Routes> 
	 <Footer/>

	</BrowserRouter> 
	</>
  );
}

export default App;
