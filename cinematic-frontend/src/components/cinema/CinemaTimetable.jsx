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

export default function CinemaTimetable({ state, setState, purchaseTicket }) {
  const { movieShowing, dateForTab, tab } = state;
  const filteredMovieShowings = movieShowing
    .filter((ms) => moment(ms.showtime).isSame(dateForTab[tab], "day"))
    .sort((a, b) => moment(a.showtime) - moment(b.showtime));
  const houseIds = [...new Set(filteredMovieShowings.map((d) => d.houseId))];

  return (
    <>
      {/* ------- Showtime tabs ------- */}
      <Box sx={{ mt: 2, width: "100%", maxWidth: "88vw" }}>
        <Tabs
          value={state.tab}
          onChange={(e, newTab) => setState({ ...state, tab: newTab })}
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
        {houseIds.map((houseId) => {
          return (
            <Box sx={{ my: 2 }} key={houseId}>
              <Divider textAlign="left" sx={{ mb: 2 }}>
                {state.house.find((h) => h.id === houseId).name}
              </Divider>
              <Grid container spacing={1}>
                {filteredMovieShowings
                  .filter((fms) => fms.houseId === houseId)
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
                                {ms.movieTitle}
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
