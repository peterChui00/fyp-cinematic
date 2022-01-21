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

function EditHouse() {
  let history = useHistory();
  let { cinemaId, houseId } = useParams();
  const [cinId, setCinId] = useState(cinemaId);
  const [id, setId] = useState(houseId);
  const [name, setName] = useState("");

  useEffect(() => {
    console.log("cinemaId:" + cinemaId + " cinId:" + cinId);
    console.log("houseId:" + houseId + " id:" + id);
  });

  const backToHouseMgmt = () => {
    history.push("/cinemaMgmt/" + cinId + "/houseMgmt");
  };

  return (
    <Box>
      <Tooltip title="Back" placement="right" sx={{ mb: 2 }}>
        <Button
          size="small"
          variant="text"
          startIcon={<ArrowBackIcon />}
          onClick={backToHouseMgmt}
        >
          <Typography variant="h6" component="div">
            {id === undefined ? "Create new " : "Update "}House
          </Typography>
        </Button>
      </Tooltip>
    </Box>
  );
}

export default EditHouse;
