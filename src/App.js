import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf';
import Search from './Search';
import ButtonToSearch from './ButtonToSearch'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState({
          books
        })
      })
  }

  changeBookshelf = (bookToChange, toShelf) => {
    const changedBook = bookToChange;
    changedBook.shelf = toShelf;
    this.setState((prevState) => ({
      books: [...prevState.books.filter((book) => book.id !== changedBook.id), changedBook]
    }))

    BooksAPI.update(bookToChange, toShelf);
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={()=>(
            <Search changeBookshelf={this.changeBookshelf} myBooks={this.state.books}/>
        )} />
        <Route exact path="/" render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>Personal Library</h1>
            </div>
            <div className="list-books-content">
              <Bookshelf name="Personal Library" books={this.state.books} changeBookshelf={this.changeBookshelf} />
              {/* <Bookshelf name="Want to Read" books={this.state.books.filter((book) => (book.shelf==="wantToRead"))} changeBookshelf={this.changeBookshelf} />
              <Bookshelf name="Read" books={this.state.books.filter((book) => (book.shelf==="read"))} changeBookshelf={this.changeBookshelf} /> */}
            </div>
            <ButtonToSearch/>
          </div>
        )} />

      </div>
    )
  }
}

export default BooksApp
