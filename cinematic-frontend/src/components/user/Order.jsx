import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CardMedia,
} from "@mui/material";

import { useState, useEffect, useCallback } from "react";
import OrderService from "../../services/OrderService";
import moment from "moment";

const alphabet = Array.from(Array(26))
  .map((e, i) => i + 65)
  .map((x) => String.fromCharCode(x));

export default function Order() {
  const [order, setOrder] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const res = await OrderService.getOrdersByUserId(
        localStorage.getItem("uid")
      );
      console.log(res);
      setOrder(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const TicketTable = ({ tickets }) => (
    <>
      <Typography
        sx={{ flex: "1 1 100%", pl: 2, mt: 1 }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Tickets
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography>QR Code</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography>Seat</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography>Type</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography>Price (HKD$)</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell component="th" scope="row">
                <CardMedia
                  component="img"
                  image={
                    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&format=svg&data=" +
                    ticket.id
                  }
                  sx={{ width: 80 }}
                  alt={ticket.id}
                />
              </TableCell>
              <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                {ticket.seat.rowStyle === "alphabet"
                  ? alphabet[ticket.seat.row] + " - " + (ticket.seat.column + 1)
                  : ticket.seat.row + 1 + " - " + (ticket.seat.column + 1)}
              </TableCell>
              <TableCell align="right">{ticket.type}</TableCell>
              <TableCell align="right">{ticket.price}</TableCell>
            </TableRow>
          ))}
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell rowSpan={2} />
            <TableCell align="right" colSpan={2}>
              No. of Tickets
            </TableCell>
            <TableCell align="right">{tickets.length}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right" colSpan={2}>
              Total
            </TableCell>
            <TableCell align="right">
              HKD${tickets.map(({ price }) => price).reduce((sum, i) => sum + i, 0)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );

  return (
    <Box>
      <Grid
        container
        spacing={0.5}
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ maxWidth: "700px", mx: "auto", width: "100%" }}
      >
        <Grid item xs={12}>
          <Typography variant="h4">Orders</Typography>
          <Divider sx={{ borderBottomWidth: 5, mb: 1 }} />
        </Grid>

        {order.map((o) => (
          <Grid item xs={12} sx={{ my: 1 }} key={o.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{"#" + o.id}</Typography>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={6}>
                    <Typography>
                      {"Order Time: " +
                        moment(o.orderTime).format("DD-MM-YYYY HH:mm:ss")}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {"Payment Method: " + o.paymentMethod}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {"Cinema: " + o.tickets[0].seat.cinemaName}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {"House: " + o.tickets[0].seat.houseName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      {"Showtime: " +
                        moment(o.tickets[0].seat.movieShowing.showtime).format(
                          "DD-MM-YYYY HH:mm"
                        )}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider variant="middle" />
              <TicketTable tickets={o.tickets} />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
