
import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import ButtonToMain from './ButtonToMain'
import SearchResults from './SearchResults'
import PropTypes from 'prop-types';

class Search extends Component {
  state = {
    query: "",
    results: []
  }

  handleQueryChange = evt => {
    const newQuery = evt.target.value;
    this.setState({
      query: newQuery
    })
    /* Avoids making API call with empty string as query */
    if (newQuery === "") {this.setState({results: []})}
    else {this.handleSearch(newQuery, this.props.myBooks) }
  }

  handleSearch = async (query, myBooks) => {
    let results = await BooksAPI.search(query);
    /* Avoided if query has no returns */
    if (Array.isArray(results)) {
      // Getting books already in state
      let resultsIds = results.map(r => r.id);
      for (let book of myBooks.filter(mb => resultsIds.includes(mb.id))) {
        // Replace book in results for equivalent in state
        let idx = results.indexOf(results.filter(r => r.id === book.id)[0]);
        results.splice(idx, 1, book);
      }
    }
    // sometimes the query is empty again by the time the API response reaches back
    this.setState({results: Array.isArray(results) && this.state.query !== "" ? results : [] })
  }

  render() {
    const { query, results } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <ButtonToMain/>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              name='query'
              placeholder="Search by title or author"
              value={query}
              onChange={this.handleQueryChange}
              />
          </div>
        </div>
        <SearchResults results={results} query={query} changeBookshelf={this.props.changeBookshelf} />
      </div>
    )
  }
}

Search.propTypes = {
  myBooks: PropTypes.array.isRequired,
  changeBookshelf: PropTypes.func.isRequired,
};

export default Search;