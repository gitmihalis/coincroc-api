import React from 'react'
import { Link } from 'react-router-dom'
import './cryptocurrency-item.css'

/*
Table column titles in Cryptocurrencies are: 
name / sym / 24hr chang. / 24hr vol. / market cap/ 
*/
const CryptocurrencyItem = (props) => {

	function round(number, precision) {
	  const shift = function (number, precision, reverseShift) {
	    if (reverseShift) {
	      precision = -precision;
	    }  
	    let numArray = ("" + number).split("e");
	    return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
	  };
	  return shift(Math.round(shift(number, precision, false)), precision, true);
	}

	function $round(price){
		if (!price && typeof Number(price) !== 'number') throw new Error('no price given')
		if (price > Math.pow(10, 9))
			return round(price / Math.pow(10, 9), 0) + 'B'
		if (price > Math.pow(10, 6))
			return round(price / Math.pow(10, 6), 0) + 'M'
		if (price > Math.pow(10, 3))
			return round(price / Math.pow(10, 3), 0) + 'K'
		if (price < 0.001)
			return round(price, 5)

		return round(price, 2)
	}

	const cryptocurrency = props.cryptocurrency
		// TODO convert to CAD
	let 
	priceUSD = cryptocurrency['price_usd'] ? '$'+ $round(cryptocurrency['price_usd']) : '?',
	percentChange24HR = cryptocurrency['percent_change_24h'] ? cryptocurrency['percent_change_24h'] : '?',
	industries = ''

	if (cryptocurrency.industries) {
		industries = 	cryptocurrency.industries.map((industry, i) => {
			return <span className="label" key={industry.id}>{industry.name}</span>
		})
	}


	return (

		<Link to={`/cryptocurrencies/${cryptocurrency.id}`}>
		<div className="row cryptocurrency-item">
	    
	      <div className="three columns">
	      	<span className="currency-name">{cryptocurrency.name}</span>
	      </div>

		    <div className="two columns">
		    	<span className="currency-sybmbol">{cryptocurrency.symbol.toUpperCase()}</span>
		    </div>

	    	<div className="two columns">
	    		<span className="percent-change">{percentChange24HR + '%'}</span>
	    	</div>
	    	
	    	<div className="two columns ">
	    	<span className="price-usd">{priceUSD}</span>
	    	</div>
	    	
	    	<div className="three columns">
	    		<div className="label-list">{industries ? industries : 'unknown'}</div>
	    	</div>
	    </div>
	  </Link>
	)
}

export default CryptocurrencyItem