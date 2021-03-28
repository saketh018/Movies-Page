import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./pagination";
import {Paginate} from "../utils/pagination";
import ListGroup from "../common//listGroup";
import { getGenres} from "../services/fakeGenreService";
import _ from "lodash";
class Movies extends Component {
  state = {
    movies: [],
    genre :[],
    pageSize: 4,
    SortCloumn : {path:"title",order:"asc"}
  };
componentDidMount()
{
  const genres = [{_id: "",name:"all Genre"},...getGenres()]
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
handleSort = SortCloumn =>
{
  this.setState({SortCloumn});
}

  render() {
    const { length: count } = this.state.movies;
    const {pageSize,currentPage,movies:allMovies,selectedGenre,SortCloumn}= this.state;
    const filtered= selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id)
    : allMovies;

    

    if (count === 0) return <p>There are no movies in the database.</p>;
const sorted =_.orderBy(filtered,[SortCloumn.path],[SortCloumn.order]);
const movies= Paginate(sorted,currentPage,pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup items={this.state.genres} onItemSelect={this.handleGenreSelect} selectedItem={this.state.selectedGenre} />
        </div>
        <div className="col">     
        <p>Showing {filtered.length} movies in the database.</p>
        <MoviesTable movies={movies}  SortCloumn={SortCloumn} OnLike={this.handleLike} Ondelete={this.handleDelete} Onsort={this.handleSort}/>
       <Pagination itemCount={filtered.count} pageSize={this.state.pageSize} pageChange={this.handelPage} currentPage={this.currentPage}/>
       </div>   
      </div>
    );
  }
}

export default Movies;
