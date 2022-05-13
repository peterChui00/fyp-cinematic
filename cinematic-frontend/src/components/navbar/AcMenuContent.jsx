import { MenuItem, ListItemIcon } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

export default function AcMenuContent({ history, handleAcMenuClose }) {
  return (
    <>
      <MenuItem
        onClick={() => {
          handleAcMenuClose();
          history.push("/setting");
        }}
      >
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleAcMenuClose();
          localStorage.clear();
        }}
      >
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </>
  );
}
