import React from 'react';
import Main from './components/Main'
import Navbar from './components/Navbar'
import Footer  from './components/Footer'
import './App.css';



const App = () => (
  <div>
		<Navbar />
	  <div className="mui-container">
	  	<Main />
	  </div>
	  <div className="mui-fluid-container">
		  <Footer />
		 </div>
	</div>
)

export default App;
