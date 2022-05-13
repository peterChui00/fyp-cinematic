import { useEffect, useCallback, useState, useContext } from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CinemaService from "../../services/CinemaService";
import CinemaCard from "./CinemaCard";
import { Context } from "../../App";
import computeDistance from "../../services/computeDistance";

export default function CinemaList() {
  const globalState = useContext(Context);
  const [cinemas, setCinemas] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await CinemaService.getCinemas();
      /* console.log(res); */
      if (globalState.userLocation !== null) {
        setCinemas(
          res.data
            .map((c) => {
              return {
                ...c,
                distance:
                  c.latitude !== null && c.longitude !== null
                    ? computeDistance(
                        c.latitude,
                        c.longitude,
                        globalState.userLocation.latitude,
                        globalState.userLocation.longitude,
                        "K"
                      )
                    : 999999,
              };
            })
            .sort((a, b) => a.distance - b.distance)
        );
      } else {
        setCinemas(res.data.map((c) => ({ ...c, distance: 999999 })));
      }
    } catch (err) {
      console.error(err);
    }
  }, [globalState]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="space-between"
        sx={{ mb: 1 }}
      >
        <Grid item>
          <Typography variant="h5">Cinema</Typography>
        </Grid>
      </Grid>

      <Grid container spacing={1.5} alignItems="center">
        {cinemas.map((c) => (
          <CinemaCard cinema={c} key={c.id} />
        ))}
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        severity="error"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        <Alert onClose={handleClose} severity="error">
          Geolocation permission is denied{" "}
        </Alert>
      </Snackbar>
    </Box>
  );
}
