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

		return '$' + round(price, 4)
	}

	const item = props.item
		// TODO convert to CAD
	let marketCapUSD = item['market_cap_usd'] ? $round(item['market_cap_usd'], 'm') : '?'
	let volume24hrs = item['24h_volume_usd']

	return (
      <tr>
      	<td><Link to={`/cryptocurrencies/${item.id}`}>{item.name}</Link></td>
      	<td>{item.symbol}</td>
      	<td>{'$' + round(item['price_usd'], 4)}</td>
      	<td>{item.percent_change_24h + '%'}</td>
      	<td>{$round(volume24hrs)}</td>
      	<td>{marketCapUSD}</td>
      	<td>{`Category`}</td>
      </tr>
	)
}

export default CryptocurrencyItem