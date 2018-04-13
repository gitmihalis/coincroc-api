import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './css/navbar.css'

class Navbar extends Component{
	componentWillMount(){

	}
	render(){
		return (
      <nav className='greedy'>
        <h1>CryptoCat</h1>
        <ul className='links'>
          <li><Link to="/">Cryptocurrencies</Link></li>
          <li><Link to="/industries">Industries</Link></li>
          <li><Link to="/industry-cryptocurrency">Pair Industries</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
        <button>MENU</button>
        <ul className='hidden-links hidden'></ul>
      </nav>
		)
	}

}

export default Navbar



