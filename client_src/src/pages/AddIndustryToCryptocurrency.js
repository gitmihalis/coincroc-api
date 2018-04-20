import React, { Component } from 'react'
import axios from 'axios'
import Select from 'react-select'
import cookie from 'react-cookies' // address this !NEXT
import 'react-select/dist/react-select.css'
import ErrorsList from '../components/ErrorsList'



class AddIndustryToCryptocurrency extends Component{

	constructor(props) {
		super(props)
		this.state = {
			cryptoOptions: '',
			industryOptions: '',
			selectedCrypto: '',
			selectedIndustry: '',
			accessToken: '',
			errors: ''
		}
	}

	componentWillMount(){
		const accessToken = cookie.load('access_token')
		this.loadCryptocurrencyOptions()
		this.loadIndustryOptions()
		this.setState({accessToken})
	}

	loadIndustryOptions(){
		axios.get('http://localhost:3000/api/industries?filter[where][depth]=1')
		.then(response => {
			// include depth for embedding on crytocurrency
			return response.data.map((industry, i) => {
				return industry
			})
    })
    .then(options => {
    	this.setState({ industryOptions: options })
    })
    .then(_=> console.log(JSON.stringify(this.state)))
    .catch(err => console.log(err))
	}

	loadCryptocurrencyOptions(){
		axios.get('http://localhost:3000/api/cryptocurrencies')
		.then(response => {
			return response.data.map((crypto, i) => {
				return crypto
			})
    })
    .then(options => {
    	this.setState({ cryptoOptions: options })
    })
    .then(_=> console.log(JSON.stringify(this.state)))
    .catch(err => console.log(err))
	}

	onSelectionChangeCrypto(selectedValue){
		this.setState({
			selectedCrypto: selectedValue
		}, () => {
				console.log('you selected', selectedValue)
		})
	}

	onSelectionChangeIndustry(selectedValue){
		this.setState({
			selectedIndustry: selectedValue
		}, () => {
				console.log('you selected', selectedValue)
		})
	}

	onPair(){
		const { selectedIndustry, selectedCrypto } = this.state
		const existingIndustries = selectedCrypto.industries || []

		const newIndustry = {
			id: selectedIndustry.id,
			depth: selectedIndustry.depth,
			name: selectedIndustry.name
		}

		const patchData = {
			industries: [...existingIndustries, newIndustry]
		}

		console.log('patched Data: ', patchData)
		axios.request({
			url: 'http://localhost:3000/api/cryptocurrencies/'+selectedCrypto.id,
			method: 'patch',
			data: patchData,
			headers: {Authorization: this.state.accessToken}
		})
		.then(res => {
			this.props.history.push('/')
		})
		.catch(err => {
			const response = err.response
			this.setState({errors: response}, () => {
				console.log(this.state.errors)
			})
		})
	}	

	onUnpair(){
		const { selectedIndustry, selectedCrypto } = this.state
		const existingIndustries = selectedCrypto.industries || []
		console.log(`onUnpair, existingIndustries inital value: ${existingIndustries}`)
		for( let i = 0; i < existingIndustries.length; i++) {
			if (existingIndustries[i].id === selectedIndustry.id) {
				console.log('matched ', existingIndustries[i])
				existingIndustries.splice(i, 1)
			}
		}
		const patchData = {
			industries: existingIndustries
		}
		console.log(`onUnpair, existingIndustries post value: ${existingIndustries}`)
		axios.request({
			url: 'http://localhost:3000/api/cryptocurrencies/'+selectedCrypto.id,
			method: 'patch',
			data: patchData
		})
		.then(res => {
			this.props.history.push('/')
		})
		.catch(err => console.error(err))
	}	


	render(){
		const cryptoOptions = this.state.cryptoOptions || []
		const industryOptions = this.state.industryOptions || []

		return(
		<div className="grid-container">

			<div className="grid-padding-x grid-padding-y grid-x">
				<div id="select-cryptocurrency" className="medium-6 cell">
					<label>Crypto:
						<Select
							value={this.state.selectedCrypto}
							onChange={this.onSelectionChangeCrypto.bind(this)} 
							name="cryptoOption"
							options={cryptoOptions}
							labelKey="name"
							valueKey="id"
						/>
					</label>
				</div>

				<div id="select-industry" className="medium-6 cell">
					<label>Industry:
						<Select
							name="industryOption"
							value={this.state.selectedIndustry}
							onChange={this.onSelectionChangeIndustry.bind(this)}
							options={industryOptions}
							labelKey="name"
							valueKey="id"
						/>
					</label>
				</div>
			</div>

			<div className="mui-row">
				
				<div className="button-group">
					<button onClick={this.onUnpair.bind(this)} className="mui-btn alrt mui-col-xs-6">Unpair</button>
					<button onClick={this.onPair.bind(this)} className="mui-btn mui-col-xs-6">Pair</button>
				</div>
				<ErrorsList errors={this.state.errors}/>
			</div>
			
		</div>
		)
	}
}


export default AddIndustryToCryptocurrency