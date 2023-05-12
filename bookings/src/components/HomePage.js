import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import MovieItem from "./Movies/MovieItem";
import { Link } from "react-router-dom";
import { getAllMovies } from "../api-helpers.js/api-helpers";
import Movies from "./Movies/Movies";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box width="100%" height="100vh" marginTop={2}>
      <Box margin={"auto"} width="80%" height="30vh" padding={2}>
        <img
          src="https://static.cnews.fr/sites/default/files/eiffel_601296a5d5a3f.png"
          alt="Rocketry"
          width="100%"
          height="100%"
        />
      </Box>
      <Box padding={5} margin="auto">
        <Typography variant="h4" textAlign={"center"}>
          Latest Releases
        </Typography>
      </Box>
      <Box
        gap={5}
        width="80%"
        flexWrap="wrap"
        display="flex"
        justifyContent="center">
        { movies && movies.map((movie , index) => (
            <MovieItem id={movie.id} title={movie.title} posterUrl={movie.posterUrl} releaseDate={movie.releaseDate} key={index}
            />
          ))}
      </Box>
      <Box display={"flex"} padding={5} margin="auto">
        <Button
          LinkComponent={Link}
          to="/movies"
          variant="outlined"
          sx={{ margin: "auto", color: "#2b2d42" }}>
          View All Movies
        </Button>
      </Box>
    </Box>
  );
};
export default HomePage;
