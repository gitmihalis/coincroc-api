import React from 'react'
import { Link } from 'react-router-dom'
import './css/cryptocurrency-item.css'

/*
Table column titles in Cryptocurrencies are: 
name / sym / 24hr chang. / 24hr vol. / market cap/ 
*/
const round = (number, precision) => {
  const shift = function (number, precision, reverseShift) {
    if (reverseShift) {
      precision = -precision;
    }  
    let numArray = ("" + number).split("e");
    return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
  };
  return shift(Math.round(shift(number, precision, false)), precision, true);
}

const $round = (price) => {
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

const posNegStyle = (value) => {
	const number = Number(value.replace(/[^0-9.-]+/g,""));
	const style = {textAlign: 'right', display: 'block'}
	if (number === 0) style.color = 'inherit'
	if (number > 0) style.color = 'rgba(68, 189, 50,1.0)'
	if (number < 0) style.color = 'rgba(232, 65, 24,1.0)'
	return style
}

const CryptocurrencyRowItem = (props) => {
	const industries = []

	return (

		<Link to={`/cryptocurrencies/${props.cryptocurrency.id}`}>
			<div className="row cryptocurrency-item">	    
	      <div className="three columns currency-name">
	      	<span >{props.cryptocurrency.name}</span>
	      </div>
		    <div className="two columns currency-sybmbol" >
		    	<span>{props.cryptocurrency.symbol}</span>
		    </div>
	    	<div className="two columns price-usd">
	    		<span>{props.cryptocurrency['price_btc']}</span>
	    	</div>		    
	    	<div className="two columns percent-change" >
	    		<span style={posNegStyle(props.cryptocurrency['percent_change_24h'])}>
	    		{props.cryptocurrency['percent_change_24h'] + '%'}
	    		</span>
	    	</div>
	    	<div className="three columns">
	    		<div className="label-list">
	    		{props.cryptocurrency.industries}
	    		</div>
	    	</div>
	    </div>
	  </Link>
	)
}

export default CryptocurrencyRowItem



