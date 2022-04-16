import React from "react";
import { Box, CssBaseline } from "@mui/material";
import PropTypes from "prop-types";
import Routing from "./Routing";
import Navigation from "./Navigation";

function Main(props) {
  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navigation container={container} />
      <Box sx={{ pt: 8, px: 2, width: "100%" }}>
        <Routing />
      </Box>
    </Box>
  );
}

Main.propTypes = {
  window: PropTypes.func,
};

export default Main;
