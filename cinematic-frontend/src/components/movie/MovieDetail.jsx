import { useEffect, useReducer } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import {
  Box,
  Grid,
  Typography,
  CardMedia,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Tooltip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CommentIcon from "@mui/icons-material/Comment";
import MovieShowingTimetable from "./MovieShowingTimetable";
import MovieService from "../../services/MovieService";
import CinemaService from "../../services/CinemaService";

export const CHANGE_TAB = "CHANGE_TAB";
const FETCH_DATA = "FETCH_DATA";

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
    movieReview: [],
  },
  movieShowing: [],
  dateForTab: [],
  cinema: [],
  tab: 0,
};

const reducer = (state, action) => {
  const payload = action.payload;
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        movie: payload.movie,
        movieReview: payload.movieReview,
        movieShowing: payload.movieShowing,
        dateForTab: [
          ...new Set(
            payload.movieShowing.map((data) =>
              moment(data.showtime).format("YYYY-MM-DD")
            ).sort((a, b) => moment(a) - moment(b))
          ),
        ],
        cinema: payload.cinema,
      };
    case CHANGE_TAB:
      return { ...state, tab: payload };
    default:
      throw new Error();
  }
};

function MovieDetail() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { movie } = state;

  let { movieId } = useParams();
  let history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      if (typeof movieId !== "undefined") {
        try {
          const [res1, res2] = await axios.all([
            MovieService.getMovieDetail(movieId),
            CinemaService.getCinemas(),
          ]);
          console.log(res1, res2);
          const [resData1, resData2] = [res1.data, res2.data];
          dispatch({
            type: FETCH_DATA,
            payload: {
              movie: res1.data.movie,
              movieShowing: resData1.movieShowings,
              cinema: resData2,
            },
          });
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchData();
  }, [movieId]);

  useEffect(() => {
    console.log(state);
  }, [state]);

  const purchaseTicket = (movieId, movieShowingId) => {
    history.push("/movie/" + movieId + "/movieShowing/" + movieShowingId);
  };

  return (
    <Box sx={{ pt: 1 }}>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={9} sm={3}>
          <CardMedia
            component="img"
            sx={{ width: 1, borderRadius: 3, maxWidth: "250px" }}
            image={process.env.PUBLIC_URL + "/assets/" + movie.posterFileName}
            alt={movie.title + " poster"}
          />
        </Grid>
        <Grid item xs={12} sm={9} container>
          <Grid item xs={12} container spacing={1} textAlign={"left"}>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h3">{movie.title}</Typography>

                <IconButton
                  onClick={() => {
                    history.push("/movie/" + movieId + "/movieReview");
                  }}
                >
                  <Tooltip title="Movie Reviews">
                    <CommentIcon />
                  </Tooltip>
                </IconButton>
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
      </Grid>

      {/* More details */}
      <Box sx={{ mt: 2 }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              <Stack direction="row" spacing={4}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "Bold", width: "50px" }}
                >
                  Director
                </Typography>
                <Typography variant="body2">{movie.director}</Typography>
              </Stack>
              <Stack direction="row" spacing={4}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "Bold", width: "50px" }}
                >
                  Starring
                </Typography>
                <Typography variant="body2">{movie.starring}</Typography>
              </Stack>
              <Stack direction="row" spacing={4}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "Bold", width: "50px" }}
                >
                  Distributor
                </Typography>
                <Typography variant="body2">{movie.distributor}</Typography>
              </Stack>
              <Typography
                variant="body2"
                sx={{ fontWeight: "Bold", width: "50px" }}
              >
                Description
              </Typography>
              <Typography variant="body2">{movie.description}</Typography>
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Box>

      <MovieShowingTimetable
        state={state}
        dispatch={dispatch}
        purchaseTicket={purchaseTicket}
      />
    </Box>
  );
}

export default MovieDetail;
