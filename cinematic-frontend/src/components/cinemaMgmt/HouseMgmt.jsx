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
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import RefreshIcon from "@mui/icons-material/Refresh";
import VideocamIcon from "@mui/icons-material/Videocam";
import CinemaService from "../../services/CinemaService";

function HouseMgmt() {
  let history = useHistory();
  let { cinemaId } = useParams();

  const [cinId, setCinId] = useState(cinemaId);
  const [houses, setHouses] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getHousesByCinemaId = useCallback(async () => {
    setLoading(true);
    try {
      const res = await CinemaService.getHousesByCinemaId(cinId);
      console.log(res);
      setHouses(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, [cinId]);

  useEffect(() => {
    console.log("cinemaId:" + cinemaId + " cinId:" + cinId);
    getHousesByCinemaId();
  }, [cinId, cinemaId, getHousesByCinemaId]);

  const deleteHouse = (cinemaId, houseId) => {
    setLoading(true);
    CinemaService.deleteHouse(cinemaId, houseId).then((res) => {
      console.log(res);
      setHouses(houses.filter((house) => house.id !== houseId));
      setLoading(false);
    });
  };

  const addHouse = () => {
    history.push("/cinemaMgmt/" + cinemaId + "/houseMgmt/editHouse");
  };

  const updateHouse = (houseId) => {
    history.push(
      "/cinemaMgmt/" + cinemaId + "/houseMgmt/" + houseId + "/editHouse"
    );
  };

  const backToCinemaMgmt = () => {
    history.push("/cinemaMgmt");
  };

  const showMovieShowings = (houseId) => {
    history.push(
      "/cinemaMgmt/" + cinemaId + "/houseMgmt/" + houseId + "/movieShowingMgmt"
    );
  };

  const HouseRow = () => {
    return houses.map((house, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{house.id}</TableCell>
          <TableCell>{house.name}</TableCell>
          <TableCell>
            <Stack direction="row">
              <Tooltip title="Movie Showings">
                <IconButton
                  color="primary"
                  onClick={() => {
                    showMovieShowings(house.id);
                  }}
                >
                  <VideocamIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Detail">
                <IconButton
                  color="primary"
                  onClick={() => {
                    updateHouse(house.id);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Forever">
                <IconButton
                  color="secondary"
                  onClick={() => deleteHouse(cinemaId, house.id)}
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
            onClick={backToCinemaMgmt}
          >
            <Typography variant="h6" component="div">
              House
            </Typography>
          </Button>
        </Tooltip>
        <Grid item>
          <ButtonGroup sx={{ mb: 1 }}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={addHouse}
            >
              Add House
            </Button>
            <Button
              size="small"
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={() => {
                getHousesByCinemaId(cinId);
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
                <TableCell>Name</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <HouseRow />
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default HouseMgmt;
