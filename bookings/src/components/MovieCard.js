import React, { useState } from "react";
import { styled } from "@mui/system";

const MovieCard = ({ movie, selectMovie }) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="movie-card"
      onClick={() => selectMovie(movie)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {movie.poster_path ? (
        <img
          className="movie-cover"
          src={IMAGE_PATH + movie.poster_path}
          alt=""
        />
      ) : (
        <div className="movie-placeholder">No image found</div>
      )}
      <div className="movie-details">
        <h5>{movie.title}</h5>
        {isHovered && <p className="movie-description">{movie.overview}</p>}
      </div>
    </div>
  );
};

export default MovieCard;
