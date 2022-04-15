import {
  Box,
  Button,
  Tooltip,
  Grid,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MapIcon from "@mui/icons-material/Map";
import PhoneIcon from "@mui/icons-material/Phone";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CinemaService from "../../services/CinemaService";
import axios from "axios";
import CinemaTimetable from "./CinemaTimetable";
import moment from "moment";

export default function CinemaDetail() {
  let { cinemaId } = useParams();
  let history = useHistory();
  const [state, setState] = useState({
    cinema: { name: "", address: "", phoneNumber: "" },
    house: [],
    movieShowing: [],
    dateForTab: [],
    tab: 0,
  });
  const { cinema } = state;

  useEffect(() => {
    const fetchData = async () => {
      if (typeof cinemaId !== "undefined") {
        try {
          const [res1, res2, res3] = await axios.all([
            CinemaService.getCinemaById(cinemaId),
            CinemaService.getHousesByCinemaId(cinemaId),
            CinemaService.getWeeklyMovieShowingsByCinemaId(cinemaId),
          ]);
          /* console.log(res1, res2, res3); */
          const [resData1, resData2, resData3] = [
            res1.data,
            res2.data,
            res3.data,
          ];
          setState({
            ...state,
            cinema: resData1,
            house: resData2,
            movieShowing: resData3,
            dateForTab: [
              ...new Set(
                resData2.reduce(
                  (prev, cur) =>
                    prev.concat(
                      cur.movieShowings.map((data) =>
                        moment(data.showtime).format("YYYY-MM-DD")
                      )
                    ),
                  []
                )
              ),
            ].sort((a, b) => new Date(a) - new Date(b)),
          });
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchData();
  }, [cinemaId]);

  useEffect(() => {
    console.log(state);
  }, [state]);

  const purchaseTicket = (movieId, movieShowingId) => {
    history.push("/movie/" + movieId + "/movieShowing/" + movieShowingId);
  };

  return (
    <Box>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="space-between"
      >
        <Tooltip title="Back" placement="right" sx={{ m: 1 }}>
          <Button
            size="small"
            variant="text"
            startIcon={<ArrowBackIcon />}
            onClick={() => {
              history.push("/cinema");
            }}
          >
            <Typography variant="h6" component="div">
              {cinema.name}
            </Typography>
          </Button>
        </Tooltip>
      </Grid>

      <Box>
        <Stack direction="row" spacing={1} alignItems="stretch" sx={{ mb: 1 }}>
          <Tooltip title="Address">
            <MapIcon />
          </Tooltip>
          <Typography>
            {cinema.address.length > 0 ? cinema.address : "N/A"}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="stretch">
          <Tooltip title="Phone number">
            <PhoneIcon />
          </Tooltip>
          <Typography>
            {cinema.phoneNumber.length > 0 ? cinema.phoneNumber : "N/A"}
          </Typography>
        </Stack>
      </Box>

      <Divider variant="middle" sx={{ my: 2 }} />

      <CinemaTimetable
        state={state}
        setState={setState}
        purchaseTicket={purchaseTicket}
      />
    </Box>
  );
}
