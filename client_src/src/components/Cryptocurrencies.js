import React, { Component } from 'react'
import axios from 'axios'
import CryptocurrencyItem from './CryptocurrencyItem'
import './cryptocurrencies.css'

class Cryptocurrencies extends Component{

	constructor(){
		super()
		this.state = {
			cryptocurrencies: [],
		}

	}

	componentWillMount(){
		this.getCryptocurrencies()
	}

	getCryptocurrencies(){
		// TODO convert to CAD
		axios.get('http://localhost:3000/api/cryptocurrencies')
			.then(res => {
				this.setState({ cryptocurrencies: res.data }, () => console.log(this.state))
      })
			.catch( err => console.error(err))
	}

	getCryptoStats(){
		// TODO convert to CAD
		axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=0')
			.then(res => {
				this.setState({ cryptocurrencies: res.data }, () => console.log(this.state))
      })
			.catch( err => console.error(err))
	}

	render(){

		const coinCount = this.state.cryptocurrencies.length
		const cryptocurrencyItems = this.state.cryptocurrencies.map( (cryptocurrency, i) => {
			return (
				<CryptocurrencyItem key={cryptocurrency.id} item={cryptocurrency}/>	
			)
		})

		return (
			<div className="card">
				<div className="card-section">
					<ul>
	  			{cryptocurrencyItems}
	  			</ul>
	  		</div>
			</div>
		)

	}

}

export default Cryptocurrencies