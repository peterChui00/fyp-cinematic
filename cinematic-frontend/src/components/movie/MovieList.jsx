import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Grid,
  Tabs,
  Tab,
  Typography,
  Alert,
} from "@mui/material";
import MovieCard from "./MovieCard";
import MovieService from "../../services/MovieService";

function MovieList() {
  const [tab, setTab] = useState(0);
  const [showingMovies, setShowingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [otherMovies, setOtherMovies] = useState([]);
  const [isLoading, setLoading] = useState(true);

  let history = useHistory();

  const getMovies = async (tabValue) => {
    setLoading(true);
    try {
      let res;
      switch (tabValue) {
        case 0:
          res = await MovieService.getShowingMovies();
          setShowingMovies(res.data);
          break;
        case 1:
          res = await MovieService.getUpcomingMovies();
          setUpcomingMovies(res.data);
          break;
        case 2:
          res = await MovieService.getOtherMovies();
          setOtherMovies(res.data);
          break;
        default:
          break;
      }
      console.log(res);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getMovies(0);
  }, []);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    getMovies(newValue);
  };

  const openMovieDetails = (movieId) => {
    history.push("/movie/" + movieId);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs
        value={tab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="inherit"
        variant="fullWidth"
        centered
        sx={{ mb: 2, width: "100%" }}
      >
        <Tab label="Now Showing" />
        <Tab label="Upcoming" />
        <Tab label="Other" />
      </Tabs>

      {isLoading ? (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          {/* Now Showing movies */}
          <Box hidden={tab !== 0}>
            <Grid
              container
              spacing={1}
              alignItems="stretch"
              justifyContent="space-evenly"
            >
              {showingMovies.length > 0 ? (
                <MovieCard
                  movies={showingMovies}
                  openMovieDetails={openMovieDetails}
                />
              ) : (
                <Alert severity="warning" sx={{ my: 2 }}>
                  <Typography>No Available Movies</Typography>
                </Alert>
              )}
            </Grid>
          </Box>

          {/* Upcoming movies */}
          <Box hidden={tab !== 1}>
            <Grid
              container
              spacing={1}
              alignItems="stretch"
              justifyContent="space-evenly"
            >
              {upcomingMovies.length > 0 ? (
                <MovieCard
                  movies={upcomingMovies}
                  openMovieDetails={openMovieDetails}
                />
              ) : (
                <Alert severity="warning" sx={{ my: 2 }}>
                  <Typography>No Available Movies</Typography>
                </Alert>
              )}
            </Grid>
          </Box>

          {/* Other movies */}
          <Box hidden={tab !== 2}>
            <Grid
              container
              spacing={1}
              alignItems="stretch"
              justifyContent="space-evenly"
            >
              {otherMovies.length > 0 ? (
                <MovieCard
                movies={otherMovies}
                openMovieDetails={openMovieDetails}
              />
              ) : (
                <Alert severity="warning" sx={{ my: 2 }}>
                  <Typography>No Available Movies</Typography>
                </Alert>
              )}
            </Grid>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default MovieList;
