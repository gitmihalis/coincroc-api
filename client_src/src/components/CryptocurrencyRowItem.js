import React from 'react'
import { Link } from 'react-router-dom'
import './css/cryptocurrency.css'

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
		return round(price, 3)

	return round(price, 2)
}

const posNegStyle = (value) => {
	if (!value) return {}
	const number = Number(value.replace(/[^0-9.-]+/g,""));
	const style = {textAlign: 'right', display: 'block'}
	if (number === 0) style.color = 'inherit'
	if (number > 0) style.color = 'rgba(68, 189, 50,1.0)'
	if (number < 0) style.color = 'rgba(232, 65, 24,1.0)'
	return style
}

const CryptocurrencyRowItem = (props) => {
	const industries = 
	props.data.industries ?
		props.data.industries.map((industry, i) => {
			return <span key={industry.id} className='label'>{industry.name}</span>
		}) :
		<span>unknown</span>

	return (

		<Link to={`/cryptocurrencies/${props.data.symbol}`}>
			<div className="row cryptocurrency-item">	    
	      <div className="three columns currency-name">
	      	<span >{props.data.name}</span>
	      </div>
		    <div className="two columns currency-sybmbol" >
		    	<span>{props.data.symbol}</span>
		    </div>
	    	<div className="two columns price-usd">
	    		<span>${$round(props.data['price_usd'])}</span>
	    	</div>		    
	    	<div className="two columns percent-change" >
	    		<span style={posNegStyle(props.data['percent_change_24h'])}>
	    		{props.data['percent_change_24h'] + '%'}
	    		</span>
	    	</div>
	    	<div className="three columns">
	    		<div className="label-list">
	    		{industries}
	    		</div>
	    	</div>
	    </div>
	  </Link>
	)
}

export default CryptocurrencyRowItem



