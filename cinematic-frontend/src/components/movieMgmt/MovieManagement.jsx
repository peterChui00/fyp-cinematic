import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import {
  Stack,
  Grid,
  Typography,
  Button,
  ButtonGroup,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  Tooltip,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";

function MovieManagement() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(true);

  let history = useHistory();

  const getMovies = () => {
    setLoading(true);
    axios.get("http://localhost:8080/api/movie").then((res) => {
      console.log(res);
      setMovies(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getMovies();
  }, []);

  function deleteMovie(id) {
    setLoading(true);
    axios.delete("http://localhost:8080/api/movie/" + id).then((res) => {
      console.log(res);
      setMovies(movies.filter((movie) => movie.id !== id));
      setLoading(false);
    });
  }

  const addMovie = () => {
    history.push("/editMovie");
  };

  const MovieRow = () => {
    return movies.map((movie, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{movie.id}</TableCell>
          <TableCell>{movie.title}</TableCell>
          <TableCell>{movie.genre}</TableCell>
          <TableCell sx={{ whiteSpace: "nowrap" }}>
            {movie.releaseDate}
          </TableCell>
          <TableCell>{movie.language}</TableCell>
          <TableCell>{movie.category}</TableCell>
          <TableCell>{movie.duration}</TableCell>
          <TableCell>{movie.director}</TableCell>
          <TableCell>{movie.starring}</TableCell>
          <TableCell>{movie.distributor}</TableCell>
          <TableCell>
            <Stack direction="row">
              <Tooltip title="Detail">
                <Link to={"/editMovie/" + movie.id}>
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                </Link>
              </Tooltip>
              <Tooltip title="Delete Forever">
                <IconButton
                  color="secondary"
                  onClick={() => deleteMovie(movie.id)}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </TableCell>
        </TableRow>
      );
    });
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
              startIcon={<AddIcon />}
              onClick={addMovie}
            >
              Add movie
            </Button>
            <Button
              size="small"
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={getMovies}
            >
              Refresh
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>

      {isLoading ? (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Genre</TableCell>
                <TableCell>Release Date</TableCell>
                <TableCell>Language</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Duration (mins)</TableCell>
                <TableCell>Director</TableCell>
                <TableCell>Starring</TableCell>
                <TableCell>Distributor</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <MovieRow />
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default MovieManagement;
