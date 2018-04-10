import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './css/cryptocurrency.css'


class Cryptocurrency extends Component{
	constructor(props){
		super(props)
		this.state = {
			cryptocurrency: '',
			price: '',
		}
	}

	componentWillMount = () => {
		console.log('Cryptocurrency mounted')
		this.getCryptocurrency()
		.then(_ => {
			this.getTickerData('USD')
		})
	}

	getCryptocurrency(){
		const symbol = this.props.match.params.symbol

		return axios.get(
			`http://localhost:3000/api/cryptocurrencies?filter[where][name]=${symbol}`
			)
		.then(res => {
			const data = res.data
			this.setState({ cryptocurrency: data })
    })
		.catch( err => console.error(err))
	}




	getTickerData(fiatSym){
		const symbol = this.props.match.params.symbol
		return axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=${fiatSym}`)
		.then(res => {
			this.setState({ price: res.data }, () => console.log(this.state))
    })
		.catch( err => console.error(err))

	}

	onDelete(){
		let id = this.state.cryptocurrency.id
		console.log('delete ' + id)
		// axios.delete(`http://localhost:3000/api/cryptocurrencies/${id}`)
		// .then(res => this.props.history.push('/'))
		// .catch(err => console.error(err))
	}

	render(){
		const cryptocurrency = this.state.cryptocurrency
		let industries
		if (cryptocurrency.industries) {
			industries = cryptocurrency.industries.map((industry, i) => {
				return <li key={industry.id}><span className="label">{industry.name}</span></li>
			})		
		}


		return(
			<div className="grid-container">
				<div className="media-object">

				  <div className="media-object-section">
				    <div className="thumbnail">
				      <img src= "http://via.placeholder.com/150x150" alt="placeholder"/>
				    </div>
				  </div>
				  <div className="media-object-section">
				    <h4>{cryptocurrency.name} {cryptocurrency.symbol}</h4>
    				<p>Price: ${this.state.price.USD}</p>
				  </div>

				  <div className="media-object-section">
	  				<ul className="industries menu vertical">
						{industries}
						</ul>
					</div>
				</div>

				<div className="callout">
				  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer iaculis elit eu pulvinar mattis. Sed efficitur nulla id tempus volutpat. Nam blandit, eros sed interdum placerat, felis dui tempor nibh, nec ornare leo tortor vel quam. Nunc ut metus eu ante iaculis lacinia sit amet feugiat justo. Morbi consectetur bibendum lorem. Mauris ac varius lorem. Sed et arcu lacinia nisl molestie efficitur. </p>
				</div>

				<div className="expanded button-group">
				  <Link className="button"
				  	to="/">Back
				  </Link>				
				</div>		


			</div>

		)
	}
}

export default Cryptocurrency

