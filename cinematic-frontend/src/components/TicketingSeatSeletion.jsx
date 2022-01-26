import { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Grid,
  Typography,
  CardMedia,
  Stack,
  IconButton,
  Divider,
  Button,
  TextField,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CancelIcon from "@mui/icons-material/Cancel";
import { CardActionArea } from "@mui/material";
import clsx from "clsx";
import "./styles.css";

const movies = [
  {
    name: "Avenger",
    price: 10,
    occupied: [20, 21, 30, 1, 2, 8],
  },
  {
    name: "Joker",
    price: 12,
    occupied: [9, 41, 35, 11, 65, 26],
  },
  {
    name: "Toy story",
    price: 8,
    occupied: [37, 25, 44, 13, 2, 3],
  },
  {
    name: "the lion king",
    price: 9,
    occupied: [10, 12, 50, 33, 28, 47],
  },
];

function TicketingSeatSeletion() {
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [genreArray, setGenreArray] = useState([]);
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");
  const [releaseDate, setReleaseDate] = useState(null);
  const [duration, setDuration] = useState("");

  const [selectedMovie, setSelectedMovie] = useState(movies[0]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [step, setStep] = useState(0);
  const [adultTicket, setAdultTicket] = useState(0);
  const [studentTicket, setStudentTicket] = useState(0);
  const [childTicket, setChildTicket] = useState(0);
  const [seniorTicket, setSeniorTicket] = useState(0);

  let { movieId, movieShowingId } = useParams();
  let history = useHistory();

  useEffect(() => {
    if (typeof movieId !== "undefined") {
      axios.get("http://localhost:8080/api/movie/" + movieId).then((res) => {
        console.log(res);
        const resMovie = res.data;
        setId(resMovie.id);
        setTitle(resMovie.title);
        setGenre(resMovie.genre);
        setGenreArray(resMovie.genre.split(", "));
        setLanguage(resMovie.language);
        setCategory(resMovie.category);
        setReleaseDate(resMovie.releaseDate);
        setDuration(resMovie.duration);
      });
    } else {
      console.log("ue");
    }
  }, [movieId]);

  const confirmSeat = (movieShowingId, seats) => {
    setStep(step + 1);
  };

  const seats = Array.from({ length: 8 * 8 }, (_, i) => i);

  function Movies({ movie, onChange }) {
    return (
      <div className="Movies">
        <label htmlFor="movie">Pick a movie</label>
        <select
          id="movie"
          value={movie.name}
          onChange={(e) => {
            onChange(movies.find((movie) => movie.name === e.target.value));
          }}
        >
          {movies.map((movie) => (
            <option key={movie.name} value={movie.name}>
              {movie.name} (${movie.price})
            </option>
          ))}
        </select>
      </div>
    );
  }

  function ShowCase() {
    return (
      <ul className="ShowCase">
        <li>
          <span className="seat" /> <small>Available</small>
        </li>
        <li>
          <span className="seat selected" /> <small>Selected</small>
        </li>
        <li>
          <span className="seat occupied" /> <small>Occupied</small>
        </li>
      </ul>
    );
  }

  function Cinema({ movie, selectedSeats, onSelectedSeatsChange }) {
    function handleSelectedState(seat) {
      const isSelected = selectedSeats.includes(seat);
      if (isSelected) {
        onSelectedSeatsChange(
          selectedSeats.filter((selectedSeat) => selectedSeat !== seat)
        );
      } else {
        onSelectedSeatsChange([...selectedSeats, seat]);
      }
    }

    return (
      <div className="Cinema">
        <div className="screen" />

        <div className="seats">
          {seats.map((seat) => {
            const isSelected = selectedSeats.includes(seat);
            const isOccupied = movie.occupied.includes(seat);
            return (
              <span
                tabIndex="0"
                key={seat}
                className={clsx(
                  "seat",
                  isSelected && "selected",
                  isOccupied && "occupied"
                )}
                onClick={isOccupied ? null : () => handleSelectedState(seat)}
                onKeyPress={
                  isOccupied
                    ? null
                    : (e) => {
                        if (e.key === "Enter") {
                          handleSelectedState(seat);
                        }
                      }
                }
              ></span>
            );
          })}
        </div>
      </div>
    );
  }

  const SeatPlan = () => (
    <Box sx={{ mb: 2 }} >
      <div className="SeatPlan">
        
          <ShowCase />
          <Cinema
            movie={selectedMovie}
            selectedSeats={selectedSeats}
            onSelectedSeatsChange={(selectedSeats) =>
              setSelectedSeats(selectedSeats)
            }
          />
    

        <p className="info">
          You have selected{" "}
          <span className="count">{selectedSeats.length}</span> seats.
        </p>
      </div>
      <Button
        size="medium"
        variant="outlined"
        startIcon={<CheckCircleIcon />}
        onClick={() => confirmSeat(movieShowingId, selectedSeats)}
        color="success"
      >
        Confirm
      </Button>
    </Box>
  );

  const addTicket = (ticketType) => {
    if (
      adultTicket + studentTicket + childTicket + seniorTicket !==
      selectedSeats.length
    ) {
      switch (ticketType) {
        case "adult":
          setAdultTicket(adultTicket + 1);
          break;
        case "student":
          setStudentTicket(studentTicket + 1);
          break;
        case "child":
          setChildTicket(childTicket + 1);
          break;
        case "senior":
          setSeniorTicket(seniorTicket + 1);
          break;
        default:
          break;
      }
    }
  };

  const removeTicket = (ticketType) => {
    if (adultTicket + studentTicket + childTicket + seniorTicket !== 0) {
      switch (ticketType) {
        case "adult":
          if (adultTicket !== 0) {
            setAdultTicket(adultTicket - 1);
          }
          break;
        case "student":
          if (studentTicket !== 0) {
            setStudentTicket(studentTicket - 1);
          }
          break;
        case "child":
          if (childTicket !== 0) {
            setChildTicket(childTicket - 1);
          }
          break;
        case "senior":
          if (seniorTicket !== 0) {
            setSeniorTicket(seniorTicket - 1);
          }
          break;
        default:
          break;
      }
    }
  };

  const Payment = () => (
    <Box sx={{ px: 1, mb: 2 }}>
      <Typography
        variant="body2"
        gutterBottom
        sx={{ ml: "auto", textAlign: "right" }}
      >
        Time remaining: 10:00
      </Typography>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <Grid container spacing={3} justifyItems={"center"}>
        <Grid item xs={6}>
          <Typography>Adult - HK$65.0</Typography>
        </Grid>
        <Grid item xs={6}>
          <IconButton onClick={() => addTicket("adult")}>
            <AddIcon />
          </IconButton>
          {adultTicket}
          <IconButton onClick={() => removeTicket("adult")}>
            <RemoveIcon />
          </IconButton>
        </Grid>
        <Grid item xs={6}>
          <Typography>Student - HK$55.0</Typography>
        </Grid>
        <Grid item xs={6}>
          <IconButton onClick={() => addTicket("student")}>
            <AddIcon />
          </IconButton>
          {studentTicket}
          <IconButton onClick={() => removeTicket("student")}>
            <RemoveIcon />
          </IconButton>
        </Grid>
        <Grid item xs={6}>
          <Typography>Child - HK$55.0</Typography>
        </Grid>
        <Grid item xs={6}>
          <IconButton onClick={() => addTicket("child")}>
            <AddIcon />
          </IconButton>
          {childTicket}
          <IconButton onClick={() => removeTicket("child")}>
            <RemoveIcon />
          </IconButton>
        </Grid>
        <Grid item xs={6}>
          <Typography>Senior - HK$55.0</Typography>
        </Grid>
        <Grid item xs={6}>
          <IconButton onClick={() => addTicket("senior")}>
            <AddIcon />
          </IconButton>
          {seniorTicket}
          <IconButton onClick={() => removeTicket("senior")}>
            <RemoveIcon />
          </IconButton>
        </Grid>

        <Grid item xs={12}>
          <Divider variant="middle" />
        </Grid>
        <Grid item xs={6}>
          <Typography>Seat: {selectedSeats.join(", ")}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Stack direction="row" spacing={1} justifyContent="center">
            <Typography>Total tickets: </Typography>
            <Typography>
              {adultTicket + studentTicket + childTicket + seniorTicket}
            </Typography>
          </Stack>

          <Typography>
            Total: HK$
            {(adultTicket + studentTicket + childTicket + seniorTicket) * 55 +
              10 * adultTicket}
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Payment
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            size="medium"
            variant="outlined"
            startIcon={<CheckCircleIcon />}
            onClick={() => confirmSeat(movieShowingId, selectedSeats)}
            color="success"
          >
            Confirm
          </Button>
          <Button
            size="medium"
            variant="outlined"
            startIcon={<RestartAltIcon />}
            color="info"
            sx={{ ml: 1 }}
          >
            Reset
          </Button>
          <Button
            size="medium"
            variant="outlined"
            startIcon={<CancelIcon />}
            color="error"
            sx={{ ml: 1 }}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Box>
  );

  const backToMovieList = () => {
    history.push("/movie");
  };

  const Complete = () => (
    <Box>
      <Stack
        direction={"row"}
        justifyContent="center"
        spacing={1}
        alignItems="center"
      >
        <CheckCircleOutlineIcon fontSize="large" />
        <Typography variant="h4">Successfully ordered.</Typography>
      </Stack>
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
  );

  return (
    <Box sx={{ pt: 1, textAlign: "center" }}>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={9} sm={2}>
          <CardMedia
            component="img"
            sx={{ width: 1, borderRadius: 3 }}
            image={process.env.PUBLIC_URL + "/assets/FreeGuy_HKPoster.jpg"}
            alt={title + " poster"}
          />
        </Grid>
        <Grid item xs={12} sm={5} container>
          <Grid item xs={12} container spacing={2} textAlign={"left"}>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h3">{title}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" sx={{ fontWeight: "Bold" }}>
                Genre
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body2">{genre}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" sx={{ fontWeight: "Bold" }}>
                Release Date
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body2">{releaseDate}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" sx={{ fontWeight: "Bold" }}>
                Duraion
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body2">{duration}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" sx={{ fontWeight: "Bold" }}>
                Category
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body2">{category}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" sx={{ fontWeight: "Bold" }}>
                Language
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body2">{language}</Typography>
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
              <Typography variant="body2">{"XXX Cinema - Chai Wan"}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" sx={{ fontWeight: "Bold" }}>
                House No.
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
              <Typography variant="body2">{"17 December 2021"}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" sx={{ fontWeight: "Bold" }}>
                Time
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="body2">{"10:30"}</Typography>
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
                  {selectedSeats.join(", ")}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />
      {/*  */}
      {step === 0 ? <SeatPlan /> : step === 1 ? <Payment /> : <Complete />}
    </Box>
  );
}

export default TicketingSeatSeletion;
