import { tempMovieDataType } from './App'
import Movie from './Movie'


export interface propsType {
    movies: tempMovieDataType[],
    onSelectMovie: (id: string) => void,

}
const MovieList = ({ movies, onSelectMovie }: propsType) => {
    return (
        <ul className="list">
            {movies?.map((movie) => (
                <Movie key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie}  />
            ))}
        </ul>
    )
}

export default MovieList