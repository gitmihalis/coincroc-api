import React, { Component } from 'react'
import axios from 'axios'
import CryptocurrencyItem from './CryptocurrencyItem'

// name / sym / 24hr chang. / 24hr vol. / market cap/ 

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
		axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=0')
			.then(res => {
				this.setState({ cryptocurrencies: res.data }, () => console.log(this.state))
      })
			.catch( err => console.error(err))
	}

	// getIndustries(cryptocurrencies){
	// 	axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=0')
	// 		.then(res -> {
	// 			this.setState({ crypto})
	// 		})
		// foreach set of coinmarketcap,
		//   hit the endpoint for multiple coin prices
		//   https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD,EUR
		//   	progressively place the results in the DOM 
	// }

	getInitialState(){

	}

	render(){

		const coinCount = this.state.cryptocurrencies.length
		const cryptocurrencyItems = this.state.cryptocurrencies.map( (cryptocurrency, i) => {
			return (
				<CryptocurrencyItem key={cryptocurrency.id} item={cryptocurrency}/>	
			)
		})

		return (
			<div>
			  <header>
					<h1>{coinCount} tradable cryptocurrencies</h1>
					<table>
					  <thead >
					  	<tr>
					    	<th>Coin</th>
					  		<th>Symbol</th>
					  		<th>Price(USD)<i></i></th>
					  		<th>24hr chang.</th>
					  		<th>24hr vol.</th>
					  		<th>Market cap</th>
					  		<th>Industry</th>
					  	</tr>
					  </thead>
					  <tbody>
	  					{cryptocurrencyItems}
					  </tbody>
					 </table>
				</header>
			</div>
		)

	}

}

export default Cryptocurrencies