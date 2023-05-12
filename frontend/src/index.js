import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import NavBar from './components/Navbar';
import AddTask from './components/AddTask';
import Home from './components/Home';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import About from './components/About';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        
        <Route path='/add/' element={<AddTask />} />

        <Route path='/about/' element={<About />} />

        

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

