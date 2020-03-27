import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Row({ ticker, price, assetClass, style }) {
  const rowStyleClass = `row ${assetClass}`;
  const priceStyleClass = price < 0 ? 'negativePrice' : 'positivePrice';

  return (
    <div className={rowStyleClass} style={style}>
      <div>{ticker}</div>
      <div className={priceStyleClass}>{price}</div>
      <div>{assetClass}</div>
    </div>
  );
}

Row.propTypes = {
  ticker: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  assetClass: PropTypes.string.isRequired,
  style: PropTypes.object
};

export default Row;
