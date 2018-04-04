import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Cryptocurrencies from './Cryptocurrencies'

const Main = () => (
	<Switch>
		<Route exact path="/" component={Cryptocurrencies}/>
	</Switch>
)

export default Main