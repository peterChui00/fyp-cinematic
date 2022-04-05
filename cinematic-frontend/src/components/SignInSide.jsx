import { useReducer } from "react";
import {
  Avatar,
  Alert,
  Box,
  Grid,
  Button,
  CssBaseline,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  Link,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";
import { useHistory } from "react-router-dom";

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
  username: "Admin",
  password: "adminpw",
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
        username: "",
        password: "",
      };
    }
    default:
      return state;
  }
};

export default function SignInSide() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { username, password, isLoading, success, error } = state;
  let history = useHistory();

  const login = async (e) => {
    e.preventDefault();
    dispatch({ type: "SUBMIT" });
    try {
      const loginInfo = { username: username, password: password };
      const res = await axios.post(
        "http://localhost:8080/api/login",
        loginInfo
      );
      console.log(res);
      localStorage.setItem("uid", res.data.id);
      localStorage.setItem("uname", res.data.username);
      localStorage.setItem(
        "roles",
        res.data.roles.map((r) => r.name).toString()
      );
      dispatch({ type: "SUCCESS" });
      await new Promise((res) => setTimeout(() => res("p1"), 2000));
      history.push("/");
    } catch (err) {
      if (err.response) {
        dispatch({ type: "ERROR", payload: err.response.data.message });
      } else {
        dispatch({ type: "ERROR", payload: err.message });
      }
    }
  };

  return (
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {error !== "" ? (
            <Alert severity="error" sx={{ my: 1 }}>
              {error}
            </Alert>
          ) : null}
          <Box sx={{ mt: 1 }}>
            <TextField
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
            <FormControlLabel
              control={
                <Checkbox value="remember" color="primary" checked={true} />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={(e) => {
                login(e);
              }}
              onKeyDown={(e) => (e.key === "Enter" ? login(e) : null)}
              sx={{ mt: 3, mb: 2, height: "50px" }}
            >
              {isLoading ? (
                <CircularProgress
                  color="secondary"
                  style={{ padding: "3px" }}
                />
              ) : success ? (
                <DoneIcon />
              ) : (
                "Sign In"
              )}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="" variant="body2" sx={{ textDecoration: "none" }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="" variant="body2" sx={{ textDecoration: "none" }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 4 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
