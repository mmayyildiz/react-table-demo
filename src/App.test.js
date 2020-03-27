import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

jest.mock('axios', () => {
  let mockData = {
    data: {
      financialInstruments: [
        {
          ticker: 'test ticker',
          price: 3,
          assetClass: 'test asset class'
        }
      ]
    }
  };

  return {
    get: jest.fn(() => Promise.resolve(mockData))
  };
});

const axios = require('axios');

describe('App Test', function() {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  let mountedApp;

  beforeEach(() => {
    mountedApp = shallow(<App />);
  });

  it('calls axios.get in #componentDidMount', () => {
    return mountedApp
      .instance()
      .componentDidMount()
      .then(() => {
        expect(axios.get).toHaveBeenCalled();
      });
  });

  it('calls axios.get in #componentDidMount with correct url', () => {
    return mountedApp
      .instance()
      .componentDidMount()
      .then(() => {
        expect(axios.get).toHaveBeenCalledWith('../data.json');
      });
  });

  it('updates state with fetched data', () => {
    return mountedApp
      .instance()
      .componentDidMount()
      .then(() => {
        expect(mountedApp.state()).toHaveProperty('data', [
          {
            ticker: 'test ticker',
            price: 3,
            assetClass: 'test asset class'
          }
        ]);
      });
  });

  it('renders a table', () => {
    const tables = mountedApp.find('Table');
    expect(tables.length).toBe(1);
  });
});

describe('sortBy function test', () => {
  let mountedApp;

  beforeEach(() => {
    mountedApp = shallow(<App />);

    mountedApp.setState({
      data: [
        {
          ticker: 'BETA',
          price: -3150.67,
          assetClass: 'Credit'
        },
        {
          ticker: 'ALPHA',
          price: 3791.37,
          assetClass: 'Equities'
        }
      ],
      currentPage: 0
    });
  });

  it('updates this.state.data sorting by price', () => {
    mountedApp.instance().sortBy('price');
    expect(mountedApp.instance().state.data[0].price).toBe(3791.37);
  });

  it('updates this.state.data sorting by ticker', () => {
    mountedApp.instance().sortBy('ticker');
    expect(mountedApp.instance().state.data[0].ticker).toBe('ALPHA');
  });

  it('updates this.state.data sorting by assetClass', () => {
    mountedApp.instance().sortBy('assetClass');
    expect(mountedApp.instance().state.data[0].assetClass).toBe('Equities');
  });
});

describe('sortBy with view all option test', () => {
  let mountedApp = shallow(<App />);

  mountedApp.setState({
    data: [
      {
        ticker: 'BETA',
        price: -3150.67,
        assetClass: 'Credit'
      },
      {
        ticker: 'ALPHA',
        price: 3791.37,
        assetClass: 'Equities'
      }
    ],
    currentPage: -1
  });

  it('updates this.state.data sorting by price', () => {
    mountedApp.instance().sortBy('price');
    expect(mountedApp.instance().state.elements[0].price).toBe(3791.37);
  });
});

describe('handlePageClick test', () => {
  let mountedApp = shallow(<App />);

  mountedApp.setState({
    data: [
      {
        ticker: 'BETA',
        price: -3150.67,
        assetClass: 'Credit'
      },
      {
        ticker: 'ALPHA',
        price: 3791.37,
        assetClass: 'Equities'
      },
      {
        ticker: 'ALPHA',
        price: 791.37,
        assetClass: 'Credit'
      }
    ],
    currentPage: 0,
    perPage: 1
  });

  it('updates this.state.elements handling click event', () => {
    mountedApp.instance().handlePageClick({ selected: 1 });
    expect(mountedApp.instance().state.currentPage).toBe(1);
    expect(mountedApp.state()).toHaveProperty('elements', [
      {
        ticker: 'ALPHA',
        price: 3791.37,
        assetClass: 'Equities'
      }
    ]);
  });
});

describe('viewAll test', () => {
  let mountedApp = shallow(<App />);
  const mockData = [
    {
      ticker: 'BETA',
      price: -3150.67,
      assetClass: 'Credit'
    },
    {
      ticker: 'ALPHA',
      price: 3791.37,
      assetClass: 'Equities'
    }
  ];
  mountedApp.setState({
    data: mockData,
    currentPage: -1
  });

  it('updates this.state.elements when view all button clicked', () => {
    mountedApp.instance().viewAll();
    expect(mountedApp.state()).toHaveProperty('elements', mockData);
  });
});
