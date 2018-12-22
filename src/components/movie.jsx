import React, { Component } from 'react';
import { getMovies } from "../services/fakeMovieService";

class Movie extends Component {
    state = {
        movies: getMovies()
      };
      render() {
        return (

        <React.Fragment>
            <div>
              {this.getStatement()}  
              
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Rate</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.getTableLines()}
                </tbody>
              </table>
            </div> 

        </React.Fragment>
        );
    }

    getStatement(){
        let n = this.state.movies.length;
        if(n === 0){
          return <p>não há filmes em estoque :(</p>
        }else{
          let s = '';
          if(n > 1)s = 's';
    
          return <p>Temos {this.state.movies.length} filme{s} pra você escolher :)</p>
    
        } 
    
      }
    
      getTableLines(){
        
        let movies = this.state.movies;
    
        return movies.map(movie => 
          <tr key={movie._id}>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td><button onClick={()=> this.deleteMovie(movie._id)} className="btn btn-danger btn-sm">Deletar</button></td>
          </tr>
        );
      }
    
      deleteMovie(id){
        let movies = this.state.movies;
    
        let index = movies.map(function(movie) {
          return movie._id
        }).indexOf(id);
        
        movies.splice(index, 1);
        console.log(movies);
    
        this.setState({movies: movies});
      }
    
}
 
export default Movie;