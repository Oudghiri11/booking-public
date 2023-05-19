import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import {
  getMovieDetails,
  newBooking,
} from "../../api-helpers.js/api-helpers";

function getYoutubeVideoId(url) {
  const videoId = url.split("v=")[1];
  const ampersandPosition = videoId.indexOf("&");
  if (ampersandPosition !== -1) {
    return videoId.substring(0, ampersandPosition);
  }
  return videoId;
}

const Booking = () => {
  const [movie, setMovie] = useState();
  const [inputs, setInputs] = useState({ seatNumber: "", date: "" });
  const id = useParams().id;
  console.log(id);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    newBooking({ ...inputs, movie: movie._id })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res.movie))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      {movie && (
        <Fragment>
          <Typography
            padding={3}
            fontFamily="fantasy"
            variant="h4"
            fontWeight="bold"
            color="#3f3162"
            textAlign="center"
          >
            Book Tickets Of Movie: {movie.title}
          </Typography>
          <Box display="flex" justifyContent="center">
            <Box
              display="flex"
              flexDirection="column"
              paddingTop={3}
              width="50%"
              marginRight="auto"
            >
              <img
                width="251.484px"
                height="300px"
                src={movie.posterUrl}
                alt={movie.title}
              />
              <Box width="80%" marginTop={3} padding={2}>
                <Typography color="#3f3162">{movie.description}</Typography>
                <Typography color="#3f3162" fontWeight="bold" marginTop={1}>
                  Actors:
                  {movie.actors.map((actor) => " " + actor + " ")}
                </Typography>
                <Typography color="#3f3162" fontWeight="bold" marginTop={1}>
                  Release Date:{" "}
                  {new Date(movie.releaseDate).toDateString()}
                </Typography>
              </Box>
            </Box>
            <Box width="50%" paddingTop={3}>
              <form onSubmit={handleSubmit}>
                <Box
                  padding={5}
                  margin="auto"
                  display="flex"
                  flexDirection="column"
                >
                  <FormLabel>Seat Number</FormLabel>
                  <TextField
                    name="seatNumber"
                    value={inputs.seatNumber}
                    onChange={handleChange}
                    type="number"
                    margin="normal"
                    variant="standard"
                  />
                  <FormLabel>Booking Date</FormLabel>
                  <TextField
                    name="date"
                    type="date"
                    margin="normal"
                    variant="standard"
                    value={inputs.date}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      margin: "auto",
                      bgcolor: "#3f3162",
                      ":hover": {
                        bgcolor: "#6b5b95",
                      },
                    }}
                    size="large"
                  >
                    Book
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
          {movie.trailerUrl && (
            <Box display="flex" justifyContent="center" marginTop={3}>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${getYoutubeVideoId(
                  movie.trailerUrl
                )}`}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Box>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default Booking;