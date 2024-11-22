import { newWatchedMovieType } from './MovieDetail';

const WatchedSummary = ({ watched }: { watched: newWatchedMovieType[] }) => {

    const average = (arr: (number | undefined)[]) =>
        arr.reduce((acc, cur, i, arr) => (acc ? acc : 0) + (cur ? cur : 0) / arr.length, 0);

    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));
    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                </p>
                <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating && avgImdbRating.toFixed(2)}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{ avgUserRating && avgUserRating.toFixed(2)}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{avgRuntime && avgRuntime.toFixed(2)} min</span>
                </p>
            </div>
        </div>
    )
}

export default WatchedSummary