
import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types';

function SearchResults (props) {
  return (
    <div className="search-books-results">
        <ol className="books-grid">
        {props.results.length > 0 ? (
          props.results.map((book)=>(
          <Book book={book} key={book.id} changeBookshelf={props.changeBookshelf}/>
          ))
        ) : (
          <p>{props.query !== "" && ("No results for this query")}</p>
        )}
        </ol>
    </div>
  )
}

SearchResults.propTypes = {
  results: PropTypes.array.isRequired,
  changeBookshelf: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired
};

export default SearchResults;