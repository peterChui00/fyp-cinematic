import {
  Avatar,
  Badge,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LoginIcon from "@mui/icons-material/Login";
import AcMenuContent from "./AcMenuContent";
import NotifMenuContent from "./NotifMenuContent";

export default function MobileMenuContent({
  history,
  globalState,
  mobileMenuType,
  notifications,
  setMobileMenuType,
  handleAcMenuClose,
}) {
  return (
    <>
      {mobileMenuType === "MOBILE" ? (
        <>
          <MenuItem
            divider
            onClick={() => {
              if (notifications.messages.length > 0) {
                globalState.setNotifications({
                  ...notifications,
                  quantity: 0,
                });
              }
              setMobileMenuType("NOTIF");
            }}
          >
            <ListItemIcon>
              <Badge badgeContent={notifications.quantity} color="error">
                <NotificationsIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText>
              <Typography>Notifications</Typography>
            </ListItemText>
          </MenuItem>

          {localStorage.getItem("uid") !== null ? (
            <>
              <MenuItem
                divider
                onClick={() => {
                  history.push("/ticketRepo");
                }}
              >
                <ListItemIcon>
                  <ConfirmationNumberIcon />
                </ListItemIcon>
                <ListItemText>
                  <Typography>Tickets</Typography>
                </ListItemText>
              </MenuItem>

              <MenuItem
                divider
                onClick={() => {
                  history.push("/order");
                }}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText>
                  <Typography>Orders</Typography>
                </ListItemText>
              </MenuItem>

              <MenuItem>
                <ListItemIcon>
                  <Avatar sx={{ width: 8, height: 8, p: 1.6 }}>
                    {localStorage.getItem("uname").charAt(0).toUpperCase()}
                  </Avatar>
                </ListItemIcon>
                <ListItemText>
                  <Typography>{localStorage.getItem("uname")}</Typography>
                </ListItemText>
              </MenuItem>
              <AcMenuContent
                history={history}
                handleAcMenuClose={handleAcMenuClose}
              />
            </>
          ) : (
            <MenuItem
              onClick={() => {
                history.push("/signin");
              }}
            >
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography>Login</Typography>
              </ListItemText>
            </MenuItem>
          )}
        </>
      ) : (
        <>
          <MenuItem
            divider
            onClick={() => {
              setMobileMenuType("MOBILE");
            }}
          >
            <ListItemIcon>
              <ArrowBackIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography>Back</Typography>
            </ListItemText>
          </MenuItem>
          <NotifMenuContent notifications={notifications} />
        </>
      )}
    </>
  );
}
