import { ThemeProvider, createTheme } from "@mui/material/styles";
import ResponsiveDrawer from "./components/ResponsiveDrawer";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <ResponsiveDrawer />
      </div>
    </ThemeProvider>
  );
}

export default App;
