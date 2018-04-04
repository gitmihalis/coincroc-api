import React, { Component } from 'react'
import axios from 'axios'
import CryptocurrencyItem from './CryptocurrencyItem'
class Cryptocurrencies extends Component{

	constructor(){
		super()
		this.state = {
			cryptocurrencies: [],
		}

	}

	componentWillMount(){
		this.getInitialState()
	}

	getInitialState(){

		axios.get('http://localhost:3000/api/cryptocurrencies')
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
			<div>
			  <header>
					<h1>{coinCount} tradable cryptocurrencies</h1>
					<table>
					  <thead>
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