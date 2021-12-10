import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
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
import AddBoxIcon from "@mui/icons-material/AddBox";
import axios from "axios";

function MovieManagement() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getMovies = () => {
    const res = axios.get("http://localhost:8080/api/movie").then((res) => {
      console.log(res);
      setMovies(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getMovies();
  }, []);

  const Movies = () => {
    return movies.map((movie, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{movie.id}</TableCell>
          <TableCell>{movie.title}</TableCell>
          <TableCell>{movie.genre}</TableCell>
          <TableCell>{movie.language}</TableCell>
          <TableCell>{movie.category}</TableCell>
          <TableCell>{movie.director}</TableCell>
          <TableCell>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
            <IconButton color="secondary">
              <DeleteForeverIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <Box>
      <h2>Movie Management</h2>

      <Button variant="outlined" startIcon={<AddBoxIcon />} sx={{ mb: 2 }}>
        New movie
      </Button>

      {isLoading ? (
        <CircularProgress sx={{ mx: "auto", width: 200 }} />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Genre</TableCell>
                <TableCell>Language</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Director</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <Movies></Movies>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default MovieManagement;
