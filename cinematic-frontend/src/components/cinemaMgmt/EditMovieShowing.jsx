import { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Tooltip,
  Stack,
  Divider,
  Grid,
  InputAdornment,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import AbcIcon from "@mui/icons-material/Abc";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import CinemaService from "../../services/CinemaService";
import clsx from "clsx";

function EditMovieShowing() {
  let history = useHistory();
  let { cinemaId, houseId, movieShowingId } = useParams();
  const [cinId, setCinId] = useState(cinemaId);
  const [hseId, setHseId] = useState(houseId);
  const [id, setId] = useState(movieShowingId);
  const [showtime, setShowtime] = useState("");

  return <Box></Box>;
}

export default EditMovieShowing;
