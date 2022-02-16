import { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";

import {
  Stack,
  Grid,
  Typography,
  Button,
  ButtonGroup,
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  Tooltip,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import RefreshIcon from "@mui/icons-material/Refresh";
import CinemaService from "../../services/CinemaService";

function MovieShowingMgmt() {
  let history = useHistory();
  let { cinemaId, houseId } = useParams();
  const [cinId] = useState(cinemaId);
  const [hseId] = useState(houseId);
  const [movieShowings, setMovieShowings] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getMovieShowingsByHouseId = useCallback(async () => {
    setLoading(true);
    try {
      const res = await CinemaService.getMovieShowingsByHouseId(cinId, hseId);
      console.log(res);
      setMovieShowings(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, [cinId, hseId]);

  useEffect(() => {
    console.log(
      "cinemaId:" +
        cinemaId +
        " cinId:" +
        cinId +
        " houseId:" +
        houseId +
        " hseId:" +
        hseId
    );
    getMovieShowingsByHouseId();
  }, [cinId, cinemaId, getMovieShowingsByHouseId, houseId, hseId]);

  const deleteMovieShowing = async (cinemaId, houseId, movieShowingId) => {
    setLoading(true);
    try {
      const res = await CinemaService.deleteMovieShowing(
        cinemaId,
        houseId,
        movieShowingId
      );
      console.log(res);
      setMovieShowings(
        movieShowings.filter(
          (movieShowing) => movieShowing.id !== movieShowingId
        )
      );
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const addMovieShowing = () => {
    history.push(
      "/cinemaMgmt/" +
        cinemaId +
        "/houseMgmt/" +
        houseId +
        "/MovieShowingMgmt/edit"
    );
  };

  const updateMovieShowing = (movieShowingId) => {
    history.push(
      "/cinemaMgmt/" +
        cinemaId +
        "/houseMgmt/" +
        houseId +
        "/MovieShowingMgmt/" +
        movieShowingId +
        "/edit"
    );
  };

  const backToHouseMgmt = () => {
    history.push("/cinemaMgmt/" + cinemaId + "/houseMgmt");
  };

  const MovieShowingRow = () => {
    return movieShowings.map((movieShowing, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{movieShowing.id}</TableCell>
          <TableCell>{movieShowing.movieTitle}</TableCell>
          <TableCell>{movieShowing.showtime}</TableCell>
          <TableCell>
            <Stack direction="row">
              <Tooltip title="Detail">
                <IconButton
                  color="primary"
                  onClick={() => {
                    updateMovieShowing(movieShowing.id);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Forever">
                <IconButton
                  color="secondary"
                  onClick={() =>
                    deleteMovieShowing(cinemaId, houseId, movieShowing.id)
                  }
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
        <Tooltip title="Back" placement="right" sx={{ m: 2 }}>
          <Button
            size="small"
            variant="text"
            startIcon={<ArrowBackIcon />}
            onClick={backToHouseMgmt}
          >
            <Typography variant="h6" component="div">
              Movie Showing
            </Typography>
          </Button>
        </Tooltip>
        <Grid item>
          <ButtonGroup sx={{ mb: 1 }}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={addMovieShowing}
            >
              Add Movie Showing
            </Button>
            <Button
              size="small"
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={() => {
                getMovieShowingsByHouseId(cinId);
              }}
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
                <TableCell>Movie Title</TableCell>
                <TableCell>Showtime</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <MovieShowingRow />
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default MovieShowingMgmt;
