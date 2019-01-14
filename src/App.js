import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Client from "./component/Client";
import Admin from "./component/Admin";
import Error from "./component/Error";
// import javascript library module
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

// import own assets
import "./asset/css/main.css";
class App extends Component {
  constructor() {
    super();
    this.state = { message: "" };
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Client} exact />
          <Route path="/pemilih" component={Client} />
          <Route path="/!/dashboard" component={Admin} exact />
          <Route path="/!/data" component={Admin} exact />
          <Route component={Error} exact />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
