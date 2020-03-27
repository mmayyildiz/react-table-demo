import React from 'react';
import { shallow } from 'enzyme';
import Row from './Row';

describe('Row renders with props', function() {
  let mountedRow;

  const props = {
    ticker: 'testTicker',
    price: 3,
    assetClass: 'Credit'
  };

  it('renders without crashing', () => {
    shallow(<Row {...props} />);
  });

  beforeEach(() => {
    mountedRow = shallow(<Row {...props} />);
  });

  it('displays the row', () => {
    const creditDivs = mountedRow.find('.Credit');
    expect(creditDivs.length).toBe(1);
  });
});
