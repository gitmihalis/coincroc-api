import React, { Component } from 'react'
import axios from 'axios'
import CryptocurrencyItem from './CryptocurrencyItem'
import './cryptocurrencies.css'
const _array = require('lodash/array');
const _object = require('lodash/fp/object');

class Cryptocurrencies extends Component{

	constructor(){
		super()
		this.state = {
			cryptocurrencies: [],
			apiData: '',
		}
	}

	componentWillMount(){
		this.getCryptocurrencies(50)
		.then(res=> this.recursiveGetData(res))
		.catch(err => console.log(err))
	}

	recursiveGetData(symbols){
		let data = {}
		let chunks = _array.chunk(symbols, 4)

		chunks.forEach((chunk) => {
			chunk = chunk.join(',').toUpperCase()
			console.log(chunk)

			axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${chunk}&tsyms=USD`)
			.then(res => {
				data = _object.merge(res.data.DISPLAY, data)
				this.setState({apiData: data})
			})
			.catch(err => console.error(err))
		})
			// slice the symbols out, make sure they are uppercase and join them with commas
	}

	getCryptocurrencies(limit){ // limit 0 = all
		// TODO convert to CAD
		return axios.get('http://localhost:3000/api/cryptocurrencies?filter[limit]='+limit)
			.then(res => {
				this.setState({ cryptocurrencies: res.data })
				return res.data.map((sym) => sym.symbol)
      })
	}


	render(){
		const cryptocurrencies = this.state.cryptocurrencies.map((crypto, i) => {
			return <CryptocurrencyItem cryptocurrency={crypto} key={crypto.id} />
		})
		console.log('state.data is: ', this.state.apiData)

		return (
			<div>
				<h5>Showing {cryptocurrencies.length} cryptocurrencies</h5>
				<div className="container">
					{cryptocurrencies}
				</div>
			</div>
		)

	}

}

export default Cryptocurrencies