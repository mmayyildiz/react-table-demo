import React, { Component } from 'react';
import axios from 'axios';
import Table from './components/Table/Table.js';
import ReactPaginate from 'react-paginate';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      currentPage: 0,
      elements: [],
      offset: 0,
      perPage: 15
    };
  }

  setElementsForCurrentPage() {
    const elements = this.state.data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    this.setState({ elements: elements });
  }

  handlePageClick = data => {
    const selectedPage = data.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState({ currentPage: selectedPage, offset: offset }, () => {
      this.setElementsForCurrentPage();
    });
  };

  async componentDidMount() {
    let res = await axios.get('../data.json');
    this.setState(
      {
        data: res.data.financialInstruments,
        pageCount: Math.ceil(
          res.data.financialInstruments.length / this.state.perPage
        )
      },
      () => this.setElementsForCurrentPage()
    );
  }

  compareBy = key => {
    return function(a, b) {
      let descOrder = true;
      if (key === 'ticker') {
        descOrder = false;
      }
      if (a[key] < b[key]) return descOrder ? 1 : -1;
      if (a[key] > b[key]) return descOrder ? -1 : 1;
      return 0;
    };
  };

  sortBy = key => {
    let arrayCopy = [...this.state.data];
    arrayCopy.sort(this.compareBy(key));
    if (this.state.currentPage < 0) {
      this.setState({ data: arrayCopy, elements: arrayCopy });
    } else {
      this.setState({ data: arrayCopy }, () => {
        this.setElementsForCurrentPage();
      });
    }
  };

  viewAll = () => {
    this.setState({
      elements: this.state.data,
      currentPage: -1
    });
  };

  render() {
    let paginationElement;
    if (this.state.pageCount > 1) {
      paginationElement = (
        <ReactPaginate
          previousLabel={'<<'}
          nextLabel={'>>'}
          breakLabel={'...'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          forcePage={this.state.currentPage}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      );
    }

    return (
      <div className="App">
        <div className="paginated-section">
          {paginationElement}
          <button className="viewAllBtn" onClick={this.viewAll}>
            View all
          </button>
        </div>
        <div>
          <Table data={this.state.elements} sortBy={this.sortBy} />
        </div>
      </div>
    );
  }
}

export default App;
