import React, { Component } from "react";
import Dashboard from "./admin/dashboard";
import Navbar from "./admin/navbar";
import Data from "./admin/data";

class Admin extends Component {
  state = {
    url: null,
    sudah: 0,
    belum: 0,
    dataKetua: [],
    jumlah: 0
  };
  componentDidMount() {
    this.setState({ url: window.location.pathname });
  }
  render() {
    return (
      <div>
        <Navbar />
        <div className="admin_content">
          {this.state.url === "/!/dashboard" ? (
            <Dashboard />
          ) : this.state.url === "/!/data" ? (
            <Data />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default Admin;
/* <ChartPemilih sudah={this.state.sudah} belum={this.state.belum} />
  <ChartRekapitulasi data={this.state.dataKetua} />
  <PemilihOnline />
  <TabelPemilih /> */
