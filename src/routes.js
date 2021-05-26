import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import App from "./App";
function routes(props) {
  return (
    <div>
      <Router>
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={App} />
          </Switch>
        </React.Fragment>
      </Router>
    </div>
  );
}

export default routes;
