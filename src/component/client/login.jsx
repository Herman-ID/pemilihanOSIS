import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Bg from "../../asset/image/clientBg.jpg";
import Osis from "../../asset/image/osis.png";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nama: "",
      pass: "",
      value: ""
    };

    this.style = {
      backgroundImage: "url('" + Bg + "')"
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
    fetch("api/auth", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        nama: this.state.nama,
        password: this.state.pass
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.panjang === 0) {
          alert("nama atau password salah");
        } else {
          if (json.data[0].islock == 1) {
            fetch("api/deauth", {
              method: "POST",
              headers: {
                "content-type": "application/json"
              },
              body: JSON.stringify({
                id: json.data[0].id
              })
            });
            alert("anda sudah melakukan voting");
          } else {
            localStorage.setItem("id", json.data[0].id);
            window.location.href = "/pemilih";
          }
        }
      });
  }
  isAuthenticated() {
    const id = localStorage.getItem("id");
    return id && id.length > 0;
  }
  render() {
    return this.isAuthenticated() === true ? (
      (window.location.href = "/pemilih")
    ) : (
      <div>
        <div className="client__login" style={this.style}>
          <div className="client__login-logo">
            <img
              className="client__login-logo__osis"
              src={Osis}
              alt="Logo Osis"
            />
          </div>
          <h1 className="client__login-title">
            Pemilihan Ketua OSIS Masa Periode 2018/2019
          </h1>
          <p className="client__login-subtitle">
            Masukan nama anda dan gunakan password yang diberikan petugas
          </p>
          <form className="client__login-form row" onSubmit={this.onSubmit}>
            <input
              type="text"
              name="nama"
              placeholder="username"
              value={this.state.nama}
              onChange={this.onChange}
              className="client__login-form__input"
            />
            <input
              type="password"
              name="pass"
              placeholder="password"
              value={this.state.pass}
              onChange={this.onChange}
              className="client__login-form__input"
            />
            <input type="submit" value="Masuk" />
          </form>
          <p className="client__login-about">Tim IT SMA Negeri 1 Jamblang</p>
        </div>
      </div>
    );
  }
}

export default Login;
