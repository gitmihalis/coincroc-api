import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Cryptocurrencies from './Cryptocurrencies'
import EditCryptocurrency from './EditCryptocurrency'

const Main = () => (
	<Switch>
		<Route exact path="/" component={Cryptocurrencies}/>
		<Route exact path="/cryptocurrencies/edit/:id" component={EditCryptocurrency}/>

		{/*<Route exact path="/cryptocurrencies/:id" component={Cryptocurrency}/>*/}
	</Switch>
)

export default Main