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
  MenuItem,
  ListItemText,
  ListItem,
  Divider,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import moment from "moment";
import { Context } from "../App";

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

  const [notifAnchorEl, setNotifAnchorEl] = useState(null);
  const isNotifMenuOpen = Boolean(notifAnchorEl);
  const [acAnchorEl, setAcAnchorEl] = useState(null);
  const isAcMenuOpen = Boolean(acAnchorEl);

  const handleNotifMenuOpen = (event) => {
    setNotifAnchorEl(event.currentTarget);
  };

  const handleNotifMenuClose = () => {
    setNotifAnchorEl(null);
  };

  const notificationMenu = (
    <Menu
      anchorEl={notifAnchorEl}
      id="notification-menu"
      keepMounted
      open={isNotifMenuOpen}
      onClose={handleNotifMenuClose}
      MenuListProps={{
        "aria-labelledby": "long-button",
      }}
    >
      <ListItem divider>
        <ListItemText>
          <Typography variant="h6">Notifications</Typography>
        </ListItemText>
      </ListItem>

      {notifications.messages.length > 0 ? (
        notifications.messages.map((msg, index) => {
          return (
            <MenuItem key={index} sx={{ whiteSpace: "normal" }} divider>
              <Box sx={{ my: 1 }}>
                {msg.content}
                <Box sx={{ fontSize: "0.8em", mt: 1 }}>
                  {moment(msg.time).fromNow()}
                </Box>
              </Box>
              <Divider />
            </MenuItem>
          );
        })
      ) : (
        <MenuItem sx={{ whiteSpace: "normal" }} divider>
          <Box sx={{ my: 1 }}>No Notification</Box>
        </MenuItem>
      )}
    </Menu>
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
    [theme.breakpoints.up("md")]: {
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
      [theme.breakpoints.up("md")]: {
        width: "100%",
      },
    },
  }));

  return (
    <>
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
              mr: "10px",
              overflow: "visible",
              cursor: "pointer",
            }}
            onClick={() => history.push("/")}
          >
            CINEMATIC
          </Typography>
          <Search sx={{ mb: { xs: 1, md: 2 } }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Movies"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Box sx={{ display: { xs: "none", md: "flex" }, mb: 1 }}>
            <Button onClick={() => history.push("/")}>Home</Button>
            <Button onClick={() => history.push("/movie")}>Movie</Button>
            <Button onClick={() => history.push("/cinema")}>Cinema</Button>
            {localStorage.getItem("roles") !== null &&
            localStorage.getItem("roles").includes("ADMIN") ? (
              <>
                <Button onClick={() => history.push("/movieMgmt")}>
                  Movie Mgmt
                </Button>
                <Button onClick={() => history.push("/cinemaMgmt")}>
                  Cinema Mgmt
                </Button>
              </>
            ) : null}
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" }, mb: 1 }}>
            {localStorage.getItem("uid") !== null ? (
              <IconButton
                size="small"
                aria-label="show orders"
                color="inherit"
                sx={{ mr: 1 }}
                onClick={() => history.push("/order")}
              >
                <ReceiptIcon />
              </IconButton>
            ) : null}

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

            {localStorage.getItem("uid") !== null ? (
              <IconButton
                size="small"
                edge="end"
                aria-label="user account setting button"
                onClick={() => {
                  history.push("/signin");
                  localStorage.clear();
                }}
                color="inherit"
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  {localStorage.getItem("uname").charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
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
        </Toolbar>
      </AppBar>
      {notificationMenu}
    </>
  );
}
