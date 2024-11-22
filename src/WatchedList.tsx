import { newWatchedMovieType } from './MovieDetail'
import WatchedMovie from './WatchedMovie'

const WatchedList = ({ watched, onDeleteWatched }: { watched: newWatchedMovieType[], onDeleteWatched:(id:string)=>void }) => {
    return (

        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovie key={movie.imdbID} movie={movie} onDeleteWatched={onDeleteWatched}  />
            ))}
        </ul>
    )
}

export default WatchedList