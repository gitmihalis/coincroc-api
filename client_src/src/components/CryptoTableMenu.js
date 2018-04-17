import React from 'react'

const CryptoTableMenu = props => (
  
	<div className="row table-menu">					    
    <div className="three columns currency-name">
      <button className="button"
      onClick={() => props.sortAlpha('name')}>
        Name
      </button>
    </div>
    <div className="two columns currency-sybmbol" >
      <button className="button" 
      onClick={() => props.sortAlpha('symbol')}>
        Symbol
      </button>
    </div>
  	<div className="two columns price-usd">
			<button className="button" 
      onClick={() => props.sortNumeric('price_usd')}>
				Price
			</button>
  	</div>		    
  	<div className="two columns percent-change" >
      <button className="button"
      onClick={() => props.sortNumeric('percent_change_24h')}>
        % Change
      </button>
  	</div>				 	
  	<div className="three columns">
      <p>
      </p>
  	</div>
  </div>
)

export default CryptoTableMenu
