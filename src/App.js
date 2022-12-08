import logo from './logo.svg';
import './App.css';

import { Button,Navbar } from 'react-bootstrap';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import About from './pages/About';
import Product from './pages/Product';

function App() {
  return (
	<>
	<BrowserRouter>

	<Header/> 
	

	<Routes> 
        <Route path="/"  element={<Product/>} />
        <Route path="about" element={<About/>} />
      </Routes>
	  
	</BrowserRouter> 

	<Footer/>
	</>
  );
}

export default App;
