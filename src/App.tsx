import Navbar from "./Navbar";
import MainComponent from "./MainComponent";
import { useEffect, useState } from "react";
import Search from "./Search";
import NumResults from "./NumResults";
import Box from "./Box";
import MovieList from "./MovieList";
import WatchedSummary from "./WatchedSummary";
import WatchedList from "./WatchedList";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import MovieDetail, { newWatchedMovieType } from "./MovieDetail";

export interface tempMovieDataType {
  imdbID: string,
  Title: string,
  Year: string,
  Poster: string,
  runtime?: number,
  imdbRating?: number,
  userRating?: number
}


export default function App() {
  const [query, setQuery] = useState<string>('fight club')
  const [movies, setMovies] = useState<tempMovieDataType[]>([]);
  const [watched, setWatched] = useState<newWatchedMovieType[]>(() => {
    return JSON.parse(localStorage.getItem('watched') || '[]') 
  });





  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // const isWatched = watched.some(item => item.imdbID == selectedId)


  // useEffect(() => {
  //   console.log('after initial render')
  // }, [])

  // useEffect(() => {
  //   console.log('after every render');

  // })

  // console.log('during render');

  // useEffect(() => {

  // }, [query])

  const handleAddWatched = (movie: newWatchedMovieType) => {
    const movieExists = watched.some(movieData => movieData.title === movie.title)
    setWatched(watched => {
      if (movieExists) {
        return watched.map(movieData =>
          movieData.title === movie.title
            ? { ...movieData, userRating: movie.userRating }
            : movieData
        )
      }
      else {
        return [...watched, movie]
      }
    })
  }


  useEffect(() => {

    const controller = new AbortController()

    const fetMovies = async () => {
      try {
        setLoading(true)
        setError('')
        const res = await fetch(`https://omdbapi.com/?apikey=fc1fef96&s=${query}`,
          { signal: controller.signal }
        )
        const data = await res.json()

        if (!res.ok) {
          throw new Error("Something went wrong")
        }
        if (data.Response === "False") {
          throw new Error("Movie is not defined")
        }

        setMovies(data.Search)

      }
      catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError((err as Error).message)

        }
      }
      finally {
        setLoading(false)
      }
      if (!query.length) {
        setMovies([])
        setError('')
        return;
      }
    }
    fetMovies()

    return function () {
      controller.abort()
    }
  }, [query])



  const handleSelectMovie = (id: string) => {
    setSelectedId(selectedId => selectedId === id ? null : id)
  }

  const handleCloseMovie = () => {
    setSelectedId(null)
  }

  const handleDeleteWatched = (id: string) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }


  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched))
  }, [watched])


  return (
    <>
      <Navbar  >
        <Search setQuery={setQuery} query={query} />
        <NumResults movies={movies} />
      </Navbar>
      <MainComponent >
        <Box >
          {loading && <Loader />}
          {!loading && !error && <MovieList
            movies={movies}
            onSelectMovie={handleSelectMovie}
          />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {
            selectedId ? (<MovieDetail
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />) : (<>
              <WatchedSummary watched={watched} />
              <WatchedList watched={watched} onDeleteWatched={handleDeleteWatched} />
            </>)
          }
        </Box>
      </MainComponent>
    </>
  );
}