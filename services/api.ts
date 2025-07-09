// 'export' makes this object available to other files that import it
export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_DB_API_KEY,
    Headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_DB_API_KEY}`
    }
}

// this function expects one argument, an object with a 'query' property
export const fetchFromTMDB = async ({ query }: { query: string }) => { // { query: string } is a type annotation for the argument
    const endpoint = query
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.Headers
    });

    if(!response.ok){
        throw new Error(`HTTP error! status: ${response.statusText}`);
    }

    const data = await response.json(); // parse the JSON response
    return data.results; // return the parsed data
}


// const url = 'https://api.themoviedb.org/3/keyword/keyword_id/movies?include_adult=false&language=en-US&page=1';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzNhY2I0NzdmZDE0NDMzODk5MmQxNWEyZDE5YjQ1YSIsIm5iZiI6MTc1MTg4NzMwMC40MjksInN1YiI6IjY4NmJhZGM0YmJhODViNWJhNDUzZmU4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N1JSAOwckCCQ8aFCkwO3fPsjONcFgqP31fZtqh5b7Ys'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));