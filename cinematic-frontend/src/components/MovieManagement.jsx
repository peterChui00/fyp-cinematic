import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

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
      setMovies(movies.filter(movie => movie.id !== id));
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
          <TableCell>{movie.releaseDate}</TableCell>
          <TableCell>{movie.language}</TableCell>
          <TableCell>{movie.category}</TableCell>
          <TableCell>{movie.duration}</TableCell>
          <TableCell>{movie.director}</TableCell>
          <TableCell>{movie.starring}</TableCell>
          <TableCell>{movie.distributor}</TableCell>
          <TableCell>
            <Link to={"/editMovie/" + movie.id}>
              <IconButton color="primary">
                <EditIcon />
              </IconButton>
            </Link>

            <IconButton color="secondary" onClick={() => deleteMovie(movie.id)}>
              <DeleteForeverIcon />
            </IconButton>
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
