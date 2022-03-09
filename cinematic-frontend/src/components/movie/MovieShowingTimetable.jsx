import {
  Box,
  Grid,
  Typography,
  CardActionArea,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";
import moment from "moment";
import { CHANGE_TAB } from "./MovieDetail";
/* import { useEffect } from "react"; */
export default function MovieShowingTimetable({
  state,
  dispatch,
  purchaseTicket,
}) {
  const filteredMovieShowings = state.movieShowing.filter((ms) =>
    moment(ms.showtime).isSame(state.dateForTab[state.tab], "day")
  );
  const cinemaIds = [...new Set(filteredMovieShowings.map((d) => d.cinemaId))];

  /* useEffect(() => {
    console.log(filteredMovieShowings, cinemaIds);
  }, [filteredMovieShowings, cinemaIds]); */
  return (
    <>
      {/* ------- Showtime tabs ------- */}
      <Box sx={{ mt: 2, width: "100%", maxWidth: "88vw" }}>
        <Tabs
          value={state.tab}
          onChange={(e, newTab) =>
            dispatch({ type: CHANGE_TAB, payload: newTab })
          }
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label=""
          sx={{ mb: 1, maxWidth: "100%" }}
        >
          {state.dateForTab.map((date, index) => {
            return <Tab label={moment(date).format("D MMM")} key={index} />;
          })}
        </Tabs>
      </Box>

      {/* ------- Showtimes ------- */}
      <Box sx={{ mt: 2, mx: 1 }}>
        {cinemaIds.map((cinemaId) => {
          return (
            <Box sx={{ my: 2 }}>
              <Divider textAlign="left" sx={{ mb: 2 }} key={cinemaId}>
                {state.cinema.find((c) => c.id === cinemaId).name}
              </Divider>
              <Grid container spacing={1}>
                {filteredMovieShowings
                  .filter((fms) => fms.cinemaId === cinemaId)
                  .map((ms) => {
                    return (
                      <>
                        <Grid item xs={3}>
                          <CardActionArea>
                            <Box
                              sx={{
                                bgcolor:
                                  ms.occupancyRate >= 0.9
                                    ? "error.main"
                                    : ms.occupancyRate >= 0.7
                                    ? "warning.main"
                                    : "success.main",
                                color: "primary.contrastText",
                                py: 2,
                                borderRadius: 2,
                                textAlign: "center",
                              }}
                              onClick={() => purchaseTicket(ms.movieId, ms.id)}
                            >
                              <Typography
                                variant="h3"
                                sx={{ fontSize: "18px" }}
                              >
                                {moment(ms.showtime).format("HH:mm") +
                                  "\nHK$65"}
                              </Typography>
                            </Box>
                          </CardActionArea>
                        </Grid>
                      </>
                    );
                  })}
              </Grid>
            </Box>
          );
        })}
      </Box>
    </>
  );
}
