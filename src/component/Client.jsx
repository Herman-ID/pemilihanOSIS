import React, { Component } from "react";
import Pemilihan from "./client/pemilihan";
import Login from "./client/login";
class Client extends Component {
  state = {
    url: null
  };

  componentDidMount() {
    this.setState({ url: window.location.pathname });
  }
  render() {
    return (
      <div>
        {this.state.url === "/pemilih" ? (
          <Pemilihan />
        ) : this.state.url === "/" ? (
          <Login />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Client;
