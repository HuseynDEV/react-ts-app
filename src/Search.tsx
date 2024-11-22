import { useEffect, useRef } from "react"

const Search = ({ query, setQuery }: { query: string, setQuery: React.Dispatch<React.SetStateAction<string>> }) => {

    const inputEl: React.MutableRefObject<null> = useRef(null)


    useEffect(() => {

        const callback = (e:KeyboardEvent) => {
            if (inputEl.current && e.code === "Enter") {
                inputEl.current.focus()
                setQuery('')
            }
        }

        document.addEventListener("keydown", callback)
        return () => document.removeEventListener('keydown', callback)

    }, [])


    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputEl}
        />
    )
}

export default Search