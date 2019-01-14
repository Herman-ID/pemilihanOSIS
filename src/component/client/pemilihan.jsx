import React, { Component } from "react";
import PemilihanCon from "./pemilihancontainer";
import PemilihanSuccess from "./pemilihanSuccess";

class Pemilihan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      terpilih: 0,
      success: false
    };
    this.onChange = this.onChange.bind(this);
    this.Clik = this.Clik.bind(this);
  }

  onChange = e => {
    this.setState({
      terpilih: e.target.value
    });
  };

  componentDidMount() {
    fetch("/api/ketua")
      .then(response => response.json())
      .then(json => this.setState({ user: json.data }));
  }

  isAuthenticated() {
    const id = localStorage.getItem("id");
    if (id === null) {
      return false;
    } else {
      return true;
    }
  }
  Clik() {
    fetch("api/vote", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        idUser: localStorage.getItem("id"),
        idKetua: parseInt(this.state.terpilih)
      })
    })
      .then(res => res.json())
      .then(json => console.log(json))
      .then(this.setState({ success: true }));
  }
  render() {
    return this.isAuthenticated() === false ? (
      (window.location.href = "/")
    ) : (
      <div>
        {this.state.success === false ? (
          <PemilihanCon
            user={this.state.user}
            terpilih={this.state.terpilih}
            Clicked={this.Clik}
            onChange={this.onChange}
          />
        ) : (
          <PemilihanSuccess
            data={this.state.user}
            terpilih={[parseInt(this.state.terpilih)]}
          />
        )}
      </div>
    );
  }
}

export default Pemilihan;
