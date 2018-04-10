import React, { Component } from 'react'
import axios from 'axios'
import CryptoTableMenu from '../components/CryptoTableMenu'
import CryptocurrencyRowItem from '../components/CryptocurrencyRowItem'
import './css/cryptocurrencies.css'



export default class Cryptocurrencies extends Component{

	constructor(){
		super()
		this.state = {
			cryptoData: '',
			tickerData: '',
			cryptoTableData: '',
			industries: '',
			tableSortDirection: {
				'price_usd': '',
				'name': '',
				'symbol': '',
				'percent_change_24h': ''
			}
		}
	}

	componentWillMount = () => {
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
			data.forEach((crypto) => {
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
					}
					return crypto
				}) 
				this.setState({ 
					tickerData: data,
					cryptoTableData: mergedCryptos 
				}, () => { console.log('finished fetchTickerData()')})
      })
	}

	sortNumeric = (key) => {
		const tableSortDirection = this.state.tableSortDirection
		const cryptoTableData = this.state.cryptoTableData

		this.setState({
			cryptoTableData: cryptoTableData.sort((a, b) => {
				return tableSortDirection[key] === 'asc'
				? parseFloat(a[key]) - parseFloat(b[key])
				: parseFloat(b[key]) - parseFloat(a[key])
			}),
			tableSortDirection: {
				[key]: tableSortDirection[key] === 'asc'
				? 'desc'
				: 'asc'
			} 
		}) 
	}

	sortAlpha = (key) => {
		console.log('alphasort( ', key)
		const tableSortDirection = this.state.tableSortDirection
		const cryptoTableData = this.state.cryptoTableData
		this.setState({
			cryptoTableData: cryptoTableData.sort( (a, b) => {
			if (tableSortDirection[key] === 'asc') {
				return (a[key]).toUpperCase() < (b[key]).toUpperCase() ? 1 : -1
			} else {
				return (b[key]).toUpperCase() < (a[key]).toUpperCase() ? 1 : -1
			}
			}),
			tableSortDirection: {
				[key]: tableSortDirection[key] === 'asc'
				? 'desc'
				: 'asc'
			} 			
		})
	}	





	render(){
		const cryptoTableData = this.state.cryptoTableData || []
		const cryptoRowsItems = cryptoTableData.map((crypto, i) => {
			return (<CryptocurrencyRowItem 
							 data={crypto}
							 key={crypto.id} />)
		})

		return (
			<div>
				<h5>Showing {cryptoTableData.length} cryptocurrencies</h5>
				<div className="container u-full-width">		 
					<CryptoTableMenu sortNumeric={this.sortNumeric} sortAlpha={this.sortAlpha} />
					{cryptoRowsItems}
				</div>
			</div>
		)

	}

}
