import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Button,
  ButtonGroup,
  Stack,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  IconButton,
  Paper,
  CircularProgress,
  /* useMediaQuery, */
  Tooltip,
} from "@mui/material";
/* import { useTheme } from "@mui/material/styles"; */
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RefreshIcon from "@mui/icons-material/Refresh";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import CinemaService from "../../services/CinemaService";

function CinemaManagement() {
  const [cinemas, setCinemas] = useState([]);
  const [isLoading, setLoading] = useState(true);
  /* const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md")); */

  let history = useHistory();

  const addCinema = () => {
    history.push("/editCinema");
  };

  const getCinemas = async () => {
    try {
      setLoading(true);
      const res = await CinemaService.getCinemas();
      console.log(res);
      console.log(res.data);
      setCinemas(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCinema = (cinemaId) => {
    setLoading(true);
    CinemaService.deleteCinema(cinemaId).then((res) => {
      console.log(res);
      setCinemas(cinemas.filter((cinema) => cinema.id !== cinemaId));
      setLoading(false);
    });
  };

  useEffect(() => {
    getCinemas();
  }, []);

  const updateCinema = (cinemaId) => {
    history.push("/editCinema/" + cinemaId);
  };

  const showHouses = (cinemaId) => {
    history.push("/cinemaMgmt/" + cinemaId + "/houseMgmt");
  };

  const CinemaRow = () => {
    return cinemas.map((cinema, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{cinema.id}</TableCell>
          <TableCell>{cinema.name}</TableCell>
          <TableCell sx={{ whiteSpace: "nowrap" }}>
            {cinema.phoneNumber}
          </TableCell>
          <TableCell>{cinema.address}</TableCell>
          <TableCell>{cinema.latitude + ", " + cinema.longitude}</TableCell>
          <TableCell>
            <Stack direction="row">
              <Tooltip title="Houses">
                <IconButton
                  color="primary"
                  onClick={() => {
                    showHouses(cinema.id);
                  }}
                >
                  <OtherHousesIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Detail">
                <IconButton
                  color="primary"
                  onClick={() => {
                    updateCinema(cinema.id);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Forever">
                <IconButton
                  color="secondary"
                  onClick={() => deleteCinema(cinema.id)}
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
    <Box sx={{ width: "100%" }}>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="space-between"
      >
        <Grid item>
          <Typography variant="h5" gutterBottom component="div">
            Cinema Management
          </Typography>
        </Grid>
        <Grid item>
          <ButtonGroup sx={{ mb: 1 }}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={addCinema}
            >
              Add Cinema
            </Button>
            <Button
              size="small"
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={getCinemas}
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
                <TableCell>Name</TableCell>
                <TableCell>Phone No.</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Location</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <CinemaRow />
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default CinemaManagement;
