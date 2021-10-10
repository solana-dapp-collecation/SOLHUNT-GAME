import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Game } from "./pages/game";
import { Home } from "./pages/home";

export const Routes = () => {
  return (
    <Router>
        <Switch>
          <Route exact path="/game">
            <Game />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  );
}
