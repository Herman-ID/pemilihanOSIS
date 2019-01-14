import React, { Component } from "react";
import Bg from "../../asset/image/clientBg.jpg";
import Osis from "../../asset/image/osis.png";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nama: "",
      pass: ""
    };
    this.style = {
      backgroundImage: "url('" + Bg + "')"
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    this.page = "pemilihan";
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <React.Fragment>
        <div className="client__login-background" style={this.style} />
        <div className="client__login-overlay" />
        <div className="client__login">
          <div className="client__login-logo">
            <img
              className="client__login-logo__osis"
              src={Osis}
              alt="Logo Osis"
            />
          </div>
          <h1 className="client__login-title">
            Petugas Pemilihan Ketua OSIS Masa Periode 2018/2019
          </h1>
          <p className="client__login-subtitle">
            Masukan password petugas anda
          </p>
          <form className="client__login-form row" onSubmit={this.onSubmit}>
            <input
              type="password"
              name="pass"
              placeholder="password"
              value={this.state.pass}
              onChange={this.onChange}
              className="admin__login-form-pass"
            />
            <input type="submit" value="Masuk" />
          </form>
          <p className="client__login-about">
            Tim IT SMA Negeri 1 Jamblang 2018
          </p>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
