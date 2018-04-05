import React from 'react';
import Main from './components/Main'
import Navbar from './components/Navbar'
import OffCanvasMenu from './components/OffCanvasMenu'
import './App.css';


const App = () => (
  <div>
  	<OffCanvasMenu />
	  <div className="off-canvas-content" data-off-canvas-content>
	    <Navbar />
	    <Main />
	  </div>
  </div>
)

export default App;
