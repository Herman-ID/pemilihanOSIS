import React, { Component } from "react";

class TabelPemilih extends Component {
  state = {
    user: []
  };
  componentDidMount() {
    fetch("/api/user")
      .then(res => res.json())
      .then(data => this.setState({ user: data }));
  }
  render() {
    return this.state.user === [] ? (
      "data tidak ada"
    ) : (
      <table className="table">
        <th>id</th>
        <th>nama</th>
        <th>keterangan</th>
        <th>waktu</th>
        <th>sudah memilih</th>
        <tbody>
          {this.state.user.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nama}</td>
              <td>{user.keterangan}</td>
              <td>{user.waktu}</td>
              <td>{user.islock === 1 ? "sudah" : "belum"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default TabelPemilih;
