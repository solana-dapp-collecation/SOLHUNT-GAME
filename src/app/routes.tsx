import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Cabinet } from "./pages/cabinet/Cabinet";
import { Home } from "./pages/home";

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/cabinet">
          <Cabinet />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};
