import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './css/cryptocurrencies.css'


export default class Cryptocurrency extends Component{
	constructor(props){
		super(props)
		this.state = {
			cryptocurrency: '',
			price: '',
			defaultImg: 'http://res.cloudinary.com/dattofkud/image/upload/v1523815071/cryptocat/deepsea-anglerfish.jpg'
		}
	}

	componentDidMount = () => {
		this.getCryptocurrency()
	}

	componentWillMount = () => {
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

	render = () => {
		const cryptocurrency = this.state.cryptocurrency ? this.state.cryptocurrency[0] : ''
		const image = cryptocurrency ? cryptocurrency.image : 'https://cryptocomapre.com' + this.state.defaultImg
		const industryList = 
			cryptocurrency.industries ?
			cryptocurrency.industries.map((industry) => {
				return (
					<li key={industry.id}>
						<Link to={`/industries/${industry.name}`}>
							<span className="label">{industry.name}</span>
						</Link>
					</li>
				) 
			}) :
			[]

		console.log('render() cryptocurrency state:', cryptocurrency)

		return(
			<div className="container cryptocurrency">
				<div className="row">   
			    <div className="columns six">
				    <div className="thumbnail">
				      <img src={`https://cryptocompare.com${image}`} alt={cryptocurrency.name}/>
			    	</div>
					</div>
					<div className="columns six">
				    <h1>{cryptocurrency.name}</h1>
				    <h4>{cryptocurrency.symbol}</h4>
    				<h6 className="left">Price: ${this.state.price.USD}</h6>
					</div>
				</div>
				<div className="row">
  				<ul className="industries menu horizontal">
  				{industryList}
					</ul>
				</div>
				<div className="row">
					<div className="description">
				  <p>{cryptocurrency.fullDesc}</p>
					</div>
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


