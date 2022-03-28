import { useState, useContext, useEffect, useCallback } from "react";
import { Context } from "./ResponsiveDrawer";
import { useHistory } from "react-router-dom";
import { Box, Typography, Grid } from "@mui/material";
import CinemaService from "../services/CinemaService";
import axios from "axios";
import MovieService from "../services/MovieService";
import computeDistance from "../services/computeDistance";
import MovieCard from "./movie/MovieCard";

function Home() {
  const globalState = useContext(Context);
  const [cinemas, setCinemas] = useState([]);
  const [recentShowings, setRecentShowings] = useState([]);
  const [showingMovies, setShowingMovies] = useState([]);
  let history = useHistory();
  const fetchData = useCallback(async () => {
    try {
      const [res, res1, res2] = await axios.all([
        CinemaService.getCinemas(),
        CinemaService.getRecentMovieShowing(),
        MovieService.getShowingMovies(),
      ]);
      setRecentShowings(res1.data);
      const moiveIds = [...new Set(res1.data.map((d) => d.movieId))];
      const cinemaIds = [...new Set(res1.data.map((d) => d.cinemaId))];
      console.log(cinemaIds);
      setShowingMovies(
        res2.data.filter((m) => moiveIds.some((moiveId) => moiveId === m.id))
      );
      if (globalState.userLocation !== null) {
        setCinemas(
          res.data
            .filter((c) => cinemaIds.some((cinemaId) => cinemaId === c.id))
            .map((cinema) => {
              return {
                ...cinema,
                distance: computeDistance(
                  cinema.latitude,
                  cinema.longitude,
                  globalState.userLocation.latitude,
                  globalState.userLocation.longitude,
                  "K"
                ),
              };
            })
            .sort((a, b) => a - b)
        );
      }
    } catch (err) {
      console.error(err);
    }
  }, [globalState]);

  useEffect(() => {
    if (
      cinemas.length > 0 &&
      recentShowings.length > 0 &&
      showingMovies.length > 0
    ) {
      console.log("Home cinemas:", cinemas);
      console.log("Home showings:", recentShowings);
      console.log("Home movies:", showingMovies);
    }
  }, [cinemas]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openMovieDetails = (movieId) => {
    history.push("/movie/" + movieId);
  };

  return (
    <Box>
      <Typography variant="h4">Movies Showing Soon Near You</Typography>
      <Typography variant="subtitle1" sx={{ my: 1 }}>
        {globalState.userLocation !== null
          ? cinemas.length > 0
            ? globalState.userLocation.latitude +
              ", " +
              globalState.userLocation.longitude
            : ""
          : "Share your location to receive the promotions."}
      </Typography>
      <Typography variant="h5">
        {cinemas.length > 0 ? cinemas[0].name : ""}
      </Typography>
      <Grid
        container
        spacing={1}
        alignItems="stretch"
        justifyContent="space-evenly"
      >
        <MovieCard movies={showingMovies} openMovieDetails={openMovieDetails} />
      </Grid>
    </Box>
  );
}

export default Home;
