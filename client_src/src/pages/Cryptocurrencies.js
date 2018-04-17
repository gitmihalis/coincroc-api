import React, { Component } from 'react'
import axios from 'axios'
import CryptoTableMenu from '../components/CryptoTableMenu'
import CryptocurrencyRowItem from '../components/CryptocurrencyRowItem'
import './css/cryptocurrencies.css'

const SKIP_AMOUNT = 100

export default class Cryptocurrencies extends Component{

	constructor(props){
		super(props)
		this.state = {
			paginate: {
				start: 0,
				limit: 0
			},
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

	fetchCryptoData = () => {
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

	/*
	fetchtickerData - Appneds the industries from DS to the API data and sets the state
	with the merged data.  
	*/
	fetchTickerData = (industryElements, skip=0, limit=100) => { 
		console.log(`https://api.coinmarketcap.com/v1/ticker/?start=${skip}&limit=${limit}`)
		return axios.get(`https://api.coinmarketcap.com/v1/ticker/?start=${skip}&limit=${limit}`)
			.then(res => {
				const data = res.data

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

	handlePageNext = (e) => {
		console.log('handle next page')
		// which page are we on?
		const currentStart= this.state.paginate.start
		const industries = this.state.industries
		const newStart = currentStart + SKIP_AMOUNT
		this.fetchTickerData(industries, newStart)
		this.setState({
			paginate: {
				start: newStart
			}
		}, console.log(this.state))
	}
	handlePagePrev = (e) => {
		console.log('handle prev page')
		// which page are we on?
		const currentStart= this.state.paginate.start
		const industries = this.state.industries
		const newStart = (currentStart - SKIP_AMOUNT < 0) ? 0 : currentStart - SKIP_AMOUNT
		this.fetchTickerData(industries, newStart)
		this.setState({
			paginate: {
				start: newStart
			}
		}, console.log(this.state))
	}	





	render(){
		const cryptoTableData = this.state.cryptoTableData || []
		const rowItems = cryptoTableData.map((crypto) => {
			return (<CryptocurrencyRowItem 
							 data={crypto}
							 key={crypto.id} />)
		})

		return (
			<div>
				<h5>Showing {cryptoTableData.length} cryptocurrencies</h5>
				<div className="container u-full-width">		 
					<CryptoTableMenu sortNumeric={this.sortNumeric} sortAlpha={this.sortAlpha} />
					{rowItems ? rowItems : 'none'}
				</div>
				<hr />
				<div className='actions'>
					<button 
						className="button"
						onClick={this.handlePageNext}
					>Next
					</button>
					<button 
						className="button"
						onClick={this.handlePagePrev}
					>Prev
					</button>
					<button 
						className="button button-primary"
						onClick={() => { this.fetchTickerData(this.state.industries, 0, 0) } }
					>All
					</button>
				</div> 
			</div>
		)

	}

}
