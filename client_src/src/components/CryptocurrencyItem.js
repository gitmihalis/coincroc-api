import React from 'react'
import { Link } from 'react-router-dom'

const CryptocurrencyItem = (props) => {
	return (
      <li className="collection-item">
        <Link to={`/cryptocurrencies/${props.item.id}`}> {props.item.name} </Link>
      </li>
	)
}

export default CryptocurrencyItem