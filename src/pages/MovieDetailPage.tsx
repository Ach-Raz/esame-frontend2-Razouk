// setup Routes react
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { MovieDetail } from "../types/movie";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Errore nel caricamento del dettaglio movie");
        }
        return res.json();
      })
      .then((data: MovieDetail) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      <Link className="back-link" to="/">
        ← Torna all’elenco
      </Link>
      {loading && <p>Caricamento dettaglio in corso...</p>}
      {error && <p>Errore: {error}</p>}

      {!loading && !error && movie && (
        <article className="detail">
          <div>
            <div className="detail__poster">
              {movie.poster_path ? (
                <img
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.title}
                />
              ) : (
                "Poster"
              )}
            </div>
          </div>

          <div>
            <h1 className="detail__title">{movie.title}</h1>
            {movie.tagline && (
              <p className="detail__tagline">“{movie.tagline}”</p>
            )}

            <ul className="detail__meta">
              <li>Uscita: {movie.release_date || "N/D"}</li>
              <li>
                Durata: {movie.runtime ? `${movie.runtime} min` : "N/D"}
              </li>
              <li>Voto: {movie.vote_average.toFixed(1)}</li>
              <li>Voti: {movie.vote_count.toLocaleString("it-IT")}</li>
              <li>Stato: {movie.status || "N/D"}</li>
              <li>
                Lingua:{" "}
                {movie.original_language
                  ? movie.original_language.toUpperCase()
                  : "N/D"}
              </li>
            </ul>

            {movie.genres.length > 0 && (
              <div className="detail__genres">
                {movie.genres.map((genre) => (
                  <span key={genre.id} className="genre">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <p className="detail__overview-label">Trama</p>
            <p className="detail__overview">
              {movie.overview || "Nessuna trama disponibile."}
            </p>

            {movie.production_companies.length > 0 && (
              <p className="card__meta">
                Produzione:{" "}
                {movie.production_companies
                  .map((company) => company.name)
                  .join(" · ")}
              </p>
            )}
          </div>
        </article>
      )}
    </>
  );
}
