import React, { Component } from 'react'
import axios from 'axios'
import CryptocurrencyItem from './CryptocurrencyItem'
import './cryptocurrencies.css'

class Cryptocurrencies extends Component{

	constructor(){
		super()
		this.state = {
			cryptocurrencies: [],
			tickerData: [],
		}

	}

	componentWillMount(){
		this.getCryptocurrencies(100)
	}

	getCryptocurrencies(limit){
		// TODO convert to CAD
		axios.get('http://localhost:3000/api/cryptocurrencies?filter[limit]='+limit)
			.then(res => {
				this.setState({ cryptocurrencies: res.data }, () => console.log(this.state))
      })
			.catch( err => console.error(err))
	}


	getTickerData(limit){
		// TODO convert to CAD
		axios.get('https://api.coinmarketcap.com/v1/ticker/?limit='+limit )
			.then(res => {
				this.setState({ tickerData: res.data }, () => console.log(this.state))
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
			<div className="row align-center">

				<div className="card">
					<div>
					<h5>Showing {coinCount} cryptocurrencies</h5>
					</div>
					<div className="card-section">
						<ul>
		  			{cryptocurrencyItems}
		  			</ul>
		  		</div>
				</div>
				
			</div>
		)

	}

}

export default Cryptocurrencies