import { tempMovieDataType } from "./App"

const NumResults = ({ movies }: { movies: tempMovieDataType[] }) => {
    return (
        <p className="num-results">
            Found <strong>{movies.length}</strong> results
        </p>
    )
}

export default NumResults