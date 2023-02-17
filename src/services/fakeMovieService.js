import * as genresAPI from './fakeGenreService'

const movies = [
    {
        _id: "434324124214gdsf43232143fd",
        title: "Terminator",
        genre: {
            _id: "434324124214gdsf4323214324",
            name: "Action",
        },
        numberInStock: 6,
        dailyRentalRate: 2.5,
        publishDate: new Date(),
    },



    {
        _id: "43432454352352345543543554",
        title: "Free Guy",
        genre: {
            _id: "5643645645364536345bvtg3453",
            name: "Comedy",
        },
        numberInStock: 5,
        dailyRentalRate: 2.5,
        //publishDate: new Date(),
    },


    {
        _id: "dftysdysyfh45645654365466453",
        title: "Shaolin",
        genre: {
            _id: "434324124214gdsf4323214324",
            name: "Action",
        },
        numberInStock: 5,
        dailyRentalRate: 2.5,
        //publishDate: new Date(),
    },

    {
        _id: "6546dfsdfgsdfgdsfgsdfgsdfg",
        title: "Nobody",
        genre: {
            _id: "434324124214gdsf4323214324",
            name: "Action",
        },
        numberInStock: 4,
        dailyRentalRate: 2.6,
        //publishDate: new Date(),
    },

    {
        _id: "6546346hfgdhdfghdfgh",
        title: "John Wick",
        genre: {
            _id: "434324124214gdsf4323214324",
            name: "Action",
        },
        numberInStock: 4,
        dailyRentalRate: 2.6,
        //publishDate: new Date(),
    }
];


export const getMovies = () => {
    return movies
}

export function getMovie(id){
    return movies.filter(d=>d._id===id)[0];
}

//save or enter new movie
export function saveMovie(movie){
    console.log(`saveMovie`, movie);
    let movieInDb= movies.find(m=>m._id===movie._id) || {};
    movieInDb.title=movie.title;
    movieInDb.genre = genresAPI.genres.find(g => g._id === movie.genreId);
    movieInDb.numberInStock=movie.numberInStock;
    movieInDb.dailyRentalRate=movie.dailyRentalRate;

    if(!movieInDb._id){
        movieInDb._id=Date.now().toString();
        movies.push(movieInDb);
    }

    return movieInDb;

}


export function deleteMovie(id){
    let movieInDb =movies.find(m=>m._id===id);
    movies.splice(movies.indexOf(movieInDb), 1);
    return movieInDb;

}