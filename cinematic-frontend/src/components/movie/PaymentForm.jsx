import React from "react";
import {
  ADD_TICKET,
  REMOVE_TICKET,
  ERROR,
  /*   LOADING,
  SUCCESS, */
} from "./MovieTicketPurchase";
import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  IconButton,
  Chip,
  /*   Backdrop,
  CircularProgress, */
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AlarmIcon from "@mui/icons-material/Alarm";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveIcon from "@mui/icons-material/Remove";
import Countdown from "react-countdown";
import moment from "moment";
import { useHistory, useParams } from "react-router-dom";

export default function PaymentForm({ state, dispatch, addOrder, releaseSeats}) {
  const { selectedSeat, ticketType /* , loading */ } = state;

  const getTotalTicket = () =>
    ticketType.reduce((prev, cur) => prev + cur.quantity, 0);

  const getOrderTotal = () =>
    ticketType.reduce((prev, cur) => prev + cur.quantity * cur.price, 0);

  let history = useHistory();
  let { movieId } = useParams();

  const confirmPurchse = () => {
    /*   dispatch({ type: LOADING, payload: true }); */
    if (getTotalTicket() === selectedSeat.length) {
      addOrder();
    }
  };

  const cancelPurchase = () => {
    releaseSeats();
    history.push("/movie/" + movieId);
  };

  // Countdown timer renderer
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      console.log("Time up");
      dispatch({ type: ERROR, payload: true });
      return "Time up!";
    } else {
      // Render a countdown
      return (
        <span>
          Time Remaining {minutes < 10 ? "0" + minutes : minutes}:
          {seconds < 10 ? "0" + seconds : seconds}
        </span>
      );
    }
  };

  return (
    <>
      <Chip
        icon={<AlarmIcon />}
        label={
          <Countdown
            date={moment(Date.now()).add(10, "m").toDate()}
            renderer={renderer}
          />
        }
        variant="outlined"
        color="warning"
        sx={{ fontSize: "1rem" }}
      />

      <Typography variant="h5" sx={{ my: 2, color: "primary.main" }}>
        Ticket Types
      </Typography>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
        sx={{ px: 1 }}
      >
        {ticketType.map((type, index) => {
          return (
            <React.Fragment key={index}>
              <Grid item xs={6} sx={{ textAlign: "right" }}>
                <Typography>
                  {type.name} - HK${type.price}
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: "left" }}>
                <IconButton
                  onClick={() =>
                    getTotalTicket() !== selectedSeat.length
                      ? dispatch({ type: ADD_TICKET, payload: type })
                      : null
                  }
                >
                  <AddIcon />
                </IconButton>
                {type.quantity}
                <IconButton
                  onClick={() =>
                    getTotalTicket() > 0 &&
                    ticketType.find((tt) => tt.name === type.name).quantity > 0
                      ? dispatch({ type: REMOVE_TICKET, payload: type })
                      : null
                  }
                >
                  <RemoveIcon />
                </IconButton>
              </Grid>
            </React.Fragment>
          );
        })}
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Box
            sx={{
              width: "300px",
              py: 2,
              mx: "auto",
              borderTop: "medium solid",
            }}
          >
            {"Total: HK$" + getOrderTotal() + " (" + getTotalTicket() + " seat"}
            {getTotalTicket() > 1 ? "s)" : ")"}
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h5" sx={{ mb: 1, color: "primary.main" }}>
        Payment
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "center", mb: 3 }}>
          <Button
            size="medium"
            variant="outlined"
            startIcon={<CheckCircleIcon />}
            onClick={() => {
              confirmPurchse();
            }}
            color="success"
            sx={{ my: 1 }}
          >
            Confirm
          </Button>
          <Button
            size="medium"
            variant="outlined"
            startIcon={<CancelIcon />}
            onClick={() => {
              cancelPurchase();
            }}
            color="error"
            sx={{ ml: 1, my: 1 }}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>

      {/*       <Backdrop open={loading}>
        <CircularProgress />
      </Backdrop> */}
    </>
  );
}
