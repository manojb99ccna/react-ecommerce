import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import NotFound from './pages/NotFound';
import Login from './pages/User/Login'; 
import Dashboard from './pages/User/Dashboard';
import Signup from './pages/User/Signup';
import Order from './pages/User/Order';
import OrderDetails from './pages/User/OrderDetails';

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

		<Route path="login" element={<Login/>} /> 
		<Route path="/checkout/login" element={<Login/>} /> 
		 
		<Route path="signup" element={<Signup/>} />
		<Route path="/checkout/signup" element={<Signup/>} /> 
		 
		<Route path="password" element={<Login/>} /> 
		<Route path="dashboard" element={<Dashboard/>} /> 
		<Route path="order" element={<Order/>} /> 
		<Route path="order/:id" element={<OrderDetails />} />	
		
		

		<Route path="*" element={<NotFound />} />

      </Routes> 
	 <Footer/>

	</BrowserRouter> 
	</>
  );
}

export default App;
