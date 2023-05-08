import React, { useEffect, useState } from "react";
import { AppBar, Autocomplete, Box, Tab, Tabs, Toolbar } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { TextField } from "@mui/material";
import { getAllMovies } from "../api-helpers.js/api-helpers";
import { Link } from "react-router-dom";

const dummyArray = ["eMemory", "Bramash"];
const Header = () => {
  const [value, setValue] = useState(0);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>
        <Box width={"20%"}>
          <MovieIcon />
        </Box>
        <Box width={"30%"} margin={"auto"}>
          <Autocomplete
            freeSolo
            options={movies && movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                sx={{
                  borderRadius: 2,
                  input: { color: "white" },
                  bgcolor: "#2b2d42",
                  padding: "6px",
                }}
                variant="standard"
                {...params}
                placeholder="Search Across Movies"
              />
            )}
          />
        </Box>
        <Box display="flex">
          <Tabs
            textColor="inherit"
            indicatorColor="secondary"
            value={value}
            onChange={(e, val) => setValue(val)}>
            <Tab LinkComponent={Link} to="/movies" label="Movies" />
            <Tab LinkComponent={Link} to="/Auth" label="Auth"></Tab>
            <Tab LinkComponent={Link} to="/Admin" label="Admin"></Tab>
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
