import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './css/cryptocurrency.css'


export default class Cryptocurrency extends Component{
	constructor(props){
		super(props)
		this.state = {
			cryptocurrency: '',
			price: '',
			defaultImg: 'http://res.cloudinary.com/dattofkud/image/upload/v1523815071/cryptocat/deepsea-anglerfish.jpg'
		}
	}

	componentWillMount = () => {
		this.getCryptocurrency()
	}

	componentDidMount = () => {
		this.getTickerData('USD')
	}

	getCryptocurrency = () => {
		const symbol = this.props.match.params.symbol
		console.log(`getCryptocurrency ( ${symbol} )`)
		return axios.get(
			`http://localhost:3000/api/cryptocurrencies?filter[where][symbol]=${symbol}`
			)
		.then(res => {
			const data = res.data
			console.log(`crypto currency got res : ${JSON.stringify(res)}`)
			this.setState({ cryptocurrency: data})
    })
		.catch( err => console.error(err))
	}




	getTickerData = (fiatSym) => {
		const symbol = this.props.match.params.symbol
		return axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=${fiatSym}`)
		.then(res => {
			const data = res.data
			this.setState({ price: data }, () => console.log(this.state))
    })
		.catch( err => console.error(err))

	}
/*
	onDelete = () => {
		axios.delete(`http://localhost:3000/api/cryptocurrencies/${id}`)
		.then(res => this.props.history.push('/'))
		.catch(err => console.error(err))
	}
*/
	render = () => {
		const cryptocurrency = this.state.cryptocurrency ? this.state.cryptocurrency[0] : ''
		const image = cryptocurrency ? cryptocurrency.image : 'https://cryptocomapre.com' + this.state.defaultImg

		console.log('render() cryptocurrency state:', cryptocurrency)

		return(
			<div className="grid-container cryptocurrency">
				<div className="media-object">
				  <div className="media-object-section">
				    <div className="thumbnail">
				      <img src={`https://cryptocompare.com${image}`} 
			      	alt={cryptocurrency.name}/>
				    </div>
				  </div>
				  <div className="media-object-section">
				    <h4>{cryptocurrency.name} {cryptocurrency.symbol}</h4>
    				<p>Price: ${this.state.price.USD}</p>
				  </div>
				  <div className="media-object-section">
	  				<ul className="industries menu vertical">
						</ul>
					</div>
				</div>
				<div className="callout">
				  <p>
				  	{cryptocurrency.fullDesc}
				  </p>
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


