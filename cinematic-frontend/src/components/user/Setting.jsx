import { Box, Divider, Grid, Typography, Switch, Stack } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useContext, useState } from "react";
import { Context } from "../../App";

export default function Setting() {
  const globalState = useContext(Context);
  const [state, setState] = useState({
    darkMode: globalState.colorMode === "dark" ? true : false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
    if (event.target.name === "darkMode") {
      globalState.setColorMode(
        globalState.colorMode === "light" ? "dark" : "light"
      );
    }
  };

  return (
    <Box>
      <Grid
        container
        spacing={0.5}
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ maxWidth: "700px", mx: "auto", width: "100%" }}
      >
        <Grid item xs={12}>
          <Typography variant="h4">Settings</Typography>
          <Divider sx={{ borderBottomWidth: 5, mb: 1 }} />
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-around"
            alignItems="stretch"
            spacing={2}
          >
            <Stack
              direction="row"
              spacing={1}
              alignItems="stretch"
              sx={{ mb: 1 }}
            >
              <DarkModeIcon />
              <Typography>Dark mode</Typography>
            </Stack>

            <Switch
              checked={state.darkMode}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled", name: "darkMode" }}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
