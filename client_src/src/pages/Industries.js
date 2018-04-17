import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './css/industries.css'


class Industries extends Component{

	constructor(){
		super()
		this.state = {
			industries: [],
		}
	}

	componentWillMount(){
		this.getIndustries()
	}

	getIndustries(limit){
		// TODO convert to CAD
		axios.get('http://localhost:3000/api/industries?filter[where][depth]=1')
			.then(res => {
				this.setState({ industries: res.data }, () => console.log(this.state))
      })
			.catch( err => console.error(err))
	}

	render(){

		const coinCount = this.state.industries.length
		const industryItems = this.state.industries.map( (industry, i) => {
			return (
      <li>
				  <div className="grid-x grid-margin-x">
				    <div className="cell">
				    	<Link to={`/industries/${industry.name}`}>
				    		{industry.name}
				    	</Link>
				    </div>	    
				  </div>
      </li>
			)
		})

		return (
			<div className="grid-container">

				<div className="card">
					<div className="card-divider">
					<h5>Showing {coinCount} industries</h5>
					</div>
					<div className="card-section">
						<ul>
		  			{industryItems}
		  			</ul>
		  		</div>
				</div>
				
			</div>
		)

	}

}

export default Industries