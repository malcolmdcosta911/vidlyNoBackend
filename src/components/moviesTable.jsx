import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Like from './common/like';
import Table from './common/table';

class MoviesTable extends Component {

    columns = [
        {
            path: `title`, name: `Title`,
            render: (movie) =><Link to={`/movies/${movie._id}`}>{movie.title}</Link>
        },
        { path: `genre.name`, name: `Genre` },
        { path: `numberInStock`, name: `Stock` },
        { path: `dailyRentalRate`, name: `Rate` },
        {
            key: `like`,
            render: (movie) => <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => this.props.onDelete(movie)}>Delete</button>
        },
        {
            key: `delete`,
            render: (movie) => <Like data={movie} onLike={this.props.onLike} />
        },
    ];


    render() {

        const { movies, onSort, sortColumn } = this.props;

        return (<Table data={movies} onSort={onSort} sortColumn={sortColumn} columns={this.columns} />);
    }
}

export default MoviesTable;