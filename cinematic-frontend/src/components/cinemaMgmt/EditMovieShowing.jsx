import { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Autocomplete,
  Box,
  Typography,
  Button,
  TextField,
  Tooltip,
  Stack,
  Divider,
  Grid,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterMoment from "@mui/lab/AdapterMoment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CinemaService from "../../services/CinemaService";
import MovieService from "../../services/MovieService";
import clsx from "clsx";
import moment from 'moment';

function EditMovieShowing() {
  let history = useHistory();
  let { cinemaId, houseId, movieShowingId } = useParams();
  const [cinId, setCinId] = useState(cinemaId);
  const [hseId, setHseId] = useState(houseId);
  const [id, setId] = useState(movieShowingId);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieId, setMovieId] = useState(null);
  const [showtime, setShowtime] = useState(null);
  const [seats, setSeats] = useState([]);

  const getMovieShowingToBeUpdated = useCallback(async () => {
    try {
      const res = await CinemaService.getMovieShowingByHouseId(
        cinId,
        hseId,
        id
      );
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }, [cinId, hseId, id]);

  const getMovies = useCallback(async () => {
    try {
      const res = await MovieService.getMovies();
      console.log(res);
      setMovies(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getMovies();
    if (
      typeof cinemaId !== "undefined" &&
      typeof houseId !== "undefined" &&
      typeof movieShowingId !== "undefined"
    ) {
      getMovieShowingToBeUpdated();
    }
  }, [
    cinemaId,
    houseId,
    movieShowingId,
    getMovieShowingToBeUpdated,
    getMovies,
  ]);

  useEffect(() => {
    console.log(
      "cinId-" +
        cinId +
        " | hseId-" +
        hseId +
        " | id-" +
        id +
        " | movieId-" +
        movieId +
        " | showtime-" +
        showtime
    );
    console.log(seats,moment(showtime).format("YYYY-MM-DDTHH:mm"));
  }, [cinId, hseId, id, movieId, seats, showtime]);

  function getEditedMovieShowing() {
    return {
      showtime: moment(showtime).format("YYYY-MM-DDTHH:mm"),
      movieId: movieId,
    };
  }

  const addMovieShowing = () => {
    try {
      const res = CinemaService.addMovieShowing(
        cinId,
        hseId,
        getEditedMovieShowing()
      );
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  const updateMovieShowing = () => {
    try {
      const res = CinemaService.updateMovieShowing();
    } catch (err) {
      console.error(err);
    }
  };

  const resetMovieShowing = () => {
    getMovieShowingToBeUpdated();
    getMovies();
  };

  const backToMovieShowingMgmt = () => {
    history.push(
      "/cinemaMgmt/" + cinId + "/houseMgmt/" + hseId + "/movieShowingMgmt"
    );
  };

  return (
    <Box>
      <Box>
        <Tooltip title="Back" placement="right" sx={{ mb: 2 }}>
          <Button
            size="small"
            variant="text"
            startIcon={<ArrowBackIcon />}
            onClick={backToMovieShowingMgmt}
          >
            <Typography variant="h6" component="div">
              {id === undefined ? "Create new " : "Update "}Movie Showing
            </Typography>
          </Button>
        </Tooltip>
      </Box>
      <Box>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DateTimePicker
            ampm={false}
            inputFormat='DD-MM-YYYY HH:mm'
            mask="__-__-____ __:__"
            renderInput={(props) => (
              <TextField sx={{ width: 300 }} {...props} />
            )}
            label="Showtime"
            value={showtime}
            onChange={(newValue) => {
              setShowtime(moment(newValue));
            }}
          />
        </LocalizationProvider>
      </Box>
      <Box sx={{ my: 2 }}>
        <Autocomplete
          sx={{ width: 300 }}
          id="movie-for-movie-showing"
          autoHighlight
          value={selectedMovie}
          onChange={(event, option) => {
            if (option !== null) {
              setSelectedMovie(option);
              setMovieId(option.id);
            }
          }}
          options={movies}
          getOptionLabel={(movie) => movie.title}
          renderInput={(params) => <TextField {...params} label="Movie" />}
        />
      </Box>
      <Box sx={{ my: 2 }}>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item xs={6} sm={3}>
            {id === undefined ? (
              <Button
                size="medium"
                variant="outlined"
                fullWidth
                startIcon={<CheckCircleIcon />}
                onClick={addMovieShowing}
                color="success"
              >
                Add Movie Showing
              </Button>
            ) : (
              <Button
                fullWidth
                size="medium"
                variant="outlined"
                startIcon={<CheckCircleIcon />}
                onClick={updateMovieShowing}
                color="success"
              >
                Update Movie Showing
              </Button>
            )}
          </Grid>
          <Grid item xs={6} sm={3}>
            {id !== undefined ? (
              <Button
                fullWidth
                size="medium"
                variant="outlined"
                startIcon={<RestartAltIcon />}
                onClick={resetMovieShowing}
                color="info"
              >
                Reset
              </Button>
            ) : null}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default EditMovieShowing;
