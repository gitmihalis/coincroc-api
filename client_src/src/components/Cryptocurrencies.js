import React, { Component } from 'react'

class Cryptocurrencies extends Component{
	constructor(){
		super()
		this.state = {
			cryptos: [],
		}
	}

	render(){
		return (
			<div>
			  <header>
					<h1>Cryptocurrencies</h1>
				</header>
			</div>
		)
	}
}

export default Cryptocurrencies