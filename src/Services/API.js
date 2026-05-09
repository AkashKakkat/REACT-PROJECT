const API_kEY = "f8309be34499a9a7acb6452f594eafa4";
const BASE_URL = "https://api.themoviedb.org/3"

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_kEY}`);
    const data = await response.json()
    return data.results

}

export const searchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_kEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json()
    return data.results

}