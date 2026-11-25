import { useEffect, useState } from "react";
import { MovieCard } from "../components/MovieCard";
import type { Movie, MovieSearchResponse } from "../types/movie";

//al Prof, lascio la API key visibile per permetterle di vedere il sito caricato correttamente, altrimenti 

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const LIST_URL = `https://api.themoviedb.org/3/search/movie?query=The%20Lord%20of%20the%20Rings&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`;

export function MovieListPage() {
  const [movies, setMovies] = useState <Movie[]>([]);
  const [loading, setLoading] = useState <boolean>(true);
  const [error, setError] = useState <string | null>(null);

  useEffect(() => {
    fetch(LIST_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Errore nel caricamento dei film, controllare la API KEY");
        }
        return res.json();
      })
      .then((data: MovieSearchResponse) => {
        setMovies(data.results.slice(0, 20));
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="page-title">The Lord of the Ringss</h1>
      <p className="page-sub">
        Risultati fissi da API · query=The Lord of the Rings · page=1 · max 20
        items · senza filtri / paginazione
      </p>

      {loading && <p>Caricamento film in corso...</p>}
      {error && <p>Errore: {error}</p>}

      {!loading && !error && (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}
