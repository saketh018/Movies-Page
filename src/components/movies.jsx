import React, { Component } from "react";
import Like from "../common/like";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./pagination";
import {Paginate} from "../utils/pagination";
import ListGroup from "../common//listGroup";
import { getGenres} from "../services/fakeGenreService";
class Movies extends Component {
  state = {
    movies: [],
    genre :[],
    pageSize: 4
  };
componentDidMount()
{
  const genres = [{name:"all Genre"},...getGenres()]
  this.setState({movies:getMovies(), genres});
}
  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handelPage=page=>
  {
    this.setState({currentPage:page});

  };
  handleGenreSelect=genre=>
  {
    this.setState({selectedGenre:genre,currentPage:1});
  }

  render() {
    const { length: count } = this.state.movies;
    const {pageSize,currentPage,movies:allMovies,selectedGenre}= this.state;
    const filtered= selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id)
    : allMovies;
    const movies= Paginate(filtered,currentPage,pageSize);

    if (count === 0) return <p>There are no movies in the database.</p>;

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup items={this.state.genres} onItemSelect={this.handleGenreSelect} selectedItem={this.state.selectedGenre} />
        </div>
        <div className="col">     
        <p>Showing {filtered.length} movies in the database.</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={movie.liked}
                    onClick={() => this.handleLike(movie)}
                  />
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       <Pagination itemCount={filtered.count} pageSize={this.state.pageSize} pageChange={this.handelPage} currentPage={this.currentPage}/>
       </div>   
      </div>
    );
  }
}

export default Movies;
