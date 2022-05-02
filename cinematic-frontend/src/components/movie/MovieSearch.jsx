import { useMemo, useEffect, useState, useCallback } from "react";
import { Box, Grid, Alert, AlertTitle } from "@mui/material";
import { useLocation, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";
import MovieService from "../../services/MovieService";

// Custom hook to parse the query parameters in the url
function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function MovieSearch() {
  let query = useQuery();
  let history = useHistory();
  const [movie, setMovie] = useState([]);

  const searchMovie = useCallback(async () => {
    if (query.get("search_query").length > 0) {
      const res = await MovieService.searchMovie(
        "search_query=" + query.get("search_query")
      );
      setMovie(res.data);
    }
  }, [query]);

  useEffect(() => {
    searchMovie();
  }, [searchMovie]);

  const openMovieDetails = (movieId) => {
    history.push("/movie/" + movieId);
  };

  return (
    <Box>
      <Grid container spacing={1} alignItems="stretch" justifyContent="center">
        {movie.length > 0 ? (
          <MovieCard movies={movie} openMovieDetails={openMovieDetails} />
        ) : (
          <Alert severity="warning" sx={{ my: 2 }}>
            <AlertTitle>Results Not Found</AlertTitle>
            Try to use other keywords to search moives
          </Alert>
        )}
      </Grid>
    </Box>
  );
}
