import React from 'react'
import { Link } from 'react-router-dom'

const CryptocurrencyItem = (props) => {
	const item = props.item
	return (
      <tr>
      	<td><Link to={`/cryptocurrencies/${item.id}`}>{item.name}</Link></td>
      	<td>{item.symbol}</td>
      </tr>
	)
}

export default CryptocurrencyItem