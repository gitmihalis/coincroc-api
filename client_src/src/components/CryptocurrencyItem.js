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

	const item = props.item
		// TODO convert to CAD
	let 
	priceUSD = item['price_usd'] ? '$'+ $round(item['price_usd']) : '?',
	percentChange24HR = item['percent_change_24h'] ? item['percent_change_24h'] : '?',
	industries = ''

	if (item.industries) {
		industries = 	item.industries.map((industry, i) => {
			return industry.name
		})
	}


	return (
      <li>

      	<div className="grid-container">
				  <div className="grid-x grid-margin-x">
				    <div className="cell small-3">
				    	<div>
				    		<Link to={`/cryptocurrencies/${item.id}`}>{item.name}</Link>
	    		      <div>{item.symbol}</div>
				    	</div>
				    </div>
				    <div className="cell small-3">
				    	<div>{percentChange24HR + '%'}</div>
				    </div>
				    <div className="cell small-3">
				    	<div>{priceUSD}</div>
				    </div>				    
				    <div className="cell small-3">
				    	<div className="text-right">{industries ? industries : 'unknown'}</div>
				    </div>
				  </div>
				</div>
      </li>
	)
}

export default CryptocurrencyItem