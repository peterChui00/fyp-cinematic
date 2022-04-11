import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import PhoneIcon from "@mui/icons-material/Phone";

export default function CinemaCard({ cinema }) {
  return (
    <>
      <Grid item xs={12} lg={6}>
        <Card>
          <CardActionArea>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ mb: 1 }}
              >
                <Typography variant="h6">{cinema.name}</Typography>
                <Typography variant="h6">
                  {cinema.distance >= 0 && cinema.distance !== 999999
                    ? Math.round(cinema.distance * 10) / 10 + " km"
                    : ""}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                alignItems="stretch"
                sx={{ mb: 1 }}
              >
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
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </>
  );
}
