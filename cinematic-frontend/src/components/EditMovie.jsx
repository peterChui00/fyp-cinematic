import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Grid,
  Typography,
  Button,
  ButtonGroup,
  TextField,
  Autocomplete,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterMoment from "@mui/lab/AdapterMoment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const genres = ["Action", "Adventure", "Animation", "Comedy", "Sci-Fi"];
const languages = ["Cantonese", "English", "Japanese"];

function EditMovie() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [genreArray, setGenreArray] = useState([]);
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");
  const [director, setDirector] = useState("");
  const [starring, setStarring] = useState("");
  const [distributor, setDistributor] = useState("");
  const [description, setDescription] = useState("");
  const [releaseDate, setReleaseDate] = useState(null);
  const [duration, setDuration] = useState("");

  let history = useHistory();

  const backToMovieMgmt = () => {
    history.push("/movieMgmt");
  };

  const addMovie = () => {
    let movie = {
      title: title,
      genre: genre,
      language: language,
      category: category,
      director: director,
      starring: starring,
      distributor: distributor,
      description: description,
      releaseDate: releaseDate,
      duration: duration,
    };
    console.log("Add moive: " + JSON.stringify(movie));
    axios
      .post("http://localhost:8080/api/movie", movie)
      .then((res) => {
        console.log(res);
        backToMovieMgmt();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGenreChange = (event, value) => {
    console.log(value);
    setGenreArray(value);
    // Convert genres in the array into one string
    var genreString = "";
    value.forEach((genre) => {
      if (value.indexOf(genre) === 0) {
        genreString += genre;
      } else {
        genreString += ", " + genre;
      }
    });
    console.log(genreString);
    setGenre(genreString);
  };

  const handleLanguageChange = (event, value) => {
    var languageString = "";
    languageString = value;
    console.log(languageString);
    setLanguage(languageString);
  };

  const resetForm = () => {
    setTitle("");
    setGenre("");
    setGenreArray([]);
    setLanguage("");
    setCategory("");
    setDirector("");
    setStarring("");
    setDistributor("");
    setDescription("");
    setReleaseDate(null);
    setDuration("");
  };

  return (
    <Box>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="space-between"
      >
        <Grid item>
          <Typography variant="h5" gutterBottom component="div">
            Movie Management
          </Typography>
        </Grid>
        <Grid item>
          <ButtonGroup sx={{ mb: 1 }}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={backToMovieMgmt}
            >
              Back
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>

      {/* Form for adding new movie */}
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item xs={6}>
          <TextField
            required
            id="title"
            label="Title"
            variant="standard"
            autoFocus
            fullWidth
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </Grid>

        <Grid item xs={6} sm={3}>
          <FormControl fullWidth variant="standard" required>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              value={category}
              label="Category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <MenuItem value={"I"}>I</MenuItem>
              <MenuItem value={"IIA"}>IIA</MenuItem>
              <MenuItem value={"IIB"}>IIB</MenuItem>
              <MenuItem value={"III"}>III</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Duation"
            id="duration"
            type="number"
            value={duration}
            onChange={(e) => {
              setDuration(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">min(s)</InputAdornment>
              ),
              inputMode: "numeric",
              pattern: "[0-9]*",
              min: 1,
            }}
            required
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
            multiple
            id="genre"
            options={genres}
            value={genreArray}
            onChange={handleGenreChange}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Genre(s)"
                required
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            id="language"
            freeSolo
            disableClearable
            options={languages}
            value={language}
            onChange={handleLanguageChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Language"
                variant="standard"
                required
                onChange={(event) => {
                  console.log(event.target.value);
                  setLanguage(event.target.value);
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              variant="standard"
              inputFormat="DD-MM-yyyy"
              mask="__-__-____"
              label="Release Date"
              value={releaseDate}
              onChange={(newDate) => {
                setReleaseDate(newDate);
              }}
              renderInput={(params) => (
                <TextField variant="standard" fullWidth {...params} />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="director"
            label="Director"
            variant="standard"
            fullWidth
            value={director}
            onChange={(e) => {
              setDirector(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="starring"
            label="Starring"
            variant="standard"
            fullWidth
            value={starring}
            onChange={(e) => {
              setStarring(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="distributor"
            label="Distributor"
            variant="standard"
            fullWidth
            value={distributor}
            onChange={(e) => {
              setDistributor(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="description"
            label="Description"
            variant="standard"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button
            fullWidth
            size="medium"
            variant="outlined"
            startIcon={<CheckCircleIcon />}
            onClick={addMovie}
            color="success"
          >
            Add movie
          </Button>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button
            fullWidth
            size="medium"
            variant="outlined"
            startIcon={<RestartAltIcon />}
            onClick={resetForm}
            color="success"
          >
            Reset
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EditMovie;
