import { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Grid,
  Typography,
  CardMedia,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab,
  IconButton,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CommentIcon from "@mui/icons-material/Comment";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { CardActionArea } from "@mui/material";

function MovieDetail() {
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [genreArray, setGenreArray] = useState([]);
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");
  const [director, setDirector] = useState("");
  const [starring, setStarring] = useState("");
  const [distributor, setDistributor] = useState("");
  const [description, setDescription] = useState("");
  const [releaseDate, setReleaseDate] = useState(null);
  const [duration, setDuration] = useState("");
  const [tab, setTab] = useState(0);

  let { movieId } = useParams();
  let history = useHistory();

  useEffect(() => {
    if (typeof movieId !== "undefined") {
      axios.get("http://localhost:8080/api/movie/" + movieId).then((res) => {
        console.log(res);
        const resMovie = res.data;
        setId(resMovie.id);
        setTitle(resMovie.title);
        setGenre(resMovie.genre);
        setGenreArray(resMovie.genre.split(", "));
        setLanguage(resMovie.language);
        setCategory(resMovie.category);
        setDirector(resMovie.director);
        setStarring(resMovie.starring);
        setDistributor(resMovie.distributor);
        setDescription(resMovie.description);
        setReleaseDate(resMovie.releaseDate);
        setDuration(resMovie.duration);
      });
    } else {
      console.log("ue");
    }
  }, [movieId]);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const purchaseTicket = (movieId, movieShowingId) => {
    history.push("/movie/" + movieId + "/" + movieShowingId);
  };

  return (
    <Box sx={{ pt: 1 }}>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={9} sm={3}>
          <CardMedia
            component="img"
            sx={{ width: 1, borderRadius: 3 }}
            image={process.env.PUBLIC_URL + "/assets/FreeGuy_HKPoster.jpg"}
            alt={title + " poster"}
          />
        </Grid>
        <Grid item xs={12} sm={9} container>
          <Grid
            item
            xs={12}
            container
            spacing={1}
            textAlign={"left"}
          >
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="h3">{title}</Typography>
                <IconButton>
                  <BookmarkBorderIcon />
                </IconButton>
                <IconButton>
                  <CommentIcon />
                </IconButton>
              </Stack>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" sx={{ fontWeight: "Bold" }}>
                Genre
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body2">{genre}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" sx={{ fontWeight: "Bold" }}>
                Release Date
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body2">{releaseDate}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" sx={{ fontWeight: "Bold" }}>
                Duraion
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body2">{duration}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" sx={{ fontWeight: "Bold" }}>
                Category
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body2">{category}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" sx={{ fontWeight: "Bold" }}>
                Language
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body2">{language}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* More details */}
      <Box sx={{ mt: 2 }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              <Stack direction="row" spacing={4}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "Bold", width: "50px" }}
                >
                  Director
                </Typography>
                <Typography variant="body2">{director}</Typography>
              </Stack>
              <Stack direction="row" spacing={4}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "Bold", width: "50px" }}
                >
                  Starring
                </Typography>
                <Typography variant="body2">{starring}</Typography>
              </Stack>
              <Stack direction="row" spacing={4}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "Bold", width: "50px" }}
                >
                  Distributor
                </Typography>
                <Typography variant="body2">{distributor}</Typography>
              </Stack>
              <Typography
                variant="body2"
                sx={{ fontWeight: "Bold", width: "50px" }}
              >
                Description
              </Typography>
              <Typography variant="body2">{description}</Typography>
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Showtime tabs */}
      <Box sx={{ mt: 2, width: "100%", maxWidth: "88vw" }}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label=""
          sx={{ mb: 1, maxWidth: "100%" }}
        >
          <Tab label="17 DEC" />
          <Tab label="18 DEC" />
          <Tab label="19 DEC" />
          <Tab label="20 DEC" />
          <Tab label="21 DEC" />
          <Tab label="22 DEC" />
          <Tab label="23 DEC" />
        </Tabs>
      </Box>

      {/* Showtimes */}
      <Box sx={{ mt: 2, mx: 1 }}>
        <Divider textAlign="left" sx={{ mb: 2 }}>
          XXX Cinema - Chai Wan
        </Divider>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <CardActionArea>
              <Box
                sx={{
                  bgcolor: "success.main",
                  color: "primary.contrastText",
                  py: 2,
                  borderRadius: 2,
                  textAlign: "center",
                }}
                onClick={() => purchaseTicket(id, id)}
              >
                <Typography variant="h3" sx={{ fontSize: "18px" }}>
                  10:30
                  <br />
                  HK$65
                </Typography>
              </Box>
            </CardActionArea>
          </Grid>
          <Grid item xs={3}>
            <CardActionArea>
              <Box
                sx={{
                  bgcolor: "warning.main",
                  color: "primary.contrastText",
                  py: 2,
                  borderRadius: 2,
                  textAlign: "center",
                }}
              >
                <Typography variant="h3" sx={{ fontSize: "18px" }}>
                  10:30
                  <br />
                  HK$65
                </Typography>
              </Box>
            </CardActionArea>
          </Grid>
          <Grid item xs={3}>
            <CardActionArea>
              <Box
                sx={{
                  bgcolor: "error.main",
                  color: "primary.contrastText",
                  py: 2,
                  borderRadius: 2,
                  textAlign: "center",
                }}
              >
                <Typography variant="h3" sx={{ fontSize: "18px" }}>
                  10:30
                  <br />
                  HK$65
                </Typography>
              </Box>
            </CardActionArea>
          </Grid>
        </Grid>
        <Divider textAlign="left" sx={{ my: 2 }}>
          XXX Cinema - Mong Kok
        </Divider>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <CardActionArea>
              <Box
                sx={{
                  bgcolor: "success.main",
                  color: "primary.contrastText",
                  py: 2,
                  borderRadius: 2,
                  textAlign: "center",
                }}
               
              >
                <Typography variant="h3" sx={{ fontSize: "18px" }}>
                  10:30
                  <br />
                  HK$65
                </Typography>
              </Box>
            </CardActionArea>
          </Grid>
          <Grid item xs={3}>
            <CardActionArea>
              <Box
                sx={{
                  bgcolor: "warning.main",
                  color: "primary.contrastText",
                  py: 2,
                  borderRadius: 2,
                  textAlign: "center",
                }}
              >
                <Typography variant="h3" sx={{ fontSize: "18px" }}>
                  10:30
                  <br />
                  HK$65
                </Typography>
              </Box>
            </CardActionArea>
          </Grid>
          <Grid item xs={3}>
            <CardActionArea>
              <Box
                sx={{
                  bgcolor: "error.main",
                  color: "primary.contrastText",
                  py: 2,
                  borderRadius: 2,
                  textAlign: "center",
                }}
              >
                <Typography variant="h3" sx={{ fontSize: "18px" }}>
                  10:30
                  <br />
                  HK$65
                </Typography>
              </Box>
            </CardActionArea>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default MovieDetail;