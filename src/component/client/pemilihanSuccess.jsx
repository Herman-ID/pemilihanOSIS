import React, { Component } from "react";

class PemilihanSuccess extends Component {
  state = {};
  delete() {
    fetch("api/deauth", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        id: localStorage.getItem("id")
      })
    }).then(local => {
      localStorage.removeItem("id");
      window.location.href = "/";
    });
  }
  render() {
    return (
      <div className="success_pemilihan">
        {this.props.data[parseInt(this.props.terpilih, 10) - 1] ===
        undefined ? (
          ""
        ) : (
          <div className="success-div">
            <img
              src={this.props.data[parseInt(this.props.terpilih, 10) - 1].photo}
              className="terpilih-photo"
            />
            <h1 className="success_h1">
              Anda telah memilih{" "}
              <span className="nama">
                {this.props.data[parseInt(this.props.terpilih, 10) - 1].nama}{" "}
              </span>
              Nomor urut <span className="nama">{this.props.terpilih}</span>
            </h1>
            <button
              className="btn btn-primary btn-success_terpilih"
              onClick={this.delete}
            >
              Keluar
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default PemilihanSuccess;
