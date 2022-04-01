import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  createContext,
} from "react";
import computeDistance from "./services/computeDistance";
import CinemaService from "./services/CinemaService";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
import SignInSide from "./components/SignInSide";
import axios from "axios";

export const Context = createContext();
function App() {
 
  const [colorMode, setColorMode] = React.useState("dark");
  const [userLocation, setUserLocation] = useState(null);
  const [cinemas, setCinemas] = useState([]);
  const [recentShowings, setRecentShowings] = useState([]);
  const [notifications, setNotifications] = useState({
    quantity: 0,
    messages: [],
    promotedMovies: [],
  });

  const darkTheme = createTheme({
    palette: {
      mode: colorMode,
    },
  });

  const interval = useRef();

  const getUserGeoLocation = useCallback(() => {
    return new Promise((resolve, error) =>
      navigator.geolocation.getCurrentPosition(resolve, error)
    );
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const position = await getUserGeoLocation();
      setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });

      const [res, res1] = await axios.all([
        CinemaService.getCinemas(),
        CinemaService.getRecentMovieShowing(),
      ]);

      const cinemaIds = [...new Set(res1.data.map((d) => d.cinemaId))];
      setCinemas(
        res.data
          .filter((c) => cinemaIds.some((cinemaId) => cinemaId === c.id))
          .map((cinema) => {
            return {
              ...cinema,
              distance: computeDistance(
                cinema.latitude,
                cinema.longitude,
                position.coords.latitude,
                position.coords.longitude,
                "K"
              ),
            };
          })
          .sort((a, b) => a.distance - b.distance)
      );
      setRecentShowings(res1.data);
    } catch (err) {
      console.error(err);
      clearInterval(interval.current);
    }
  }, [getUserGeoLocation]);

  useEffect(() => {
    if (navigator.geolocation && window.location.pathname !== "/signin") {
      fetchData();
      interval.current = setInterval(() => {
        fetchData();
      }, 20000);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, [fetchData]);

  useEffect(() => {
    if (
      cinemas.length > 0 &&
      recentShowings.length > 0 &&
      userLocation !== null
    ) {
      console.log("noti")
      const movieIds = [...new Set(recentShowings.map((rs) => rs.movieId))];
      let movieTitles = "";
      let promotedMovieIds = [];
      movieIds.forEach((mId) => {
        if (!notifications.promotedMovies.includes(mId)) {
          promotedMovieIds = [...promotedMovieIds, mId];
          const movie = recentShowings.find((rs) => rs.movieId === mId);
          promotedMovieIds.length === 1
            ? (movieTitles += movie.movieTitle)
            : (movieTitles += ", " + movie.movieTitle);
        }
      });

      if (promotedMovieIds.length > 0) {
        const content =
          promotedMovieIds.length > 1 ? (
            <>
              The following {promotedMovieIds.length} movies will be shown in
              cinemas near you within an hour:
              <br />
              <b>{movieTitles}</b>
            </>
          ) : (
            <>
              The following movie will be shown in cinemas near you within an
              hour:
              <br />
              <b>{movieTitles}</b>
            </>
          );
        const time = new Date();
        setNotifications({
          ...notifications,
          quantity: notifications.quantity + 1,
          messages: [
            ...notifications.messages,
            {
              time: time,
              content: content,
            },
          ],
          promotedMovies: notifications.promotedMovies.concat(promotedMovieIds),
        });
      }
    }
  }, [recentShowings]);

   useEffect(() => {
    console.log(notifications);
  }, [notifications]);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/signin" exact component={SignInSide} />
            <Context.Provider
              value={{
                userLocation: userLocation,
                notification: notifications,
                setNotifications: setNotifications,
                setColorMode: setColorMode,
              }}
            >
              <Route path="/" component={ResponsiveDrawer} />
            </Context.Provider>
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
