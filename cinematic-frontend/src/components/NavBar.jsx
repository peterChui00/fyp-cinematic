import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Badge,
  Button,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
  Menu,
  Tooltip,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { Context } from "../App";
import NotifMenuContent from "./navbar/NotifMenuContent";
import AcMenuContent from "./navbar/AcMenuContent";
import MobileMenuContent from "./navbar/MobileMenuContent";

const Search = styled("div")(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("md")]: {
    marginLeft: theme.spacing(2),
    width: "100%",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    /* padding: theme.spacing(0, 0, 0, 0), */
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(0)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

export default function NavBar({ handleDrawerToggle }) {
  const globalState = useContext(Context);
  let history = useHistory();
  let notifications =
    globalState.notification === null
      ? {
          quantity: 0,
          messages: [],
          promotedMovies: [],
        }
      : globalState.notification;

  const [keyword, setKeyword] = useState("");
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);
  const isNotifMenuOpen = Boolean(notifAnchorEl);
  const [acAnchorEl, setAcAnchorEl] = useState(null);
  const isAcMenuOpen = Boolean(acAnchorEl);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [mobileMenuType, setMobileMenuType] = useState("MOBILE");

  const handleNotifMenuOpen = (event) => {
    setNotifAnchorEl(event.currentTarget);
  };

  const handleNotifMenuClose = () => {
    setNotifAnchorEl(null);
  };

  const handleAcMenuOpen = (event) => {
    setAcAnchorEl(event.currentTarget);
  };

  const handleAcMenuClose = () => {
    setAcAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const NotificationMenu = (
    <Menu
      anchorEl={notifAnchorEl}
      id="notification-menu"
      keepMounted
      open={isNotifMenuOpen}
      onClose={handleNotifMenuClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "right",
      }}
      MenuListProps={{
        "aria-labelledby": "long-button",
      }}
    >
      <NotifMenuContent notifications={notifications} />
    </Menu>
  );

  const AcMenu = (
    <Menu
      anchorEl={acAnchorEl}
      id="notification-menu"
      keepMounted
      open={isAcMenuOpen}
      onClose={handleAcMenuClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      MenuListProps={{
        "aria-labelledby": "long-button",
      }}
    >
      <AcMenuContent history={history} handleAcMenuClose={handleAcMenuClose} />
    </Menu>
  );

  const MobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id="mobile-menu"
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MobileMenuContent
        history={history}
        globalState={globalState}
        mobileMenuType={mobileMenuType}
        notifications={notifications}
        setMobileMenuType={setMobileMenuType}
        handleAcMenuClose={handleAcMenuClose}
      />
    </Menu>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ height: 50, zIndex: { md: 1201 } }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, mb: { sm: 1 }, display: { md: "none" } }}
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
              mr: "10px",
              overflow: "visible",
              cursor: "pointer",
            }}
            onClick={() => history.push("/")}
          >
            CINEMATIC
          </Typography>

          <Search sx={{ mb: { xs: 0, sm: 2, md: 2 } }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <StyledInputBase
                sx={{ flexGrow: 1 }}
                placeholder="Search Movies"
                inputProps={{ "aria-label": "search" }}
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && keyword.length > 0) {
                    history.push("/results?search_query=" + keyword);
                  }
                }}
              />
              <IconButton
                type="submit"
                onClick={() => {
                  if (keyword.length > 0) {
                    history.push("/results?search_query=" + keyword);
                  }
                }}
              >
                <SearchIcon />
              </IconButton>
            </Box>
          </Search>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              mb: 1.5,
              ml: "auto",
              mr: 6,
            }}
          >
            <Button
              sx={{ color: "white", height: "100%", alignSelf: "center" }}
              variant="text"
              onClick={() => history.push("/")}
            >
              Home
            </Button>
            <Button
              sx={{ color: "white", height: "100%", alignSelf: "center" }}
              variant="text"
              onClick={() => history.push("/movie")}
            >
              Movie
            </Button>
            <Button
              sx={{ color: "white", height: "100%", alignSelf: "center" }}
              variant="text"
              onClick={() => history.push("/cinema")}
            >
              Cinema
            </Button>
            {localStorage.getItem("roles") !== null &&
            localStorage.getItem("roles").includes("CINEMA_COMPANY") ? (
              <>
                <Button
                  sx={{ color: "white", height: "100%", alignSelf: "center" }}
                  variant="text"
                  onClick={() => history.push("/movieMgmt")}
                >
                  Movie Mgmt
                </Button>
                <Button
                  sx={{ color: "white", height: "100%", alignSelf: "center" }}
                  variant="text"
                  onClick={() => history.push("/cinemaMgmt")}
                >
                  Cinema Mgmt
                </Button>
              </>
            ) : null}
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" }, mb: 1 }}>
            {localStorage.getItem("uid") !== null ? (
              <>
                <Tooltip title="Tickets">
                  <IconButton
                    size="small"
                    aria-label="show tickets"
                    color="inherit"
                    sx={{ mr: 1 }}
                    onClick={() => history.push("/ticketRepo")}
                  >
                    <ConfirmationNumberIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Orders">
                  <IconButton
                    size="small"
                    aria-label="show orders"
                    color="inherit"
                    sx={{ mr: 1 }}
                    onClick={() => history.push("/order")}
                  >
                    <ReceiptIcon />
                  </IconButton>
                </Tooltip>
              </>
            ) : null}
            <Tooltip title="Notifications">
              <IconButton
                size="small"
                aria-label="show new notifications"
                color="inherit"
                sx={{ mr: 2 }}
                onClick={(e) => {
                  handleNotifMenuOpen(e);
                  if (notifications.messages.length > 0) {
                    globalState.setNotifications({
                      ...notifications,
                      quantity: 0,
                    });
                  }
                }}
              >
                <Badge badgeContent={notifications.quantity} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            {localStorage.getItem("uid") !== null ? (
              <Tooltip title={localStorage.getItem("uname")}>
                <IconButton
                  size="small"
                  edge="end"
                  aria-label="user account setting button"
                  onClick={handleAcMenuOpen}
                  color="inherit"
                >
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {localStorage.getItem("uname").charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>
            ) : (
              <Button
                variant="outlined"
                size="small"
                edge="end"
                aria-label="login button"
                onClick={() => {
                  history.push("/signin");
                }}
                color="primary"
              >
                <AccountCircle sx={{ mr: 1 }} />
                Login
              </Button>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, mb: { sm: 1 } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={"mobile-menu"}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <Badge badgeContent={notifications.quantity} color="error">
                <MoreIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {NotificationMenu}
      {AcMenu}
      {MobileMenu}
    </>
  );
}
