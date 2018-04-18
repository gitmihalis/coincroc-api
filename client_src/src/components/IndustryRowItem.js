import React from 'react'
import { Link } from 'react-router-dom'
import { $round, round, posNegStyle } from '../utils'
import './css/cryptocurrency.css'

/*
Table column titles in Cryptocurrencies are: 
name / sym / 24hr chang. / 24hr vol. / market cap/ 
*/

const IndustryRowItem = (props) => {
  const industries = 
  props.data.industries ?
    props.data.industries.map((industry, i) => {
      return <span key={industry.id} className='label'>{industry.name}</span>
    }) :
    <span></span>

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

export default IndustryRowItem



