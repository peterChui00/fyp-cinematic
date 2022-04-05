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
import HomeIcon from "@mui/icons-material/Home";
import MovieIcon from "@mui/icons-material/Movie";
import GroupIcon from "@mui/icons-material/Group";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import CameraIndoorIcon from "@mui/icons-material/CameraIndoor";
import CameraOutdoorIcon from "@mui/icons-material/CameraOutdoor";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";

export default function SideDrawer() {
  // --- Define drawer ---
  const iconList1 = [
    <HomeIcon />,
    <MovieIcon />,
    <CameraIndoorIcon />,
  ];
  const iconList2 = [<MovieFilterIcon />, <CameraOutdoorIcon />, <GroupIcon />];
  const nameList1 = ["Home", "Movie", "Cinema"];
  const nameList2 = ["Movie Management", "Cinema Management"];
  const linkList1 = ["/", "/movie", "/cinema", "/watch"];
  const linkList2 = ["/movieMgmt", "/cinemaMgmt"];

  const drawerElement = {
    common: {
      icon: <HomeIcon />,
      description: "Home",
      link: "/",
    },
    management: {
      icon: <MovieFilterIcon />,
      description: "Movie Management",
      link: "/movieMgmt",
    },
  };

  return (
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
      {localStorage.getItem("roles") !== null &&
      localStorage.getItem("roles").includes("ADMIN") ? (
        <>
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
