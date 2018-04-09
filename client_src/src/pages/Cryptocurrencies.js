import React, { Component } from 'react'
import axios from 'axios'
import CryptoTableMenu from '../components/CryptoTableMenu'
import CryptocurrencyRowItem from '../components/CryptocurrencyRowItem'
import './css/cryptocurrencies.css'
import _array from 'lodash/array'
import _object from 'lodash/object'



export default class Cryptocurrencies extends Component{

	constructor(){
		super()
		this.state = {
			cryptoData: '',
			tickerData: '',
			cryptoTableData: '',
			industries: ''
		}
	}

	componentDidMount = () => {
		this.fetchCryptoData()
		.then((industryElements) => {
			this.fetchTickerData(industryElements)
		})	
		.catch(err => {
			throw err
		})	
	}

	fetchCryptoData = async () => {
		return axios.get('http://localhost:3000/api/cryptocurrencies')
		.then( (res) => {
			const industryElements = {}
			const data = res.data
			// stip the industries from the crptocurrencies
			data.map((crypto, i) => {
				if (crypto.industries) industryElements[crypto.symbol] = crypto.industries
			})			 
			this.setState({
				industries: industryElements,
				cryptoData: data
			})
			return industryElements
		})
	}

	fetchTickerData = async (industryElements) => { 
		return axios.get('https://api.coinmarketcap.com/v1/ticker/')
			.then(res => {
				const data = res.data
				console.log( 'from inside fetchTickerData:: ', industryElements )

				let mergedCryptos = data.map((crypto, i) => {
					if (industryElements[crypto.symbol]) {
						crypto['industries'] = industryElements[crypto.symbol]
						return crypto
					} else {
						return crypto
					}

				}) 
				this.setState({ 
					tickerData: data,
					cryptoTableData: mergedCryptos 
				}, () => { console.log('finished fetchTickerData()')})
      })
	}





	mergeDataSets = () => {
		const industries = this.state.industries
		const tickerData = this.state.tickerData

		let mergedCrypto = tickerData.map((crypto, i) => {
			if (industries[crypto.symbol]) {
				crypto.industries = industries[crypto.symbol]
				return crypto
			}
		})

		console.log(mergedCrypto)
	} 

	sortBy = (key) => {
	}


	render(){
		// const cryptoRowsItems = this.state.cryptocurrencies.map((crypto, i) => {
		// 	return <CryptocurrencyRowItem cryptocurrency={crypto} key={crypto.id} />
		// })

		return (
			<div>
				<h5>Showing {} cryptocurrencies</h5>
				<div className="container u-full-width">		 
					<CryptoTableMenu sortBy={this.sortBy} />
				</div>
			</div>
		)

	}

}
