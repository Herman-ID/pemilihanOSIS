import React, { Component } from "react";

class GetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nama: "",
      pass: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  onSubmit(event) {
    event.preventDefault();
    let val = "saya";
    fetch("../api/getpassword", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        nama: this.state.nama,
        password: val
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.data.affectedRows === 0) {
          this.setState({ pass: "Nama yang anda masukan salah" });
        } else {
          this.setState({ pass: val });
        }
        console.log(json, val);
      });
  }
  render() {
    return (
      <div className="getpassword">
        <h4>Mendapat Password</h4>
        <p>Masukan namanya saja</p>
        <form className="password-form row" onSubmit={this.onSubmit}>
          <input
            type="text"
            name="nama"
            placeholder="username"
            value={this.state.nama}
            onChange={this.onChange}
            className="password-form__input"
          />
          <input
            type="text"
            name="pass"
            placeholder="password"
            value={this.state.pass}
            onChange={this.onChange}
            className="password-form__input"
            disabled
          />
          <input type="submit" value="Dapatkan Password" />
        </form>
      </div>
    );
  }
}

export default GetPassword;
