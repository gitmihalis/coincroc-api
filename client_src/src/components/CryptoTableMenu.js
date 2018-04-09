import React from 'react'

const CryptoTableMenu = props => (
	<div className="row cryptocurrency-item">					    
    <div className="three columns currency-name">
      <button
      onClick={() => props.sortBy('PRICE')}>
        Name
      </button>
    </div>
    <div className="two columns currency-sybmbol" >
      <button 
      onClick={() => props.sortBy('PRICE')}>
        Symbol
      </button>
    </div>
  	<div className="two columns price-usd">
			<button 
      onClick={() => props.sortBy('PRICE')}>
				Price
			</button>
  	</div>		    
  	<div className="two columns percent-change" >
      <button
      onClick={() => props.sortBy('PRICE')}>
        % Change
      </button>
  	</div>				 	
  	<div className="three columns">
      <button
      onClick={() => props.sortBy('PRICE')}>
        Industry
      </button>
  	</div>
  </div>
)

export default CryptoTableMenu
