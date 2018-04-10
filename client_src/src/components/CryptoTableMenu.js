import React from 'react'

const CryptoTableMenu = props => (
  
	<div className="row cryptocurrency-item">					    
    <div className="three columns currency-name">
      <button
      onClick={() => props.sortAlpha('name')}>
        Name
      </button>
    </div>
    <div className="two columns currency-sybmbol" >
      <button 
      onClick={() => props.sortAlpha('symbol')}>
        Symbol
      </button>
    </div>
  	<div className="two columns price-usd">
			<button 
      onClick={() => props.sortNumeric('price_usd')}>
				Price
			</button>
  	</div>		    
  	<div className="two columns percent-change" >
      <button
      onClick={() => props.sortNumeric('percent_change_24h')}>
        % Change
      </button>
  	</div>				 	
  	<div className="three columns">
      <button>
        Industry
      </button>
  	</div>
  </div>
)

export default CryptoTableMenu
