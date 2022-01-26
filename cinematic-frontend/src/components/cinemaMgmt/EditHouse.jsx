import { useState, useEffect } from "react";
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
  ToggleButton,
  ToggleButtonGroup,
  Grid,
  InputAdornment,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import AbcIcon from "@mui/icons-material/Abc";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import CinemaService from "../../services/CinemaService";
import clsx from "clsx";

const alphabet = Array.from(Array(26))
  .map((e, i) => i + 65)
  .map((x) => String.fromCharCode(x));

function EditHouse() {
  let history = useHistory();
  let { cinemaId, houseId } = useParams();
  const [cinId, setCinId] = useState(cinemaId);
  const [id, setId] = useState(houseId);
  const [name, setName] = useState("");
  const [defaultSeat, setDefaultSeat] = useState([]);
  const [selectedDefaultSeat, setSelectedDefaultSeat] = useState([]);
  const [numOfRow, setNumOfRow] = useState(8);
  const [numOfCol, setNumOfCol] = useState(8);
  const [rowStyle, setRowStyle] = useState("alphabet");

  useEffect(() => {
    console.log("cinemaId:" + cinemaId + " | cinId:" + cinId);
    console.log("houseId:" + houseId + " | id:" + id);
    createDefaultSeat(8, 8);
  }, []);

  const createDefaultSeat = (rows, cols) => {
    let defaultSeatBox = [];
    for (var i = 0; i < rows; i++) {
      let rowArray = [];
      for (var j = 0; j < cols; j++) {
        rowArray.push({ row: i, column: j, available: true });
      }
      defaultSeatBox.push(rowArray);
    }
    setDefaultSeat(defaultSeatBox);
    console.log(defaultSeat);
  };

  const handleRowStyleChange = (event, newRowStyle) => {
    setRowStyle(newRowStyle);
  };

  const backToHouseMgmt = () => {
    history.push("/cinemaMgmt/" + cinId + "/houseMgmt");
  };

  return (
    <Box>
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
      <Box>
        <Typography variant="h6">Basic Information</Typography>
        <TextField
          required
          id="house_name"
          label="House Name"
          variant="standard"
          value={name || ""}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </Box>

      <Divider sx={{ m: 3 }} />
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Seating Plan
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{ mb: 2 }}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <TextField
            label="No. of Row"
            id="number_of_row"
            type="number"
            value={numOfRow}
            /* onChange={(e) => {
              setDuration(e.target.value);
            }} */
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">row(s)</InputAdornment>
              ),
              inputMode: "numeric",
              /* pattern: "[0-9]*", */
              min: 1,
            }}
            required
            variant="standard"
          />
          <TextField
            label="No. of Column"
            id="number_of_column"
            type="number"
            value={numOfCol}
            /* onChange={(e) => {
              setDuration(e.target.value);
            }} */
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">column(s)</InputAdornment>
              ),
              inputMode: "numeric",
              /* pattern: "[0-9]*", */
              min: 1,
            }}
            required
            variant="standard"
          />
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="subtitle1">Row Style</Typography>
            <ToggleButtonGroup
              color="primary"
              value={rowStyle}
              exclusive
              onChange={handleRowStyleChange}
            >
              <ToggleButton value="alphabet">
                <AbcIcon sx={{ mr: 1 }} />
                Alphabetical
              </ToggleButton>
              <ToggleButton value="number">
                <FormatListNumberedIcon sx={{ mr: 1 }} />
                Numerical
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Stack>

        <Container><Box></Box></Container>
        {defaultSeat.map((row, rowIndex) => {
          return (
            <Stack
              key={rowIndex}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Box>{alphabet[rowIndex]}</Box>
              {row.map((seat, seatIndex) => {
                const isSelected = selectedDefaultSeat.includes(seat);
                return (
                  <Box
                    key={seatIndex}
                    className={clsx("seat", isSelected && "selected")}
                    sx={{ color: "black", textAlign: "center" }}
                  >
                    {seat.column + 1}
                  </Box>
                );
              })}
            </Stack>
          );
        })}
      </Box>
    </Box>
  );
}

export default EditHouse;
