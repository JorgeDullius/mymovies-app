import React, { Profiler } from "react";
import { BrowserRouter, Route, Switch, Redirect  } from "react-router-dom";
import Signup from './pages/Signup/index';
import Signin from './pages/Signin/index';
import Home from './pages/Home';
import Watchlist from './pages/Watchlist'
import Profile from './pages/Profile'

import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
);
  
  const Routes = () => (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
              <Signup />
          </Route>
          <Route exact path="/signin">
              <Signin />
          </Route>
          <PrivateRoute exact path="/watchlist" component={() => <Watchlist/>} />  
          <PrivateRoute exact path="/home" component={() => <Home/>} />  
          <PrivateRoute exact path="/profile" component={() => <Profile/>} />  

          <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
      </BrowserRouter>
  )
  export default Routes;