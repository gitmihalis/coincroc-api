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
		.then( (res) => {
			return this.getManyApiData(res)
		})
		.then( _ => {
			return this.insertApiData() 
		})
		.catch(err => console.log(err))
	}

	getManyApiData(symbols){
		let data = {}
		let chunks = _array.chunk(symbols, 4)

		return new Promise((resolve, reject) => {

			chunks.forEach((chunk, index) => {

				chunk = chunk.join(',').toUpperCase()

				axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${chunk}&tsyms=USD`)
				.then(res => {
					data = _object.merge(res.data.DISPLAY, data)
					this.setState({apiData: data})

					if (index === chunks.length - 1) {
						console.log('finished getManyApiData with state = ', this.state)
						resolve()
					}
				})
				.catch(err => reject(err))
			})
		})
	}

	getCryptocurrencies(limit){ // limit 0 = all
		// TODO convert to CAD
		return axios.get('http://localhost:3000/api/cryptocurrencies?filter[limit]='+limit)
			.then(res => {
				this.setState({ cryptocurrencies: res.data })
				return res.data.map((sym) => sym.symbol)
      })
	}

	insertApiData(dataObject) {
		return console.log(dataObject)
		// BTC: {
		//   "FROMSYMBOL": "Ƀ",
		//   "TOSYMBOL": "$",
		//   "MARKET": "CryptoCompare Index",
		//   "PRICE": "$ 7,018.76",
		//   "LASTUPDATE": "Just now",
		//   "LASTVOLUME": "Ƀ 0.4853",
		//   "LASTVOLUMETO": "$ 3,383.47",
		//   "LASTTRADEID": "1523206723.5702",
		//   "VOLUMEDAY": "Ƀ 39,156.1",
		//   "VOLUMEDAYTO": "$ 276,565,110.8",
		//   "VOLUME24HOUR": "Ƀ 56,518.8",
		//   "VOLUME24HOURTO": "$ 398,479,732.8",
		//   "OPENDAY": "$ 6,917.20",
		//   "HIGHDAY": "$ 7,132.03",
		//   "LOWDAY": "$ 6,911.02",
		//   "OPEN24HOUR": "$ 7,060.01",
		//   "HIGH24HOUR": "$ 7,149.06",
		//   "LOW24HOUR": "$ 6,887.05",
		//   "LASTMARKET": "Kraken",
		//   "CHANGE24HOUR": "$ -41.25",
		//   "CHANGEPCT24HOUR": "-0.58",
		//   "CHANGEDAY": "$ 101.56",
		//   "CHANGEPCTDAY": "1.47",
		//   "SUPPLY": "Ƀ 16,965,512.0",
		//   "MKTCAP": "$ 119.08 B",
		//   "TOTALVOLUME24H": "Ƀ 312.09 K",
		//   "TOTALVOLUME24HTO": "$ 2,192.29 M"
		// }
	}


	render(){
		const apiData = this.state.apiData || {}
		const cryptocurrencies = this.state.cryptocurrencies.map((crypto, i) => {
			return <CryptocurrencyItem cryptocurrency={crypto} key={crypto.id} apiData={apiData[crypto.symbol]} />
		})


		

		return (
			<div>
				<h5>Showing {cryptocurrencies.length} cryptocurrencies</h5>
				<div className="container u-full-width">				
					{cryptocurrencies}
				</div>
			</div>
		)

	}

}

export default Cryptocurrencies