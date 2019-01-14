import React, { Component } from "react";
class Biodata extends Component {
  state = {};
  render() {
    return (
      <div className="data-ketua">
        <table className="table">
          <tbody>
            <tr>
              <td>Nama</td>
              <td>{this.props.data[this.props.terpilih - 1].nama}</td>
            </tr>
            <tr>
              <td>Kelas</td>
              <td>{this.props.data[this.props.terpilih - 1].kelas}</td>
            </tr>
            <tr>
              <td>TTL</td>
              <td>{this.props.data[this.props.terpilih - 1].ttl}</td>
            </tr>
            <tr>
              <td>Visi</td>
              <td>{this.props.data[this.props.terpilih - 1].visi}</td>
            </tr>
            <tr>
              <td>Misi</td>
              <td>{this.props.data[this.props.terpilih - 1].misi}</td>
            </tr>
            <tr>
              <td>Prestasi</td>
              <td>{this.props.data[this.props.terpilih - 1].prestasi}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Biodata;
