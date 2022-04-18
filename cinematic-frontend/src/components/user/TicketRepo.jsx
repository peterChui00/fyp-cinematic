import { useEffect, useState, useCallback } from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import OrderService from "../../services/OrderService";
import TicketCard from "./TicketCard";

export default function TicketRepo() {
  const [ticket, setTicket] = useState([]);

  const fetchData = useCallback(async () => {
    const res = await OrderService.getTicketsByUserId(
      localStorage.getItem("uid")
    );
    setTicket(res.data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Box>
      <Grid
        sx={{ width: "100%" }}
        container
        spacing={0}
        alignItems="center"
        justifyContent="center"
      >
        {ticket
          .sort(
            (a, b) =>
              new Date(b.seat.movieShowing.showtime) -
              new Date(a.seat.movieShowing.showtime)
          )
          .map((t) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TicketCard key={t.id} ticket={t} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
