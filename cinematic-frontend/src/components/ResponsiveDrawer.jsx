import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  Badge,
  CssBaseline,
  Divider,
  Drawer,
  List,
  Link,
  IconButton,
  InputBase,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import MovieIcon from "@mui/icons-material/Movie";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import CameraIndoorIcon from "@mui/icons-material/CameraIndoor";
import CameraOutdoorIcon from "@mui/icons-material/CameraOutdoor";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import MoreIcon from "@mui/icons-material/MoreVert";
import GroupIcon from "@mui/icons-material/Group";
import SearchIcon from "@mui/icons-material/Search";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Home from "./Home";
import EditMovie from "./movieMgmt/EditMovie";
import MovieList from "./movie/MovieList";
import MovieManagement from "./movieMgmt/MovieManagement";
import MovieDetail from "./movie/MovieDetail";
import TicketingSeatSeletion from "./movie/TicketingSeatSeletion";
import CinemaManagement from "./cinemaMgmt/CinemaManagement";
import EditCinema from "./cinemaMgmt/EditCinema";
import HouseMgmt from "./cinemaMgmt/HouseMgmt";
import EditHouse from "./cinemaMgmt/EditHouse";
import MovieShowingMgmt from "./cinemaMgmt/MovieShowingMgmt";
import EditMovieShowing from "./cinemaMgmt/EditMovieShowing";
import MovieTicketPurchasing from "./movie/MovieTicketPurchasing";

const drawerWidth = 184;

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
  const linkList1 = ["/", "/movie", "/cinema", "/watch"];
  const linkList2 = ["/movieMgmt", "/cinemaMgmt", "/userMgmt"];

  const drawer = (
    <div>
      <List
        sx={{
          mt: { md: 4 },
        }}
      >
        <ListItem>
          <Typography
            variant="h6"
            noWrap
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            CINEMATIC
          </Typography>
        </ListItem>

        {nameList1.map((text, index) => (
          <Link
            href={linkList1[index]}
            underline="none"
            color="inherit"
            key={index}
          >
            <ListItem button key={text}>
              <ListItemIcon>
                {index < iconList1.length ? iconList1[index] : <HomeIcon />}
              </ListItemIcon>
              <ListItemText
                primary={text}
                primaryTypographyProps={{ fontSize: "0.9em" }}
              />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {nameList2.map((text, index) => (
          <Link
            href={linkList2[index]}
            underline="none"
            color="inherit"
            key={index}
          >
            <ListItem button key={text}>
              <ListItemIcon>
                {index < iconList2.length ? iconList2[index] : <HomeIcon />}
              </ListItemIcon>
              <ListItemText
                primary={text}
                primaryTypographyProps={{ fontSize: "0.9em" }}
              />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <Stack
        sx={{ py: 1, px: 2, fontSize: "9px", color: "text.disabled" }}
        spacing={1}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <Link href="" underline="hover" color="inherit" sx={{ mr: 1 }}>
            About us
          </Link>
          <Link href="" underline="hover" color="inherit" sx={{ mr: 1 }}>
            FAQ
          </Link>
          <Link href="" underline="hover" color="inherit">
            Reference
          </Link>
        </Box>
        <Box>
          &copy; 2021 CINEMATIC
          <br />
          Developed by Peter CHUI
        </Box>
      </Stack>
    </div>
  );

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "100%",
      },
    },
  }));

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show new orders" color="inherit">
          <Badge badgeContent={1} color="error">
            <ReceiptIcon />
          </Badge>
        </IconButton>
        <p>Orders</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show new notifications"
          color="inherit"
        >
          <Badge badgeContent={2} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ height: 50, zIndex: { md: 1201 } }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, mb: 1, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: "none", md: "block" },
              mb: { xs: 1, md: 2 },
              mr: "34px",
            }}
          >
            CINEMATIC
          </Typography>

          <Search sx={{ mb: { xs: 1, sm: 2 } }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Movies"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" }, mb: 1 }}>
            <IconButton
              size="small"
              aria-label="show orders"
              color="inherit"
              sx={{ mr: 1 }}
            >
              <Badge badgeContent={1} color="error">
                <ReceiptIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="small"
              aria-label="show new notifications"
              color="inherit"
              sx={{ mr: 1 }}
            >
              <Badge badgeContent={2} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="small"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box
            sx={{ display: { xs: "flex", md: "none" }, mb: { xs: 1, sm: 2 } }}
          >
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
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
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
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
          px: 2,
          pt: 7,
          /*  width: { sm: `calc(100% - ${drawerWidth}px)` }, */
        }}
      >
        {/* <Toolbar/> */}
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/movie" exact component={MovieList} />
            <Route path="/movie/:movieId" exact component={MovieDetail} />
            <Route
              path="/movie/:movieId/:movieShowingId"
              exact
              component={TicketingSeatSeletion}
            />
            <Route
              path="/movie/:movieId/movieShowing/:movieShowingId"
              exact
              component={MovieTicketPurchasing}
            />
            <Route path="/movieMgmt" exact component={MovieManagement} />
            <Route path="/editMovie" exact component={EditMovie} />
            <Route path="/editMovie/:movieId" exact component={EditMovie} />
            <Route path="/cinemaMgmt" exact component={CinemaManagement} />
            <Route path="/editCinema" exact component={EditCinema} />
            <Route path="/editCinema/:cinemaId" exact component={EditCinema} />
            <Route
              path="/cinemaMgmt/:cinemaId/houseMgmt"
              exact
              component={HouseMgmt}
            />
            <Route
              path="/cinemaMgmt/:cinemaId/houseMgmt/editHouse"
              exact
              component={EditHouse}
            />
            <Route
              path="/cinemaMgmt/:cinemaId/houseMgmt/:houseId/editHouse"
              exact
              component={EditHouse}
            />
            <Route
              path="/cinemaMgmt/:cinemaId/houseMgmt/:houseId/movieShowingMgmt"
              exact
              component={MovieShowingMgmt}
            />
            <Route
              path="/cinemaMgmt/:cinemaId/houseMgmt/:houseId/movieShowingMgmt/edit"
              exact
              component={EditMovieShowing}
            />
            <Route
              path="/cinemaMgmt/:cinemaId/houseMgmt/:houseId/movieShowingMgmt/:movieShowingId/edit"
              exact
              component={EditMovieShowing}
            />
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
