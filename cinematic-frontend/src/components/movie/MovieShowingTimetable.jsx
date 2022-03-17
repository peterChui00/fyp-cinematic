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
import React from "react";
import { CHANGE_TAB } from "./MovieDetail";

export default function MovieShowingTimetable({
  state,
  dispatch,
  purchaseTicket,
}) {
  const { cinema, dateForTab } = state;

  const filteredMovieShowings = state.movieShowing
    .filter((ms) => moment(ms.showtime).isSame(dateForTab[state.tab], "day"))
    .sort((a, b) => moment(a.showtime) - moment(b.showtime));
  const cinemaIds = [...new Set(filteredMovieShowings.map((d) => d.cinemaId))];

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
          {dateForTab.map((date, index) => {
            return <Tab label={moment(date).format("D MMM")} key={index} />;
          })}
        </Tabs>
      </Box>

      {/* ------- Showtimes ------- */}
      <Box sx={{ mt: 2, mx: 1 }}>
        {cinemaIds.map((cinemaId) => {
          return (
            <Box sx={{ my: 2 }} key={cinemaId}>
              <Divider textAlign="left" sx={{ mb: 2 }}>
                {cinema.find((c) => c.id === cinemaId).name}
              </Divider>
              <Grid container spacing={1}>
                {filteredMovieShowings
                  .filter((fms) => fms.cinemaId === cinemaId)
                  .map((ms) => {
                    return (
                      <React.Fragment key={ms.id}>
                        <Grid item xs={3}>
                          <CardActionArea>
                            <Box
                              sx={{
                                bgcolor:
                                  ms.occupancyRate >= 0.8
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
                                {
                                  cinema
                                    .find((c) => c.id === cinemaId)
                                    .houses.find((h) => h.id === ms.houseId)
                                    .name
                                }
                                <br />
                                {moment(ms.showtime).format("HH:mm") +
                                  " | HK$65"}
                              </Typography>
                            </Box>
                          </CardActionArea>
                        </Grid>
                      </React.Fragment>
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
