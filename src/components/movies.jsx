import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import SearchBox from './common/searchBox';

import { getMovies, deleteMovie } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
 
import { sorting as orderBy } from '../utils/sorting';
import { paginate } from '../utils/paginate';


class Movies extends Component {

    constructor() {
        super();
        // console.log(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    state = {
        movies: [], currentPage: 1, pageSize: 3, genres: [],
        sortColumn: { path: `title`, order: `asc` },
        selectedGenre:null,
        searchQuery: '',
    };


    componentDidMount() {
        let genres = getGenres();
        genres = [{ name: 'All Genres', _id: '' }, ...genres];
        this.setState({ movies: getMovies(), genres });
    };


    handleLike = (data) => {
        let movies = [...this.state.movies];
        const index = movies.indexOf(data);
        let movie = movies[index];
        movie = { ...movie, liked: !movie.liked };
        movies[index] = movie;

        this.setState({ movies });
    };

    handleDelete(data) {
        let movies = [...this.state.movies];
        movies = movies.filter(movie => movie._id !== data._id);

        this.setState({ movies, currentPage: 1 });

        deleteMovie(data._id);
    };

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    handleGenreSelect = (genre) => {
        this.setState({ selectedGenre: genre, currentPage: 1, searchQuery:'' });
    };

    handleSort = (sortColumn) => {
        this.setState({ sortColumn });
    };

    getPagedData = () => {
        const { movies: allMovies, pageSize, currentPage, selectedGenre, sortColumn, searchQuery } = this.state;
        const filtered = 
            searchQuery ? allMovies.filter(movie => movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())):
            selectedGenre && selectedGenre._id ?allMovies.filter(movie => movie.genre._id === selectedGenre._id) 
                : allMovies;

        const sorted = orderBy(filtered, sortColumn.path, sortColumn.order);

        //cause filtered legth >  movies length
        const movies = paginate(sorted, currentPage, pageSize);


        return { data: movies, totalCount: filtered.length }
    };
 
    handleSearch = (query) => {
        //console.log(input.value);
        this.setState({ selectedGenre: null, currentPage: 1, searchQuery: query });
    }

    render() {
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, genres, selectedGenre, sortColumn, searchQuery } = this.state;

        if (count === 0) return `No movies found in Database`;

        const { data: movies, totalCount } = this.getPagedData();

        return (
            <React.Fragment>


                <div className="row">

                    <div className="col-sm-12 col-md-3 col-lg-3">
                        <ListGroup items={genres} onItemSelect={this.handleGenreSelect} selectedItem={selectedGenre} />
                    </div>

                    <div className="col">
                        <Link to='/movies/new' className='btn btn-primary mb-2'>New Movie</Link>
                        <p>{`Showing ${totalCount} movies  in Database`}</p>
                        <SearchBox
                           // name='searchQuery'
                            value={searchQuery}
                            onChange={this.handleSearch}
                        />
                        <MoviesTable
                            movies={movies}
                            sortColumn={sortColumn}
                            onDelete={this.handleDelete}
                            onLike={this.handleLike}
                            onSort={this.handleSort}
                        />
                    </div>
                </div>

                <Pagination
                    itemsCount={totalCount}
                    onPageChange={this.handlePageChange}
                    pageSize={pageSize}
                    currentPage={currentPage}

                />
            </React.Fragment>
        );
    }
}

export default Movies;