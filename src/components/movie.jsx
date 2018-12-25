import React, { Component } from 'react';
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class Movie extends Component {
    state = {
      movies: getMovies(),
      pageSize: 5,
      currentPage: 1
    };

    handleLike = (movie) => {
      const movies = [...this.state.movies];
      const index = movies.indexOf(movie);
      movies[index].liked = !movies[index].liked
      this.setState({movies})

    }

    handleDelete = id => {
      let movies = this.state.movies;
  
      let index = movies.map(function(movie) {
        return movie._id
      }).indexOf(id);
      
      movies.splice(index, 1);
      console.log(movies);
  
      this.setState({movies}); 
      //ao invés de passar "{movies: movies}" como parâmetro, podemos simplificar já que os nomes do nosso array e o do state são iguais
    }

    handlePageChange = page =>{
      this.setState({currentPage: page});
      
    }

    render() {
      const {length: n} = this.state.movies;
      const {pageSize, currentPage, movies : allMovies} = this.state;

      if(n === 0) return <p>There are no movies here :(</p>
        
      const movies = paginate(allMovies, currentPage, pageSize);

      return (
          <React.Fragment>
              <div> 
              <p>Look! We have {n} movies for you :)</p>
              
              <table className="table">
                  <thead>
                  <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Genre</th>
                      <th scope="col">Stock</th>
                      <th scope="col">Rate</th>
                      <th/>
                      <th/>
                  </tr>
                  </thead>
                  <tbody>
                    {movies.map(movie => 
                      <tr key={movie._id}>
                        <td>{movie.title}</td>
                        <td>{movie.genre.name}</td>
                        <td>{movie.numberInStock}</td>
                        <td>{movie.dailyRentalRate}</td>
                        <td><Like onLike={() => this.handleLike(movie)} liked={movie.liked}/></td>
                        <td><button onClick={()=> this.handleDelete(movie._id)} className="btn btn-danger btn-sm">Delete</button></td>
                      </tr>
                    )}
                  </tbody>
              </table>
              </div> 
              <Pagination
                itemsCount={n}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />

          </React.Fragment>
      );
    }
    
}
 
export default Movie;