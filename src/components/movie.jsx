import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MovieTable from "./movieTable";
import _ from "lodash";

class Movie extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 5,
    currentPage: 1,
    sortColumn: {
      path: "title",
      order: "asc"
    }
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleDelete = id => {
    let movies = this.state.movies;

    let index = movies
      .map(function(movie) {
        return movie._id;
      })
      .indexOf(id);

    movies.splice(index, 1);

    this.setState({ movies });
    //ao invés de passar "{movies: movies}" como parâmetro, podemos simplificar já que os nomes do nosso array e o do state são iguais
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({sortColumn});
    
  };

  getPagedData = () => {
    const {pageSize, currentPage, movies: allMovies, selectedGenre, sortColumn
    } = this.state;
    
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;
    
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    
    const movies = paginate(sorted, currentPage, pageSize);

    return {totalCount: filtered.length, data: movies};
  }

  render() {
    const { length: n } = this.state.movies;
    const {pageSize, currentPage, genres, selectedGenre, sortColumn} = this.state;

    if (n === 0) return <p>There are no movies here :(</p>;

    const {totalCount, data: movies} = this.getPagedData();
    
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={genres}
              selectedItem={selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <p>Look! We have {totalCount} movies for you :)</p>
            <MovieTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
          ;
        </div>
      </React.Fragment>
    );
  }
}

export default Movie;
