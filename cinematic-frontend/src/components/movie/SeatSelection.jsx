import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { SELECT_SEAT, CHANGE_STEP } from "./MovieTicketPurchase";
import clsx from "clsx";
import "../styles.css";

const alphabet = Array.from(Array(26))
  .map((e, i) => i + 65)
  .map((x) => String.fromCharCode(x));

export default function SeatSelection({ state, dispatch }) {
  const { movieShowing, house, selectedSeat } = state;
  return (
    <>
      <Typography variant="h5" sx={{ color: "primary.main" }}>
        Select Seat
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item>
            <Box className={clsx("seat")}></Box>
          </Grid>
          <Grid item>
            <Box>Available</Box>
          </Grid>
          <Grid item>
            <Box className={clsx("seat", "occupied")}></Box>
          </Grid>
          <Grid item>
            <Box>Occupied</Box>
          </Grid>
          <Grid item>
            <Box className={clsx("seat", "selected")}></Box>
          </Grid>
          <Grid item>
            <Box>Selected</Box>
          </Grid>
          <Grid item>
            <Box className={clsx("seat", "unavailable")}></Box>
          </Grid>
          <Grid item>
            <Box>Unavailable</Box>
          </Grid>
        </Grid>
      </Stack>
      <Box
        sx={{
          width: "100%",
          mx: "auto",
          my: 2,
          color: "primary",
          textAlign: "center",
        }}
      >
        <Typography variant="h5">Screen</Typography>
      </Box>
      <Box /* sx={{ overflowX: "auto" }} */>
        {movieShowing.seats.map((row, rowIndex) => {
          return (
            <Stack
              key={rowIndex}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Box sx={{ width: "2em", textAlign: "center" }}>
                {house.rowStyle === "alphabet"
                  ? alphabet[rowIndex]
                  : rowIndex + 1}
              </Box>
              {row.map((seat, seatIndex) => {
                const isSelected = selectedSeat.some((ss) => ss.id === seat.id);
                const isAvailable = !seat.available;
                const isOccupied = seat.isOccupied;
                return (
                  <Box
                    key={seatIndex}
                    className={clsx(
                      "seat",
                      isAvailable && "unavailable",
                      isSelected && "selected",
                      isOccupied && "occupied"
                    )}
                    sx={{ color: "black", textAlign: "center" }}
                    onClick={
                      isAvailable
                        ? null
                        : () => {
                            dispatch({ type: SELECT_SEAT, payload: seat });
                          }
                    }
                  >
                    {seat.column + 1}
                  </Box>
                );
              })}
            </Stack>
          );
        })}
      </Box>

      <Grid
        container
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        sx={{ my: 3 }}
      >
        <Grid item xs={12}>
          <Typography variant="subtitle1">
            You have selected {selectedSeat.length} seats.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            size="medium"
            variant="outlined"
            startIcon={<CheckCircleIcon />}
            onClick={() =>
              selectedSeat.length > 0
                ? dispatch({ type: CHANGE_STEP, payload: 1 })
                : null
            }
            color="success"
          >
            Confirm
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
