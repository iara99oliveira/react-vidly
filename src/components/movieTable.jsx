import React, { Component } from 'react';
import Like from "./common/like";
import TableHeader from "./common/tableHeader";
import TableBody from './common/tableBody';

class MovieTable extends Component {
    state = { 
        columns:[
            {path:"title", label:"Title"},
            {path:"genre.name", label:"Genre"},
            {path:"numberInStock", label:"Stock"},
            {path:"dailyRentalRate", label:"Rate"},
            {key:"like", content: movie => <Like onLike={() => this.props.onLike(movie)} liked={movie.liked}/>},
            {key:"delete", content: movie => <button onClick={()=> this.props.onDelete(movie._id)} className="btn btn-danger btn-sm">Delete</button>}
        ]
     }
    
    render() { 
        const{movies, onSort, sortColumn } = this.props;

        return ( 
            <table className="table">
                <TableHeader 
                    columns={this.state.columns}
                    sortColumn={sortColumn}
                    onSort={onSort}
                />
                <TableBody 
                    data={movies}
                    columns={this.state.columns}
                />
            </table>
        );
    }
}

export default MovieTable;