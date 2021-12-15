import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";
import {
  Box,
  Grid,
  Typography,
  CardMedia,
  CardActionArea,
  Tabs,
  Tab,
  Stack,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

function MovieList() {
  const [tab, setTab] = useState(0);
  const [showingMovies, setShowingMovies] = useState([]);

  let history = useHistory();

  const getMovies = () => {
    axios.get("http://localhost:8080/api/movie").then((res) => {
      console.log(res);
      setShowingMovies(res.data);
    });
  };

  useEffect(() => {
    getMovies();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const openMovieDetails = (movieId) => {
    history.push("/movie/" + movieId);
  };

  /* const MissingPosterBox = (
    <div>
      <Box width={"756px"} height={"1080px"}></Box>
    </div>
  ); */

  const MovieCard = () => {
    return showingMovies.map((movie, index) => {
      return (
        <Grid
          item
          xs={4}
          sm={3}
          md={2.5}
          sx={{ mb: 1, height: 1 }}
          onClick={() => openMovieDetails(movie.id)}
        >
          <Box
            sx={{
              background: "transparent",
              boxShadow: "none",
              display: "flex",
              alignItems: "center",
              fontSize: 10,
            }}
          >
            <CardActionArea sx={{ borderRadius: 3 }}>
              <CardMedia
                component="img"
                sx={{ width: 1, borderRadius: 3 }}
                image={
                  index === 0
                    ? "./assets/FreeGuy_HKPoster.jpg"
                    : index === 1
                    ? "./assets/SuicideSquad2nd_HKposter.jpg"
                    : index === 2
                    ? "./assets/DUNE_HKPoster.jpg"
                    : ""
                }
                alt={movie.title + " poster"}
              />
              <Stack sx={{ px: 1, mb: 1 }}>
                <Typography variant="h6" component="div">
                  {movie.title}
                </Typography>
                <Stack
                  direction="row"
                  sx={{
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  <Stack direction="row" spacing={0.5}>
                    <StarIcon sx={{ color: "#ffc107" }} />
                    <Typography variant="body1">4.5</Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.5}>
                    <FavoriteIcon sx={{ color: "#e91e63" }} />
                    <Typography variant="body1">50</Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.5}>
                    <CommentIcon sx={{ color: "text.secondary" }} />
                    <Typography variant="body1">20</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </CardActionArea>
          </Box>
        </Grid>
      );
    });
  };

  return (
    <Box>
      <Tabs
        value={tab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="inherit"
        variant="fullWidth"
        sx={{ mb: 2 }}
      >
        <Tab label="Now Showing" />
        <Tab label="Upcoming" />
        <Tab label="Other" />
      </Tabs>

      {/* Now Showing movies */}
      <Box hidden={tab !== 0} sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <MovieCard />
        </Grid>
      </Box>

      {/* Upcoming movies */}
      <Box hidden={tab !== 1}>No movies available.</Box>

      {/* Other movies */}
      <Box hidden={tab !== 2}>No movies available.</Box>
    </Box>
  );
}

export default MovieList;
