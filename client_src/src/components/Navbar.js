import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './css/navbar.css'

export default function Navbar (props) {

	// render(){
		return (
      <div className="nav-wrapper">
        <nav className='greedy' id="page-top">
          <h1>
          <img src="http://res.cloudinary.com/dattofkud/image/upload/v1524096719/cryptocat/cryptocroc/coincroc-brand.png" />
          </h1>
          <ul className='links'>
            <li><Link to="/">Cryptocurrencies</Link></li>
            <li><Link to="/industries">Industries</Link></li>
            <li><Link to="/industry-cryptocurrency">Pair Industries</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
          <button>MENU</button>
          <ul className='hidden-links hidden'></ul>
        </nav>
      </div>
		)
	// }

}




