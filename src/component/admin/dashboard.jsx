import React, { Component } from "react";
import GetPassword from "./getpassword";
import PemilihOnline from "./pemilihOnline";
import ChartRekapitulasi from "./chartRekapitulasi";
import ChartPemilih from "./chartPemilih";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sudah: 0,
      belum: 0,
      dataKetua: [],
      jumlah: 0
    };
  }
  componentDidMount() {
    fetch("/api/statpemilih")
      .then(response => response.json())
      .then(json =>
        this.setState({ sudah: json.data[0].sudah, belum: json.data[0].belum })
      );

    fetch("/api/jumlahKetua")
      .then(response => response.json())
      .then(json => this.setState({ jumlah: json }));

    fetch("/api/statKetua/")
      .then(response => response.json())
      .then(json => {
        let ro = [];
        json.map(r => ro.push(r[0]));
        this.setState({ dataKetua: ro });
      });
  }

  render() {
    return (
      <div className="dashboard_div">
        <GetPassword />
        <PemilihOnline />
        <div className="chart row">
          <ChartRekapitulasi data={this.state.dataKetua} />
          <ChartPemilih sudah={this.state.sudah} belum={this.state.belum} />
        </div>
      </div>
    );
  }
}

export default Dashboard;
