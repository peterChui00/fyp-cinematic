import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import EditMovie from "./movieMgmt/EditMovie";
import MovieList from "./movie/MovieList";
import MovieManagement from "./movieMgmt/MovieManagement";
import MovieDetail from "./movie/MovieDetail";
import CinemaManagement from "./cinemaMgmt/CinemaManagement";
import EditCinema from "./cinemaMgmt/EditCinema";
import HouseMgmt from "./cinemaMgmt/HouseMgmt";
import EditHouse from "./cinemaMgmt/EditHouse";
import MovieShowingMgmt from "./cinemaMgmt/MovieShowingMgmt";
import EditMovieShowing from "./cinemaMgmt/EditMovieShowing";
import MovieTicketPurchase from "./movie/MovieTicketPurchase";
import MovieReview from "./movie/MovieReview";
import NotFound from "./NotFound";
import Order from "./user/Order";
import Setting from "./user/Setting";
import CinemaList from "./cinema/CinemaList";
import CinemaDetail from "./cinema/CinemaDetail";
import MovieSearch from "./movie/MovieSearch";
import TicketRepo from "./user/TicketRepo";

export default function Routing() {
  return (
    <>
      <Switch>
        {/* Common routes */}
        <Route path="/" exact component={Home} />
        <Route path="/movie" exact component={MovieList} />
        <Route path="/movie/:movieId" exact component={MovieDetail} />
        <Route
          path="/movie/:movieId/movieReview"
          exact
          component={MovieReview}
        />
        <Route
          path="/movie/:movieId/movieShowing/:movieShowingId"
          exact
          component={MovieTicketPurchase}
        />
        <Route path="/cinema" exact component={CinemaList} />
        <Route path="/cinema/:cinemaId" exact component={CinemaDetail} />
        <Route path="/order" exact component={Order} />
        <Route path="/setting" exact component={Setting} />
        <Route path="/ticketRepo" exact component={TicketRepo} />
        <Route path="/results" component={MovieSearch} />

        {/* Management routes */}
        <Route path="/movieMgmt" exact component={MovieManagement} />
        <Route path="/editMovie" exact component={EditMovie} />
        <Route path="/editMovie/:movieId" exact component={EditMovie} />

        <Route path="/cinemaMgmt" exact component={CinemaManagement} />
        <Route path="/editCinema" exact component={EditCinema} />
        <Route path="/editCinema/:cinemaId" exact component={EditCinema} />
        <Route
          path="/cinemaMgmt/:cinemaId/houseMgmt"
          exact
          component={HouseMgmt}
        />
        <Route
          path="/cinemaMgmt/:cinemaId/houseMgmt/editHouse"
          exact
          component={EditHouse}
        />
        <Route
          path="/cinemaMgmt/:cinemaId/houseMgmt/:houseId/editHouse"
          exact
          component={EditHouse}
        />
        <Route
          path="/cinemaMgmt/:cinemaId/houseMgmt/:houseId/movieShowingMgmt"
          exact
          component={MovieShowingMgmt}
        />
        <Route
          path="/cinemaMgmt/:cinemaId/houseMgmt/:houseId/movieShowingMgmt/edit"
          exact
          component={EditMovieShowing}
        />
        <Route
          path="/cinemaMgmt/:cinemaId/houseMgmt/:houseId/movieShowingMgmt/:movieShowingId/edit"
          exact
          component={EditMovieShowing}
        />

        {/* Page Not Found route */}
        <Route component={NotFound} />
      </Switch>
    </>
  );
}
