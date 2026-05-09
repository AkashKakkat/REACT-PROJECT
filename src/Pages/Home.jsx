import MovieCard from "../Components/MovieCard"
import { useEffect, useState } from "react";
import { searchMovies, getPopularMovies } from "../Services/API";
import MovieCardSkeleton from "../Components/MovieCardSkeleton"
import "../CSS/home.css"

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [heroMovie, setHeroMovie] = useState(null);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)

                // Hero Rotation Logic
                if (popularMovies.length > 0) {
                    setHeroMovie(popularMovies[0])
                    let i = 0;
                    setInterval(() => {
                        i = (i + 1) % 5; // Rotate through top 5
                        setHeroMovie(popularMovies[i])
                    }, 5000)
                }

            } catch (err) {
                console.log(err);
                setError("Failed to load movies..!!")
            }
            finally {
                setLoading(false)
            }

        }

        loadPopularMovies();
    }, [])

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return
        if (loading) return

        setLoading(true)
        try {
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch (err) {
            console.log(err);
            setError("Failed to search movies...")
        }
        finally {
            setLoading(false)
        }


    }


    return (
        <div className="home">
            {/* Hero Section */}
            {heroMovie && (
                <div className="hero-section" style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${heroMovie.backdrop_path})`
                }}>
                    <div className="hero-overlay"></div>
                    <div className="hero-content">
                        <h1 className="hero-title">{heroMovie.title}</h1>
                        <p className="hero-desc">{heroMovie.overview}</p>
                    </div>
                </div>
            )}

            <form onSubmit={handleSearch} className="search-form">
                <input type="text" placeholder="Search for Movies..." className="search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <button className="search-button" type="submit">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="movies-grid">
                    {/* Show 10 skeletons while loading */}
                    {[...Array(10)].map((_, i) => <MovieCardSkeleton key={i} />)}
                </div>
            ) : (
                <div className="movies-grid">
                    {movies.map(movie => (<MovieCard movie={movie} key={movie.id} />))}
                </div>
            )}


        </div>
    );
}

export default Home