import React, { Component } from "react";

class OnlinePemilih extends Component {
  state = {};
  render() {
    console.log(this.props.data);
    return (
      <div className="onlinePemilih">
        <h1 className="onlinePemilih__nama">{this.props.data.nama}</h1>
        <p className="onlinePemilih__keterangan">
          {this.props.data.keterangan}
        </p>
      </div>
    );
  }
}

export default OnlinePemilih;
