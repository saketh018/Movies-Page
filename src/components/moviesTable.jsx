import React ,{Component} from 'react';
import Like from "../common/like";

class MoviesTable extends Component {
    raiseSort = path =>
    {
        const SortCloumn ={...this.props.SortCloumn};
      if(SortCloumn.path===path)
      SortCloumn.order=(SortCloumn.order==="asc")? 'desc': 'asc';
      else{
        SortCloumn.path=path;
        SortCloumn.order="asc";
    }
    this.props.Onsort(SortCloumn);
    };
      render() { 
        const {movies , OnLike , OnDelete,Onsort}= this.props;
        return (
        <table className="table">
          <thead>
            <tr>
              <th onClick={()=>this.raiseSort('title')}>Title</th>
              <th onClick={()=>this.raiseSort('genre.name')}>Genre</th>
              <th onClick={()=>this.raiseSort('numberInStock')}>Stock</th>
              <th onClick={()=>this.raiseSort('dailyRentalRate')}>Rate</th>
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
                    onClick={() => OnLike(movie)}
                  />
                </td>
                <td>
                  <button
                    onClick={() => OnDelete(movie)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        );
    }
};
export default MoviesTable;