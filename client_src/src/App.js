import React from 'react';
import Main from './components/Main'
import Navbar from './components/Navbar'
import { Link } from 'react-router-dom'
import './App.css';


const App = () => (
  <div>
    <div className="off-canvas position-left" id="offCanvas" data-off-canvas>
      <ul className="menu vertical">
			      <li><Link to="/cryptocurrencies">Cryptocurrencies</Link></li>
			      <li><Link to="/industries">Industries</Link></li>
			      <li><Link to="/about">About</Link></li>
      </ul>
	  </div>
	  <div className="off-canvas-content" data-off-canvas-content>
	    <Navbar />
	    <Main />
	  </div>
  </div>
)

export default App;
