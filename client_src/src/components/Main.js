import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Cryptocurrencies from './Cryptocurrencies'
import Cryptocurrency from './Cryptocurrency'
import AddIndustryToCryptocurrency from './AddIndustryToCryptocurrency'
import About from './About'

const Main = () => (
	<Switch>
		<Route exact path="/" component={Cryptocurrencies}/>
		<Route exact path="/about" component={About}/>
		<Route exact path="/cryptocurrencies/:id" component={Cryptocurrency}/>
		<Route exact path="/industry-cryptocurrency" component={AddIndustryToCryptocurrency}/>
	</Switch>
)

export default Main