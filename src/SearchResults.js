
import React from 'react'
import Book from './Book'

function SearchResults (props) {
  // console.log(props.results.length)
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

export default SearchResults;