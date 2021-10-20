import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Container from "@mui/material/Container";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Container>
          <Switch>
            <Route path="/" exact component={Header}></Route>
            <Route path="/movie" component={Header}></Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
