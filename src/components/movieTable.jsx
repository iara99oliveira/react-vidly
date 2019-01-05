import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";

class MovieTable extends Component {
  state = {
    columns: [
      {
        path: "title",
        label: "Title",
        content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      },
      { path: "genre.name", label: "Genre" },
      { path: "numberInStock", label: "Stock" },
      { path: "dailyRentalRate", label: "Rate" },
      {
        key: "like",
        content: movie => (
          <Like onLike={() => this.props.onLike(movie)} liked={movie.liked} />
        )
      },
      {
        key: "delete",
        content: movie => (
          <button
            onClick={() => this.props.onDelete(movie._id)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        )
      }
    ]
  };

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.state.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MovieTable;
