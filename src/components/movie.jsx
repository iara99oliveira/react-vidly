import React, { Component } from 'react';
import { getMovies } from "../services/fakeMovieService";
import Like from "./like";

class Movie extends Component {
    state = {
        movies: getMovies()
      };
      render() {
        const {length: n} = this.state.movies;
        if(n === 0) return <p>não há filmes em estoque :(</p>
        return (
            <React.Fragment>
                <div> 
                <p>Temos {n} filmes pra você escolher :)</p>
                
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
                    {this.getTableLines()}
                    </tbody>
                </table>
                </div> 
            </React.Fragment>
        );
    }

      getTableLines(){
        
        let movies = this.state.movies;
    
        return movies.map(movie => 
          <tr key={movie._id}>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td><Like onLike={() => this.handleLike(movie)} liked={movie.liked}/></td>
            <td><button onClick={()=> this.deleteMovie(movie._id)} className="btn btn-danger btn-sm">Deletar</button></td>
          </tr>
        );
      }

      handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index].liked = !movies[index].liked
        this.setState({movies})

      }

      deleteMovie(id){
        let movies = this.state.movies;
    
        let index = movies.map(function(movie) {
          return movie._id
        }).indexOf(id);
        
        movies.splice(index, 1);
        console.log(movies);
    
        this.setState({movies}); 
        //ao invés de passar "{movies: movies}" como parâmetro, podemos simplificar já que os nomes do nosso array e o do state são iguais
      }
    
}
 
export default Movie;