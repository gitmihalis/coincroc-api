import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Cryptocurrencies from '../pages/Cryptocurrencies'
import Cryptocurrency from '../pages/Cryptocurrency'
import AddIndustryToCryptocurrency from '../pages/AddIndustryToCryptocurrency'
import Industries from '../pages/Industries'
import About from '../pages/About'

const Main = () => (
	<Switch>
		<Route exact path="/" component={Cryptocurrencies}/>
		<Route exact path="/about" component={About}/>
		<Route exact path="/industries" component={Industries}/>
		<Route exact path="/cryptocurrencies/:symbol" component={Cryptocurrency}/>
		<Route exact path="/industry-cryptocurrency" component={AddIndustryToCryptocurrency}/>
	</Switch>
)

export default Main