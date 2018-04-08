import React from 'react'
import { Link } from 'react-router-dom'

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
			return industry.name
		})
	}


	return (
		<Link to={`/cryptocurrencies/${cryptocurrency.id}`}><div className="row">
	    
	      <div className="three columns">{cryptocurrency.name}
	      </div>

		    <div className="two columns">{cryptocurrency.symbol}
		    </div>

	    	<div className="two columns">{percentChange24HR + '%'}
	    	</div>
	    	
	    	<div className="two columns">{priceUSD}
	    	</div>
	    	
	    	<div className="three columns">{industries ? industries : 'unknown'}
	    	</div>

	  </div></Link>
	)
}

export default CryptocurrencyItem