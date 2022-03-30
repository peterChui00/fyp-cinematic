import { ThemeProvider, createTheme } from "@mui/material/styles";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
import SignInSide from "./components/SignInSide";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/signin" exact component={SignInSide} />
            <Route path="/" component={ResponsiveDrawer} />f
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
