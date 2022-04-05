import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import moment from "moment";

export default function MovieReviewCard({ movieReview }) {
  return (
    <>
      <Card sx={{ my: 1 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "primary.main" }} aria-label="userAvatar">
              {movieReview.username[0]}
            </Avatar>
          }
          title={
            <>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ fontSize: "18px" }}
              >
                <Typography variant="h6">{movieReview.username}</Typography>
              </Stack>
            </>
          }
          subheader={moment(movieReview.createdTime).fromNow()}
          /* action={
           
          } */
        />
        <CardContent>
          <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="h6">{movieReview.rating} / 5</Typography>
            <StarIcon sx={{ color: "#ffc107", fontSize: "22px", ml: 0.5 }} />
          </Stack>
          <Typography
            variant="body1"
            color="text.primary"
            sx={{ whiteSpace: "pre-line" }}
          >
            {movieReview.comment}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
