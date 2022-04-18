import {
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Grid,
  Typography,
} from "@mui/material";
import moment from "moment";

const alphabet = Array.from(Array(26))
  .map((e, i) => i + 65)
  .map((x) => String.fromCharCode(x));

export default function TicketCard({ ticket }) {
  console.log(ticket);
  return (
    <Card sx={{ my: 2, borderRadius: "25px", width: "260px", mx: "auto" }}>
      <CardActionArea>
        {/*  <CardMedia
        component="img"
        image={
          "https://api.qrserver.com/v1/create-qr-code/?size=150x150&format=svg&data=" +
          ticket.id
        }
        sx={{ width: 80 }}
        alt={ticket.id}
      /> */}
        <CardContent>
          <Box
            sx={{
              mb: 2,
              pb: 2,
              borderBottom: "3px solid",
              borderColor: "text.secondary",
            }}
          >
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <Typography variant="h6">CINEMATIC</Typography>
            </Box>

            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12}>
                <Typography>
                  <Box component="b" sx={{ color: "primary.main" }}>
                    {"Movie"}
                  </Box>
                  <br />
                  {ticket.seat.movieShowing.movieTitle}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <Box component="b" sx={{ color: "primary.main" }}>
                    {"Showtime"}
                  </Box>
                  <br />
                  {moment(ticket.seat.movieShowing.showtime).format(
                    "DD-MM-YYYY HH:mm"
                  )}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  <Box component="b" sx={{ color: "primary.main" }}>
                    {"Price"}
                  </Box>
                  <br />
                  HKD${ticket.price}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  <Box component="b" sx={{ color: "primary.main" }}>
                    {"Type"}
                  </Box>
                  <br />
                  {ticket.type}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  <Box component="b" sx={{ color: "primary.main" }}>
                    {"Cinema"}
                  </Box>
                  <br />
                  {ticket.seat.cinemaName}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  <Box component="b" sx={{ color: "primary.main" }}>
                    {"House"}
                  </Box>
                  <br />
                  {ticket.seat.houseName}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Grid container direction="row" spacing={2} alignItems="center">
              <Grid item xs={4}>
                <CardMedia
                  component="img"
                  image={
                    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&format=svg&data=" +
                    ticket.id
                  }
                  sx={{ width: 80 }}
                  alt={ticket.id}
                />
              </Grid>

              <Grid item xs={8} sx={{ textAlign: "center" }}>
                <Typography>
                  <Box component="b" sx={{ color: "primary.main" }}>
                    {"Seat"}
                  </Box>
                  <br />
                  {ticket.seat.rowStyle === "alphabet"
                    ? alphabet[ticket.seat.row] + "-" + (ticket.seat.column + 1)
                    : ticket.seat.row + 1 + "-" + (ticket.seat.column + 1)}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
