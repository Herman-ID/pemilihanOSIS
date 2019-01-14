import React, { Component } from "react";
import OnlinePemilih from "./onlinePemilih";

class PemilihOnline extends Component {
  state = {
    online: []
  };
  componentDidMount() {
    fetch("/api/onlinepemilih")
      .then(response => response.json())
      .then(json => {
        this.setState({ online: json.data });
      });
  }
  render() {
    return (
      <div className="onlinepemilih">
        <h3>Pemilih Online</h3>
        <div className=" row">
          {this.state.online.length === 0 ? (
            <p>Tidak ada pemilih online</p>
          ) : (
            this.state.online.map(online => (
              <OnlinePemilih key={online.id} data={online} />
            ))
          )}
        </div>
      </div>
    );
  }
}

export default PemilihOnline;
