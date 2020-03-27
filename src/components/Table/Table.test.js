import React from 'react';
import { shallow } from 'enzyme';
import Table from './Table';

describe('Table test', () => {
  describe('Table renders without props', function() {
    it('renders without crashing', () => {
      let mountedTable = shallow(<Table />);
      const center = mountedTable.find('.notFound');
      expect(center.text()).toEqual('Data not found');
    });
  });

  describe('Table renders with props', function() {
    let mountedTable;
    let mockCallBack;
    const props = {
      data: [
        { ticker: 'test ticker', price: 3, assetClass: 'test asset class' }
      ]
    };

    it('renders without crashing', () => {
      shallow(<Table {...props} sortBy={mockCallBack} />);
    });

    beforeEach(() => {
      mockCallBack = jest.fn();
      mountedTable = shallow(<Table {...props} sortBy={mockCallBack} />);
    });

    it('calls a function when ticker header is clicked', () => {
      mountedTable.find('#ticker').simulate('click');
      expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    it('calls a function when price header is clicked', () => {
      mountedTable.find('#price').simulate('click');
      expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    it('calls a function when asset class header is clicked', () => {
      mountedTable.find('#asset').simulate('click');
      expect(mockCallBack.mock.calls.length).toEqual(1);
    });
  });
});
