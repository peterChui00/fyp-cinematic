import { useEffect, useReducer } from "react";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import {
  Box,
  CardMedia,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import SeatSelection from "./SeatSelection";
import PaymentForm from "./PaymentForm";
import MovieService from "../../services/MovieService";
import CinemaService from "../../services/CinemaService";
import axios from "axios";

const FETCH_DATA = "FETCH_DATA";
const CHANGE_STEP = "CHANGE_STEP";

const initialState = {
  movie: {
    id: "",
    title: "",
    genre: "",
    language: "",
    category: "",
    director: "",
    starring: "",
    distributor: "",
    description: "",
    duration: "",
    posterFileName: "",
    releaseDate: null,
  },
  cinema: null,
  movieShowing: null,
  seat: [],
  selectedSeat: [],
  step: 0,
};

const reducer = (state, action) => {
  const payload = action.payload;
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        movie: payload.movie,
        movieShowing: payload.movieShowing,
        cinema: payload.cinema,
      };
    case CHANGE_STEP:
      return { ...state, step: payload };
    default:
      throw new Error();
  }
};

export default function MovieTicketPurchasing() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { movie, cinema, movieShowing, selectedSeat, step } = state;

  let history = useHistory();
  let { movieId, movieShowingId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (
        typeof movieId !== "undefined" &&
        typeof movieShowingId !== "undefined"
      ) {
        try {
          const [movie_res, ms_res] = await axios.all([
            MovieService.getMovieById(movieId),
            CinemaService.getMovieShowing(movieShowingId),
          ]);
          console.log(movie_res, ms_res);

          const cinema_res = await CinemaService.getCinemaById(
            ms_res.data.cinemaId
          );
          console.log(cinema_res);
          cinema_res.data.houses = cinema_res.data.houses.filter(
            (h) => h.id === ms_res.data.houseId
          );
          dispatch({
            type: FETCH_DATA,
            payload: {
              movie: movie_res.data,
              movieShowing: ms_res.data,
              cinema: cinema_res.data,
            },
          });
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchData();
  }, [movieId, movieShowingId]);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <Box>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={9} sm={2}>
          <CardMedia
            component="img"
            sx={{ width: 1, borderRadius: 3 }}
            image={process.env.PUBLIC_URL + "/assets/" + movie.posterFileName}
            alt={movie.title + " poster"}
          />
        </Grid>
        <Grid item xs={12} sm={5} container>
          <Grid item xs={12} container spacing={2} textAlign={"left"}>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h3">{movie.title}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" sx={{ fontWeight: "Bold" }}>
                Genre
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body2">{movie.genre}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" sx={{ fontWeight: "Bold" }}>
                Release Date
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body2">{movie.releaseDate}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" sx={{ fontWeight: "Bold" }}>
                Duraion
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body2">{movie.duration}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" sx={{ fontWeight: "Bold" }}>
                Category
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body2">{movie.category}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" sx={{ fontWeight: "Bold" }}>
                Language
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body2">{movie.language}</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={5} container>
          <Grid item xs={12} container spacing={2} textAlign={"left"}>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h3"></Typography>
              </Stack>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" sx={{ fontWeight: "Bold" }}>
                Cinema
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="body2">{cinema.name}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" sx={{ fontWeight: "Bold" }}>
                House
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="body2">{"1"}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" sx={{ fontWeight: "Bold" }}>
                Date
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="body2">
                {moment(movieShowing.showtime).format()}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" sx={{ fontWeight: "Bold" }}>
                Time
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="body2">
                {moment(movieShowing.showtime).format()}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" sx={{ fontWeight: "Bold" }}>
                {step === 0 ? "Ticket Type" : "Seat"}
              </Typography>
            </Grid>
            <Grid item xs={9}>
              {step === 0 ? (
                <Typography variant="body2">
                  Adult - HK$65.0
                  <br />
                  Student - HK$55.0
                  <br />
                  Child - HK$55.0
                  <br />
                  Senior - HK$55.0
                </Typography>
              ) : (
                <Typography variant="body2">
                  {selectedSeat.join(", ")}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      {step === 0 ? <SeatSelection /> : step === 1 ? <PaymentForm /> : <Box />}
    </Box>
  );
}
