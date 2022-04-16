import {
  Box,
  Typography,
  MenuItem,
  ListItemText,
  ListItem,
  Divider,
} from "@mui/material";
import moment from "moment";

export default function NotifMenuContent({ notifications }) {
  return (
    <>
      <ListItem divider>
        <ListItemText>
          <Typography variant="h6">Notifications</Typography>
        </ListItemText>
      </ListItem>
      {notifications.messages.length > 0 ? (
        notifications.messages.map((msg, index) => {
          return (
            <MenuItem
              key={index}
              sx={{ whiteSpace: "normal", minWidth: "350px" }}
              divider
            >
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
          <Box sx={{ my: 1, minWidth: "350px" }}>No Notification</Box>
        </MenuItem>
      )}
    </>
  );
}
