import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  createContext,
} from "react";
import { Box, Drawer } from "@mui/material";

import NavBar from "./NavBar";
import SideDrawer from "./SideDrawer";

export default function Navigation({ container }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawerWidth = 184;

  return (
    <>
      <NavBar handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="nav"
       /*  sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }} */
        aria-label="drawer"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <SideDrawer />
        </Drawer>
      </Box>
    </>
  );
}
