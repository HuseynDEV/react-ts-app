import { useEffect, useRef, useState } from "react"
import StarRating from "./StarRating";
import Loader from "./Loader";


interface propsType {
    selectedId: string,
    onCloseMovie: () => void,
    onAddWatched: (movieData: newWatchedMovieType) => void,
    watched: newWatchedMovieType[]

}
interface MovieData {
    Title: string;
    Year: string;
    Poster: string;
    Runtime: string;
    imdbRating: string;
    Plot: string;
    Released: string;
    Actors: string;
    Director: string;
    Genre: string;
    [key: string]: any; // Allow extra properties if needed
}

export interface newWatchedMovieType {
    imdbID: string,
    title: string,
    year: string,
    poster: string,
    imdbRating: number,
    runtime: number,
    userRating: number,
    countRatingDecision:number

}
const MovieDetail = ({ selectedId, onCloseMovie, onAddWatched, watched }: propsType) => {


    const [loading, setLoading] = useState<boolean>(false)
    const [movieData, setMovieData] = useState([])
    const [userRating, setUserRating] = useState<number>(0)
    const [avrgRating, setAvrgRating] = useState(0)
    const countRef = useRef(0)


    useEffect(() => {
        if (userRating) {
            countRef.current = countRef.current ++
        }
    }, [userRating])


    const rating = watched.find(item => item.imdbID == selectedId)?.userRating


    const movie: MovieData = {
        Title: "Interstellar",
        Year: "2014",
        Poster: "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_SX300.jpg",
        Runtime: "169 min",
        imdbRating: "8.7",
        Plot: "When Earth becomes uninhabitable in the future...",
        Released: "07 Nov 2014",
        Actors: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
        Director: "Christopher Nolan",
        Genre: "Adventure, Drama, Sci-Fi"
    };

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movieData



    useEffect(() => {

        const getMovieDetails = async () => {
            try {
                setLoading(true)
                const res = await fetch(`https://omdbapi.com/?apikey=fc1fef96&i=${selectedId}`)
                const data = await res.json()


                if (!res.ok) {
                    throw new Error("Something went wrong")
                }
                if (data.Response === 'False') {
                    throw new Error("Movie is not defined")
                }
                setLoading(false)
                setMovieData(data)


            }
            catch (err) {
                setLoading(false)

            }
            finally {
                setLoading(false)
            }
        }

        getMovieDetails()

    }, [selectedId])



    const handleAdd = () => {
        const newWatchedMovie: newWatchedMovieType = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(" ").at(0)),
            userRating,
            countRatingDecision:countRef.current
        }
        onAddWatched(newWatchedMovie)
        onCloseMovie()

        // setAvrgRating(imdbRating)
        // console.log(avrgRating);
        // setAvrgRating((avrgRating + userRating) / 2)
        // setAvrgRating((avrgRating) => (avrgRating + userRating) / 2)

        // setAvgRating((avgRating+userRating)/2)

    }




    useEffect(() => {

        function callback(e: KeyboardEvent) {
            if (e.code === "Escape") {
                onCloseMovie()
            }
        }
        document.addEventListener("keydown", callback)

        return function () {
            document.removeEventListener('keydown', callback)
        }
    }, [onCloseMovie]);

    useEffect(() => {
        document.title = `Movie | ${title}`

        return function () {
            document.title = "usePopcorn"
        }
    }, [title])


    return (
        <div className="details">
            {
                loading ? <Loader /> : (<>
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>🔙</button>

                        <div className="details-overview">
                            <img src={poster} alt={`Poster of ${movie} movie`} />
                            <h2>{title}</h2>
                            <p>
                                {released} &bull; {runtime}
                            </p>
                            <p>{genre}</p>
                            <p>
                                <span>⭐️</span>
                                {imdbRating} IMDb rating
                            </p>
                        </div>
                    </header>
                    {avrgRating}
                    <section>
                        <div className="rating">

                            {rating ? (
                                <>
                                    <p>Added</p>
                                    <StarRating maxRating={10} ratingData={rating} size={24} setUserRating={setUserRating} />
                                </>
                            ) :
                                <StarRating maxRating={10} size={24} setUserRating={setUserRating} />}
                            {userRating > 0 && <button className="btn-add" onClick={handleAdd}>Add to list</button>}
                        </div>
                        <p><em>{plot}</em></p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>)
            }

        </div>
    )
}

export default MovieDetail




