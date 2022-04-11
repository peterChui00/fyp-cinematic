import { useReducer } from "react";
import {
  Avatar,
  Alert,
  Box,
  Button,
  Grid,
  CssBaseline,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  Link,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Stack,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CheckIcon from "@mui/icons-material/Check";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useHistory } from "react-router-dom";
import UserService from "../services/UserService";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        CINEMATIC
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const initialState = {
  username: "",
  password: "",
  confirmPassword: "",
  email: "",
  checked: false,
  isLoading: false,
  success: false,
  error: "",
};

const reducer = (state, action) => {
  const payload = action.payload;
  switch (action.type) {
    case "FIELD":
      return { ...state, [action.fieldName]: payload };

    case "SUBMIT": {
      return {
        ...state,
        error: "",
        isLoading: true,
      };
    }
    case "SUCCESS": {
      return {
        ...state,
        success: true,
        isLoading: false,
      };
    }
    case "ERROR": {
      return {
        ...state,
        error: payload,
        isLoading: false,
       /*  username: "",
        password: "",
        confirmPassword: "", */
      };
    }
    default:
      return state;
  }
};

export default function SignUpSide() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    username,
    password,
    confirmPassword,
    email,
    checked,
    isLoading,
    success,
    error,
  } = state;
  let history = useHistory();

  const addUser = async (e) => {
    e.preventDefault();
    dispatch({ type: "SUBMIT" });
    try {
      const user = {
        username: username,
        password: password,
        email: email,
        role: checked ? "CINEMA_COMPANY" : "MEMBER",
      };
      const res = await UserService.addUser(user);
      console.log(res);
      dispatch({ type: "SUCCESS" });
      await new Promise((res) => setTimeout(() => res("p1"), 2000));
    } catch (err) {
      if (err.response) {
        dispatch({ type: "ERROR", payload: err.response.data.message });
      } else {
        dispatch({ type: "ERROR", payload: err.message });
      }
    }
  };

  return (
    <Box>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://cdn.pixabay.com/photo/2019/05/19/10/40/cinema-4213751_1280.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            component="form"
            sx={{
              my: 6,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <AppRegistrationIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>

            {error !== "" ? (
              <Alert severity="error" sx={{ my: 1 }}>
                {error}
              </Alert>
            ) : null}

            <Box sx={{ mt: 1 }}>
              <TextField
                required
                margin="normal"
                fullWidth
                name="username"
                label="Username"
                id="username"
                autoComplete="username"
                value={username}
                onChange={(e) =>
                  dispatch({
                    type: "FIELD",
                    fieldName: "username",
                    payload: e.currentTarget.value,
                  })
                }
                autoFocus
              />
              <TextField
                required
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                autoComplete="current-password"
                onChange={(e) =>
                  dispatch({
                    type: "FIELD",
                    fieldName: "password",
                    payload: e.currentTarget.value,
                  })
                }
              />
              <TextField
                required
                margin="normal"
                fullWidth
                name="confirm-password"
                label="Confirm Password"
                type="password"
                id="confirm-password"
                value={confirmPassword}
                autoComplete="confirm-password"
                error={!(password === confirmPassword)}
                helperText={
                  password === confirmPassword
                    ? ""
                    : "Password and confirm password does not match."
                }
                onChange={(e) =>
                  dispatch({
                    type: "FIELD",
                    fieldName: "confirmPassword",
                    payload: e.currentTarget.value,
                  })
                }
              />
              <TextField
                required
                margin="normal"
                fullWidth
                name="email"
                type="email"
                label="Email"
                id="email"
                autoComplete="email"
                value={email}
                onChange={(e) =>
                  dispatch({
                    type: "FIELD",
                    fieldName: "email",
                    payload: e.currentTarget.value,
                  })
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="cinema_company_user"
                    color="primary"
                    checked={checked}
                    onChange={(e) => {
                      dispatch({
                        type: "FIELD",
                        fieldName: "checked",
                        payload: e.target.checked,
                      });
                    }}
                  />
                }
                label="Register as a Cinema Company User"
              />

              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                loading={isLoading}
                onClick={(e) => {
                  addUser(e);
                }}
                onKeyDown={(e) => (e.key === "Enter" ? addUser(e) : null)}
                sx={{ mt: 3, mb: 2, height: "50px" }}
              >
                Sign Up
              </LoadingButton>

              <Grid container>
                <Grid item xs>
                  <Link
                    href="/signin"
                    variant="body2"
                    sx={{ textDecoration: "none" }}
                  >
                    Back to Sign In
                  </Link>
                </Grid>
                <Grid item></Grid>
              </Grid>
              <Copyright sx={{ mt: 4 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Dialog open={success} maxWidth={"sm"} fullWidth>
        <DialogTitle>
          <Stack direction="row" spacing={1} alignItems="center">
            <CheckIcon fontSize="inherit" />
            <Typography variant="h6">Successfully registered</Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          You can now enjoy our full service after signing in.
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              history.push("/signin");
            }}
          >
            Back to Sign In
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
