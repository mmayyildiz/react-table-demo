import React, { PureComponent } from 'react';
import { FixedSizeList as List } from 'react-window';
import PropTypes from 'prop-types';
import './style.css';
import Row from '../Row/Row.js';

class Table extends PureComponent {
  render() {
    const height = 0.8 * window.innerHeight;

    const hasData = Array.isArray(this.props.data) && this.props.data.length;
    const hasSortBy = !!this.props.sortBy;

    const rowRenderer = ({ index, style }) => {
      const rowData = this.props.data[index];

      return <Row {...rowData} style={style} />;
    };

    return (
      <div className="table">
        <div className="header">
          <div
            id="ticker"
            onClick={() => hasSortBy && this.props.sortBy('ticker')}
          >
            Ticker
          </div>
          <div
            id="price"
            onClick={() => hasSortBy && this.props.sortBy('price')}
          >
            Price
          </div>
          <div
            id="asset"
            onClick={() => hasSortBy && this.props.sortBy('assetClass')}
          >
            Asset Class
          </div>
        </div>
        <div className="body">
          {hasData ? (
            <List
              height={height}
              itemSize={30}
              itemCount={this.props.data.length}
            >
              {rowRenderer}
            </List>
          ) : (
            <center className="notFound">Data not found</center>
          )}
        </div>
      </div>
    );
  }
}

Table.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      ticker: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      assetClass: PropTypes.string.isRequired
    })
  ),
  sortBy: PropTypes.func
};

export default Table;
