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
import CommentIcon from "@mui/icons-material/Comment";

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

  const MovieCard = () => {
    return showingMovies.map((movie, index) => {
      return (
        <Grid
          key={index}
          item
          xs={4}
          sm={3}
          md={2}
          sx={{ mb: 1 }}
          onClick={() => openMovieDetails(movie.id)}
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
                }}
                spacing={1}
              >
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <StarIcon sx={{ color: "#ffc107", fontSize: 15 }} />
                  <Typography variant="body1" sx={{ fontSize: 15 }}>
                    4.5
                  </Typography>
                </Stack>
                {/*  <Stack direction="row" spacing={0.5}>
                  <FavoriteIcon sx={{ color: "#e91e63", fontSize: 15 }} />
                  <Typography variant="body1" sx={{ fontSize: 15 }}>50</Typography>
                </Stack> */}
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <CommentIcon sx={{ color: "text.secondary", fontSize: 15 }} />
                  <Typography variant="body1" sx={{ fontSize: 15 }}>
                    20
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </CardActionArea>
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
        allowScrollButtonsMobile
        sx={{ mb: 2, width: "100%" }}
      >
        <Tab label="Now Showing" />
        <Tab label="Upcoming" />
        <Tab label="Other" />
      </Tabs>

      {/* Now Showing movies */}
      <Box hidden={tab !== 0} sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={1}
          alignItems="stretch"
          justifyContent="space-evenly"
        >
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
