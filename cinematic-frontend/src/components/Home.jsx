import { useState, useContext, useEffect, useCallback } from "react";
import { Context } from "../App";
import { useHistory } from "react-router-dom";
import { Box, Typography, Grid, Divider } from "@mui/material";
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
            .filter((c) => c.distance < 10)
            .sort((a, b) => a.distance - b.distance)
        );
      }
    } catch (err) {
      console.error(err);
    }
  }, [globalState]);

  /*  useEffect(() => {
    if (
      cinemas.length > 0 &&
      recentShowings.length > 0 &&
      showingMovies.length > 0
    ) {
      console.log("Home cinemas:", cinemas);
      console.log("Home showings:", recentShowings);
      console.log("Home movies:", showingMovies);
    }
  }, [cinemas]); */

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openMovieDetails = (movieId) => {
    history.push("/movie/" + movieId);
  };

  const PromotionBox = cinemas.map((cinema) => {
    return (
      <Box key={cinema.id}>
        <Divider textAlign="left" sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ my: 1, fontFamily: "Roboto" }}>
            {cinemas.length > 0
              ? cinema.name +
                " - " +
                Math.round(cinema.distance * 10) / 10 +
                " km away"
              : ""}
          </Typography>
        </Divider>
        <Grid
          container
          spacing={1}
          alignItems="stretch"
          justifyContent="flex-start"
        >
          <MovieCard
            movies={showingMovies.filter((sm) =>
              recentShowings
                .filter((rs) => rs.cinemaId === cinema.id)
                .some((frs) => frs.movieId === sm.id)
            )}
            openMovieDetails={openMovieDetails}
          />
        </Grid>
      </Box>
    );
  });

  return (
    <Box>
      <Typography variant="h4">Movies Showing Soon Near You</Typography>

      {globalState.userLocation !== null ? (
        recentShowings.length > 0 ? (
          PromotionBox
        ) : (
          <Typography variant="subtitle1" sx={{ my: 1 }}>
            Sorry! No movies are about to show in cinemas around you in the
            coming hour.
          </Typography>
        )
      ) : (
        <Typography variant="subtitle1" sx={{ my: 1 }}>
          Share your location to receive the promotions.
        </Typography>
      )}
    </Box>
  );
}

export default Home;
