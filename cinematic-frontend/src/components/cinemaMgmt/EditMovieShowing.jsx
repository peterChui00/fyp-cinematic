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
import moment from "moment";
import axios from "axios";

const alphabet = Array.from(Array(26))
  .map((e, i) => i + 65)
  .map((x) => String.fromCharCode(x));

function EditMovieShowing() {
  let history = useHistory();
  let { cinemaId, houseId, movieShowingId } = useParams();
  const [cinId] = useState(cinemaId);
  const [hseId] = useState(houseId);
  const [id] = useState(movieShowingId);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieId, setMovieId] = useState(null);
  const [showtime, setShowtime] = useState(null);
  const [rowStyle, setRowStyle] = useState("alphabet");
  const [seats, setSeats] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const res = await MovieService.getMovies();
      console.log(res);
      setMovies(res.data);

      if (
        typeof cinemaId !== "undefined" &&
        typeof houseId !== "undefined" &&
        typeof movieShowingId !== "undefined"
      ) {
        const [res1, res2] = await axios.all([
          CinemaService.getMovieShowingById(cinId, hseId, id),
          CinemaService.getHouseById(cinId, hseId),
        ]);
        console.log(res1, res2);
        setShowtime(moment(res1.data.showtime));
        setMovieId(res1.data.movieId);
        setSelectedMovie(
          res.data.find((movie) => movie.id === res1.data.movieId)
        );
        setSeats(res1.data.seats);
        setRowStyle(res2.data.rowStyle);
      }
    } catch (err) {
      console.error(err);
    }
  }, [cinId, hseId, id, cinemaId, houseId, movieShowingId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
    console.log(
      seats,
      moment(showtime).format("YYYY-MM-DDTHH:mm"),
      selectedMovie
    );
  }, [cinId, hseId, id, movieId, seats, selectedMovie, showtime]);

  function getEditedMovieShowing() {
    return {
      showtime: moment(showtime).format("YYYY-MM-DDTHH:mm"),
      movieId: movieId,
    };
  }

  const addMovieShowing = async () => {
    try {
      const res = await CinemaService.addMovieShowing(
        cinId,
        hseId,
        getEditedMovieShowing()
      );
      console.log(res);
      backToMovieShowingMgmt();
    } catch (err) {
      console.error(err);
    }
  };

  const updateMovieShowing = async () => {
    try {
      const res = await CinemaService.updateMovieShowing(
        cinemaId,
        houseId,
        id,
        getEditedMovieShowing()
      );
      console.log(res);
      backToMovieShowingMgmt();
    } catch (err) {
      console.error(err);
    }
  };

  const resetMovieShowing = () => {
    fetchData();
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
            inputFormat="DD-MM-YYYY HH:mm"
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

      {typeof cinemaId !== "undefined" &&
        typeof houseId !== "undefined" &&
        typeof movieShowingId !== "undefined" && (
          <Box>
            <Divider sx={{ m: 2 }} />
            <Typography variant="h6" component="div">
              Ticketing
            </Typography>
            <Box>
              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Grid
                  container
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <Box className={clsx("seat")}></Box>
                  </Grid>
                  <Grid item>
                    <Box>Available</Box>
                  </Grid>
                  <Grid item>
                    <Box className={clsx("seat", "occupied")}></Box>
                  </Grid>
                  <Grid item>
                    <Box>Occupied</Box>
                  </Grid>
                  <Grid item>
                    <Box className={clsx("seat", "unavailable")}></Box>
                  </Grid>
                  <Grid item>
                    <Box>Unavailable</Box>
                  </Grid>
                </Grid>
              </Stack>
            </Box>

            <Box
              sx={{
                width: "100%",
                mx: "auto",
                my: 2,
                color: "primary",
                textAlign: "center",
              }}
            >
              <Typography variant="h5">Screen</Typography>
            </Box>

            <Box>
              {seats.map((row, rowIndex) => {
                return (
                  <Stack
                    key={rowIndex}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                  >
                    <Box sx={{ width: "2em", textAlign: "center" }}>
                      {rowStyle === "alphabet"
                        ? alphabet[rowIndex]
                        : rowIndex + 1}
                    </Box>
                    {row.map((seat, seatIndex) => {
                      const isAvailable = !seat.available;
                      const isOccupied = seat.occupied;
                      return (
                        <Box
                          key={seatIndex}
                          className={clsx(
                            "seat",
                            isAvailable && "unavailable",
                            isOccupied && "occupied"
                          )}
                          sx={{ color: "black", textAlign: "center" }}
                        >
                          {seat.column + 1}
                        </Box>
                      );
                    })}
                  </Stack>
                );
              })}
            </Box>
          </Box>
        )}
    </Box>
  );
}

export default EditMovieShowing;
