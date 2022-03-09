import {
  Grid,
  Typography,
  CardMedia,
  CardActionArea,
  Stack,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CommentIcon from "@mui/icons-material/Comment";

export default function MovieCard({ movies, openMovieDetails }) {
  return movies.map((movie, index) => {
    return (
      <Grid
        key={index}
        item
        xs={4}
        sm={3}
        md={2}
        sx={{ mb: 1 }}
        onClick={() => openMovieDetails(movie.id)}
      >
        <CardActionArea sx={{ borderRadius: 3 }}>
          <CardMedia
            component="img"
            sx={{ width: 1, borderRadius: 3 }}
            image={"./assets/" + movie.posterFileName}
            alt={movie.title + " poster"}
          />
          <Stack sx={{ px: 1, mb: 1 }}>
            <Typography variant="h6" component="div">
              {movie.title}
            </Typography>
            <Stack
              direction="row"
              sx={{
                flexWrap: "wrap",
              }}
              spacing={1}
            >
              <Stack direction="row" spacing={0.5} alignItems="center">
                <StarIcon sx={{ color: "#ffc107", fontSize: 15 }} />
                <Typography variant="body1" sx={{ fontSize: 15 }}>
                  {movie.avgRating}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <CommentIcon sx={{ color: "text.secondary", fontSize: 15 }} />
                <Typography variant="body1" sx={{ fontSize: 15 }}>
                  {movie.numOfMovieReviews}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </CardActionArea>
      </Grid>
    );
  });
}
