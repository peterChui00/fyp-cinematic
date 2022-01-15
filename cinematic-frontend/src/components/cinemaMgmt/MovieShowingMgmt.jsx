import { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  Tooltip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CinemaService from "../../services/CinemaService";

function MovieShowingMgmt() {
    const [movieShowings, setMovieShowings] = useState([]);

    return (
        <Box>
            
        </Box>
    )
}

export default MovieShowingMgmt
