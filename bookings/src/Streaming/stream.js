import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import "./stream.css";
import Youtube from "react-youtube";

const Stream = () => {
  const API_BASE_URL = "https://api.themoviedb.org/3";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
  const API_KEY = "5e441fb1f18cc51011e1df183cb5ade6"; // Your API key
  const [searchKey, setSearchKey] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [showTrailer, setShowTrailer] = useState(false);

  const fetchMovies = async (searchKey) => {
    try {
      const type = searchKey ? "search" : "discover";
      const response = await axios.get(`${API_BASE_URL}/${type}/movie`, {
        params: {
          api_key: API_KEY,
          query: searchKey,
        },
      });

      setSelectedMovie(response.data.results[0]);
      setMovies(response.data.results);
    } catch (error) {
      console.log("Error fetching movies:", error);
    }
  };

  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${API_BASE_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos",
      },
    });
    return data;
  };

  const selectMovie = async (movie) => {
    const data = await fetchMovie(movie.id);
    setSelectedMovie(data);
    setShowTrailer(false); // Reset showTrailer state when a new movie is selected
  };

  useEffect(() => {
    fetchMovies(searchKey);
  }, [searchKey]);

  const renderMovies = () =>
    movies.map((movie) => (
      <MovieCard key={movie.id} movie={movie} selectMovie={selectMovie} />
    ));

  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };

  const handleTrailerClick = () => {
    setShowTrailer(!showTrailer);
  };

  return (
    <div className="stream">
      <header className="header">
        <div className="header-content max-center">
          <span>Streaming</span>
          <form onSubmit={searchMovies}>
            <input
              type="text"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              placeholder="Search..."
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </header>
      <div
        className="hero"
        style={{
          backgroundImage: selectedMovie.backdrop_path
            ? `url(${IMAGE_BASE_URL}${selectedMovie.backdrop_path})`
            : "none",
        }}
      >
        {selectedMovie && (
          <div className="hero-content max-center">
            {!showTrailer && (
              <>
                <button className="button" onClick={handleTrailerClick}>
                  Watch Trailer
                </button>
                <h1 className="hero-title">{selectedMovie.title}</h1>
                {selectedMovie.overview && (
                  <p className="hero-overview">{selectedMovie.overview}</p>
                )}
              </>
            )}
            {showTrailer &&
              selectedMovie.videos &&
              selectedMovie.videos.results.length > 0 && (
                <Youtube
                  videoId={selectedMovie.videos.results[0].key}
                  opts={{ width: "100%", height: "100%" }}
                />
              )}
          </div>
        )}
      </div>
      <div className="container max-center">{renderMovies()}</div>
    </div>
  );
};

export default Stream;