import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import MovieIcon from "@mui/icons-material/Movie";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import CameraIndoorIcon from "@mui/icons-material/CameraIndoor";
import CameraOutdoorIcon from "@mui/icons-material/CameraOutdoor";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import GroupIcon from "@mui/icons-material/Group";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Home from "./Home";
import MovieManagement from "./MovieManagement";

const drawerWidth = 210;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  // --- Define drawer ---
  const iconList1 = [
    <HomeIcon />,
    <MovieIcon />,
    <CameraIndoorIcon />,
    <OndemandVideoIcon />,
  ];
  const iconList2 = [<MovieFilterIcon />, <CameraOutdoorIcon />, <GroupIcon />];
  const nameList1 = ["Home", "Movie", "Cinema", "Watch"];
  const nameList2 = [
    "Movie Management",
    "Cinema Management",
    "User Management",
  ];
  const linkList1 = ["/home", "/movie", "/cinema", "/watch"];
  const linkList2 = ["/movieMgmt", "/cinemaMgmt", "/userMgmt"];

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          CINEMATIC
        </Typography>
      </Toolbar>

      <Divider />
      <List>
        {nameList1.map((text, index) => (
          <Link href={linkList1[index]} underline="none" color="inherit">
            <ListItem button key={text}>
              <ListItemIcon>
                {index < iconList1.length ? iconList1[index] : <HomeIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {nameList2.map((text, index) => (
          <Link href={linkList2[index]} underline="none" color="inherit">
            <ListItem button key={text}>
              <ListItemIcon>
                {index < iconList2.length ? iconList2[index] : <HomeIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: "block", sm: "none" },
            }}
          >
            CINEMATIC
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label=""
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
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Router>
          <Switch>
            <Route path="/home" exact component={Home} />
            <Route path="/movieMgmt" exact component={MovieManagement} />
          </Switch>
        </Router>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
