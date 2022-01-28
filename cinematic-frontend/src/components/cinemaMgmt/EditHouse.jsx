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
  ToggleButton,
  ToggleButtonGroup,
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

  const createDefaultSeat = useCallback((rows, cols) => {
    let defaultSeatBox = [];
    for (var i = 0; i < rows; i++) {
      let rowArray = [];
      for (var j = 0; j < cols; j++) {
        rowArray.push({ row: i, column: j, available: true });
      }
      defaultSeatBox.push(rowArray);
    }
    setDefaultSeat(defaultSeatBox);
  }, []);

  useEffect(() => {
    console.log(
      "cinemaId: " +
        cinemaId +
        " | cinId: " +
        cinId +
        " | houseId: " +
        houseId +
        " | id: " +
        id +
        " | Row style: " +
        rowStyle +
        " | numOfRow: " +
        numOfRow +
        " | numOfCol: " +
        numOfCol
    );
    console.log(defaultSeat);
  }, [cinemaId, cinId, houseId, id, rowStyle, defaultSeat, numOfRow, numOfCol]);

  useEffect(() => {
    if (numOfRow !== "" && numOfCol !== "") {
      createDefaultSeat(numOfRow, numOfCol);
    }
  }, [createDefaultSeat, numOfRow, numOfCol]);

  const handleRowStyleChange = (event) => {
    setRowStyle(event.target.value);
  };

  function getEditedHouse() {
    let requestDefaultSeat = [];
    defaultSeat.forEach((row) => {
      row.forEach((seat) => {
        requestDefaultSeat.push(seat);
      });
    });
    return {
      name: name,
      rowStyle: rowStyle,
      seatingPlanSeats: requestDefaultSeat,
    };
  }

  const addHouse = async () => {
    try {
      const res = await CinemaService.addHouse(cinId, id, getEditedHouse());
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  const updateHouse = () => {};

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
            onChange={(e) => {
              if (e.target.value !== null || e.target.value !== "") {
                setNumOfRow(e.target.value);
              }
            }}
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
            onChange={(e) => {
              setNumOfCol(e.target.value);
            }}
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
          <Stack direction="row" spacing={3} alignItems="center">
            <Typography variant="subtitle1">Row Style</Typography>
            <RadioGroup
              row
              aria-labelledby="row-style-radio-buttons-group"
              name="row-style-radio-buttons-group"
              value={rowStyle}
              onChange={handleRowStyleChange}
            >
              <FormControlLabel
                value="alphabet"
                control={<Radio />}
                label="Alphabetical"
              />
              <FormControlLabel
                value="number"
                control={<Radio />}
                label="Numerical"
              />
            </RadioGroup>
          </Stack>
        </Stack>

        <Container>
          <Box></Box>
        </Container>
        {defaultSeat.map((row, rowIndex) => {
          return (
            <Stack
              key={rowIndex}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Box>
                {rowStyle === "alphabet" ? alphabet[rowIndex] : rowIndex + 1}
              </Box>
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
      <Box sx={{ my: 2 }}>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item xs={6} sm={3}>
            {id === undefined ? (
              <Button
                size="medium"
                variant="outlined"
                fullWidth
                startIcon={<CheckCircleIcon />}
                onClick={addHouse}
                color="success"
              >
                Add house
              </Button>
            ) : (
              <Button
                fullWidth
                size="medium"
                variant="outlined"
                startIcon={<CheckCircleIcon />}
                onClick={updateHouse}
                color="success"
              >
                Update house
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default EditHouse;
