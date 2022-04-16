import {
  Box,
  Divider,
  List,
  Link,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Stack,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import MovieIcon from "@mui/icons-material/Movie";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import CameraIndoorIcon from "@mui/icons-material/CameraIndoor";
import CameraOutdoorIcon from "@mui/icons-material/CameraOutdoor";

const drawerElement = {
  common: [
    {
      icon: <HomeIcon />,
      description: "Home",
      link: "/",
    },
    {
      icon: <MovieIcon />,
      description: "Movie",
      link: "/movie",
    },
    {
      icon: <CameraIndoorIcon />,
      description: "Cinema",
      link: "/cinema",
    },
  ],
  management: [
    {
      icon: <MovieFilterIcon />,
      description: "Movie Management",
      link: "/movieMgmt",
    },
    {
      icon: <CameraOutdoorIcon />,
      description: "Cinema Management",
      link: "/cinemaMgmt",
    },
  ],
};

export default function SideDrawer() {
  let history = useHistory();

  return (
    <div>
      <List>
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

        <ListItem>
          <Stack
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            spacing={1}
          ></Stack>
        </ListItem>

        {drawerElement.common.map((c, index) => {
          return (
            <ListItem
              button
              onClick={() => {
                history.push(c.link);
              }}
            >
              <ListItemIcon>{c.icon}</ListItemIcon>
              <ListItemText
                primary={c.description}
                primaryTypographyProps={{ fontSize: "0.9em" }}
              />
            </ListItem>
          );
        })}
      </List>
      <Divider />
      {localStorage.getItem("roles") !== null &&
      localStorage.getItem("roles").includes("CINEMA_COMPANY") ? (
        <>
          <List>
            {drawerElement.management.map((m, index) => {
              return (
                <ListItem
                  button
                  onClick={() => {
                    history.push(m.link);
                  }}
                >
                  <ListItemIcon>{m.icon}</ListItemIcon>
                  <ListItemText
                    primary={m.description}
                    primaryTypographyProps={{ fontSize: "0.9em" }}
                  />
                </ListItem>
              );
            })}
          </List>
          <Divider />
        </>
      ) : null}

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
        ></Box>
        <Box>
          &copy; 2022 CINEMATIC
          <br />
          Developed by Peter CHUI
        </Box>
      </Stack>
    </div>
  );
}
