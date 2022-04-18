import { useEffect, useState, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Box,
  Grid,
  Typography,
  TextField,
  Tooltip,
  Button,
  Rating,
  useMediaQuery,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import CommentIcon from "@mui/icons-material/Comment";
import StarIcon from "@mui/icons-material/Star";
import MovieService from "../../services/MovieService";
import MovieReviewCard from "./MovieReviewCard";
import axios from "axios";
import moment from "moment";

export default function MovieReview() {
  const [movie, setMovie] = useState({ id: "", title: "" });
  const [movieReview, setMovieReview] = useState([]);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  let { movieId } = useParams();
  let history = useHistory();

  const fetchData = useCallback(async () => {
    if (typeof movieId !== "undefined") {
      try {
        const [res, res1] = await axios.all([
          MovieService.getMovieById(movieId),
          MovieService.getMovieReviewsByMovieId(movieId),
        ]);
        console.log(res, res1);
        setMovie(res.data);
        setMovieReview(res1.data);
      } catch (err) {
        console.error(err);
      }
    }
  }, [movieId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addMovieReview = async () => {
    const movieReview = {
      comment: comment,
      rating: rating,
      createdTime: moment().format("YYYY-MM-DDTHH:mm:ss"),
      userId: localStorage.getItem("uid"),
      username: localStorage.getItem("uname"),
    };
    await MovieService.addMovieReview(movieId, movieReview);
    handleClose();
    fetchData();
  };

  return (
    <Box>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="space-between"
      >
        <Tooltip title="Back" placement="right" sx={{ m: 1 }}>
          <Button
            size="small"
            variant="text"
            startIcon={<ArrowBackIcon />}
            onClick={() => {
              history.push("/movie/" + movieId);
            }}
          >
            <Typography variant="h6" component="div">
              {"Movie Reviews - " + movie.title}
            </Typography>
          </Button>
        </Tooltip>

        {localStorage.getItem("uid") !== null ? (
          <Grid item>
            <Button
              size="small"
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleClickOpen}
            >
              Add Movie Review
            </Button>
          </Grid>
        ) : null}
      </Grid>

      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="space-between"
      >
        <Grid item>
          <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="h6">Reviews: {movieReview.length} </Typography>
            <CommentIcon sx={{ color: "text.secondary", ml: 0.5, mr: 2 }} />
            <Typography variant="h6">Avg. Rating: {movie.avgRating}</Typography>
            <StarIcon sx={{ color: "#ffc107", ml: 0.5, fontSize: "22px" }} />
          </Stack>
        </Grid>
      </Grid>

      <Box>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          sx={{ my: 2 }}
        >
          {movieReview.map((mr) => {
            return (
              <Grid item xs={12}>
                <MovieReviewCard key={mr.id} movieReview={mr} />
              </Grid>
            );
          })}
        </Grid>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle>Review {movie.title}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
          <Typography component="legend">Rating</Typography>
          <Rating
            name="half-rating"
            value={rating}
            precision={0.5}
            size="large"
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Comment"
            multiline
            maxRows={5}
            fullWidth
            variant="standard"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addMovieReview}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
