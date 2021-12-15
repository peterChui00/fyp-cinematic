import { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

import {
  Box,
  Grid,
  Typography,
  CardMedia,
  CardActionArea,
  Stack,
} from "@mui/material";

function MovieDetail() {
  const [movie, setMovies] = useState(null);

  let { movieId } = useParams();

  const getMovie = useCallback(() => {
    axios.get("http://localhost:8080/api/movie/" + movieId).then((res) => {
      console.log(res);
      const resMovie = res.data;
    });
  }, []);

  useEffect(() => {
    // Determine whether the component is for adding or updating movie
    if (typeof movieId !== "undefined") {
      getMovie();
    } else {
      console.log("Add movie.");
    }
  }, [movieId, getMovie]);

  return <div></div>;
}

export default MovieDetail;
