import React, { useEffect, useReducer } from "react";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import {
  Box,
  Button,
  CardMedia,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SeatSelection from "./SeatSelection";
import PaymentForm from "./PaymentForm";
import MovieService from "../../services/MovieService";
import CinemaService from "../../services/CinemaService";
import OrderService from "../../services/OrderService";
import axios from "axios";

const FETCH_DATA = "FETCH_DATA";
export const SELECT_SEAT = "SELECT_SEAT";
export const CHANGE_STEP = "CHANGE_STEP";
export const ADD_TICKET = "ADD_TICKET";
export const REMOVE_TICKET = "REMOVE_TICKET";
/* export const LOADING = "LOADING"; */
const SUCCESS = "SUCCESS";
const ERROR = "ERROR";
const ADD_ORDER = "ADD_ORDER";

const alphabet = Array.from(Array(26))
  .map((e, i) => i + 65)
  .map((x) => String.fromCharCode(x));

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
  cinema: { id: "", name: "" },
  house: { id: "", name: "" },
  movieShowing: { id: "", showtime: null, seats: [] },
  selectedSeat: [],
  ticketType: [
    { name: "Adult", price: 65, quantity: 0 },
    { name: "Student", price: 55, quantity: 0 },
    { name: "Child", price: 55, quantity: 0 },
    { name: "Senior", price: 55, quantity: 0 },
  ],
  step: 0,
  /*   loading: false,*/
  success: false,
  error: false,
  order: { id: "", orderTime: "" },
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
        house: payload.house,
      };
    case SELECT_SEAT:
      // The seat is selected before
      if (state.selectedSeat.some((ss) => ss.id === payload.id)) {
        return {
          ...state,
          selectedSeat: state.selectedSeat.filter((s) => s.id !== payload.id),
        };
        // The seat is not selected before
      } else {
        return {
          ...state,
          selectedSeat: [
            ...state.selectedSeat,
            {
              id: payload.id,
              row: payload.row,
              column: payload.column,
              available: payload.available,
              occupied: payload.occupied,
            },
          ],
        };
      }
    case CHANGE_STEP:
      return { ...state, step: payload };
    case ADD_TICKET:
      return {
        ...state,
        ticketType: state.ticketType.map((tt) =>
          tt.name === payload.name
            ? { name: tt.name, price: tt.price, quantity: tt.quantity + 1 }
            : tt
        ),
      };
    case REMOVE_TICKET:
      return {
        ...state,
        ticketType: state.ticketType.map((tt) =>
          tt.name === payload.name && tt.quantity > 0
            ? { name: tt.name, price: tt.price, quantity: tt.quantity - 1 }
            : tt
        ),
      };
    /* case LOADING:
      return { ...state, loading: payload };*/
    case SUCCESS:
      return { ...state, success: payload };
    case ERROR:
      return { ...state, error: payload };
    case ADD_ORDER:
      return { ...state, order: payload };
    default:
      throw new Error();
  }
};

export default function MovieTicketPurchase() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    movie,
    cinema,
    house,
    movieShowing,
    selectedSeat,
    step,
    success,
    ticketType,
  } = state;

  let history = useHistory();
  let { movieId, movieShowingId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

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

          const [cinema_res, hse_res] = await axios.all([
            CinemaService.getCinemaById(ms_res.data.cinemaId),
            CinemaService.getHouseById(
              ms_res.data.cinemaId,
              ms_res.data.houseId
            ),
          ]);
          console.log(cinema_res, hse_res);

          dispatch({
            type: FETCH_DATA,
            payload: {
              movie: movie_res.data,
              movieShowing: ms_res.data,
              cinema: cinema_res.data,
              house: hse_res.data,
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

  const backToMovieList = () => {
    history.push("/movie");
  };

  const occupySeats = async () => {
    try {
      const res = await OrderService.occupySeats(selectedSeat);
      console.log(res);
      dispatch({ type: CHANGE_STEP, payload: 1 });
    } catch (err) {
      console.error(err);
    }
  };

  const addOrder = async () => {
    try {
      const requestData = {
        userId: 1,
        orderTime: moment().format("YYYY-MM-DDTHH:mm:ss"),
        seats: selectedSeat,
        ticketTypes: ticketType.filter((tt) => tt.quantity !== 0),
      };
      console.log(requestData);
      const res = await OrderService.addOrder(requestData);
      console.log(res);
      dispatch({ type: ADD_ORDER, payload: res.data });
      dispatch({ type: SUCCESS, payload: true });
    } catch (err) {
      console.error(err);
      dispatch({ type: ERROR, payload: true });
    }
    dispatch({ type: CHANGE_STEP, payload: 2 });
  };

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
              <Typography variant="body2">{house.name}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" sx={{ fontWeight: "Bold" }}>
                Date
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="body2">
                {moment(movieShowing.showtime).format("DD-MM-YYYY")}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" sx={{ fontWeight: "Bold" }}>
                Time
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="body2">
                {moment(movieShowing.showtime).format("HH:mm")}
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
                  {selectedSeat.map((ss, index) => {
                    return (
                      <React.Fragment key={index}>
                        {house.rowStyle === "alphabet"
                          ? alphabet[ss.row]
                          : ss.row + 1}
                        {"-" + (ss.column + 1)}
                        {selectedSeat.length > 1 &&
                        index !== selectedSeat.length - 1
                          ? ", "
                          : ""}
                      </React.Fragment>
                    );
                  })}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      {step === 0 ? (
        <SeatSelection
          state={state}
          dispatch={dispatch}
          occupySeats={occupySeats}
        />
      ) : step === 1 ? (
        <PaymentForm state={state} dispatch={dispatch} addOrder={addOrder} />
      ) : (
        <Box sx={{ mx: "auto", textAlign: "center" }}>
          {success ? (
            <>
              <Stack
                direction={"row"}
                justifyContent="center"
                spacing={1}
                alignItems="center"
              >
                <CheckCircleOutlineIcon fontSize="large" />
                <Typography variant="h4">Successfully ordered.</Typography>
              </Stack>
              <br />
              <Typography variant="h5">Order ID: {state.order.id}</Typography>
              <Typography variant="h5">
                {"Order time: " +
                  moment(state.order.orderTime).format("DD-MM-YYYY HH:mm:ss")}
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h4" color="error">
                ERROR: Transaction failed.
              </Typography>
            </>
          )}

          <Button
            size="medium"
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            color="primary"
            sx={{ m: 3 }}
            onClick={backToMovieList}
          >
            Back to Movie list
          </Button>
        </Box>
      )}
    </Box>
  );
}
