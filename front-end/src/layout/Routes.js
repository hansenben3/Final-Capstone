import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import NewReservation from "./NewReservation";
import NewTable from "./NewTable";
import Search from "./Search";
import Seat from "./Seat";
import Finish from "./Finish";
import EditReservation from "./EditReservation";
/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  return (
    <Switch>
      <Route exact path="/reservations/:reservation_id/seat">
        <Seat />
      </Route>
      <Route exact path="/reservations/:reservation_id/finish">
        <Finish />
      </Route>
      <Route exact path="/reservations/:reservation_id/edit">
        <EditReservation />
      </Route>
      <Route exact path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact path = "/reservations/new">
        <NewReservation/>
      </Route>
      <Route exact path = "/search">
        <Search />
      </Route>
      <Route exact path = "/tables/new">
        <NewTable />
      </Route>
      <Route exact path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
