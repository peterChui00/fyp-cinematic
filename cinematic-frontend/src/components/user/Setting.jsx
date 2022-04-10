import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";

export default function Setting() {
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
      </Grid>
    </Box>
  );
}
