import { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  Tooltip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CinemaService from "../../services/CinemaService";

function EditCinema() {
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  let { cinemaId } = useParams();
  let history = useHistory();

  const getCinemaToBeUpdated = useCallback(() => {
    axios.get("http://localhost:8080/api/cinema/" + id).then((res) => {
      console.log(res);
      const resData = res.data;
      setName(resData.name);
      setPhoneNumber(resData.phoneNumber);
      setAddress(resData.address);
      setLatitude(resData.latitude);
      setLongitude(resData.longitude);
    });
  }, [id]);

  useEffect(() => {
    // Determine whether the component is for adding or updating cinema
    if (typeof cinemaId !== "undefined") {
      setId(cinemaId);
      console.log("Editing cinema: " + id);
      if (id != null) {
        getCinemaToBeUpdated();
      }
    } else {
      console.log("Adding cinema");
    }
  }, [cinemaId, id, getCinemaToBeUpdated]);

  const addCinema = async () => {
    console.log("Add cinema: " + JSON.stringify(getEditedCinema()));
    try {
      const res = await CinemaService.addCinema(getEditedCinema());
      console.log(res);
      backToCinemaMgmt();
    } catch (err) {
      console.error(err);
    }
  };

  const updateCinema = async () => {
    try {
      console.log("Update moive: " + JSON.stringify(getEditedCinema()));
      const res = await CinemaService.updateCinema(id, getEditedCinema());
      console.log(res);
      backToCinemaMgmt();
    } catch (err) {
      console.error(err);
    }
  };

  // *** Helper functions ***

  function getEditedCinema() {
    return {
      name: name,
      phoneNumber: phoneNumber,
      address: address,
      longitude: longitude,
      latitude: latitude,
      username:
        localStorage.getItem("uname") !== null
          ? localStorage.getItem("uname")
          : "",
    };
  }

  const resetForm = () => {
    setName("");
    setPhoneNumber("");
    setAddress("");
    setLatitude("");
    setLongitude("");
  };

  const backToCinemaMgmt = () => {
    history.push("/cinemaMgmt");
  };

  return (
    <Box>
      <Tooltip title="Back" placement="right" sx={{ mb: 2 }}>
        <Button
          size="small"
          variant="text"
          startIcon={<ArrowBackIcon />}
          onClick={backToCinemaMgmt}
        >
          <Typography variant="h6" component="div">
            {id === null ? "Create new " : "Update "}Cinema
          </Typography>
        </Button>
      </Tooltip>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            label="Name"
            variant="standard"
            autoFocus
            fullWidth
            value={name || ""}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="phone_number"
            label="Phone Number"
            variant="standard"
            fullWidth
            value={phoneNumber || ""}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            label="Address"
            variant="standard"
            fullWidth
            value={address || ""}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="latitude"
            label="Latitude"
            variant="standard"
            type="number"
            fullWidth
            helperText="Latitude of the cinema location"
            value={latitude || ""}
            onChange={(e) => {
              setLatitude(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Longitude"
            label="Longitude"
            variant="standard"
            type="number"
            fullWidth
            helperText="Longitude of the cinema location"
            value={longitude || ""}
            onChange={(e) => {
              setLongitude(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          {id == null ? (
            <Button
              fullWidth
              size="medium"
              variant="outlined"
              startIcon={<CheckCircleIcon />}
              onClick={addCinema}
              color="success"
            >
              Add Cinema
            </Button>
          ) : (
            <Button
              fullWidth
              size="medium"
              variant="outlined"
              startIcon={<CheckCircleIcon />}
              onClick={updateCinema}
              color="success"
            >
              Update cinema
            </Button>
          )}
        </Grid>
        <Grid item xs={6} sm={3}>
          {id == null ? (
            <Button
              fullWidth
              size="medium"
              variant="outlined"
              startIcon={<RestartAltIcon />}
              onClick={resetForm}
              color="info"
            >
              Reset
            </Button>
          ) : (
            <Button
              fullWidth
              size="medium"
              variant="outlined"
              startIcon={<RestartAltIcon />}
              onClick={getCinemaToBeUpdated}
              color="info"
            >
              Reset
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default EditCinema;
