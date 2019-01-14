import React, { Component } from "react";
import Bg from "../../asset/image/clientBg.jpg";
import Biodata from "./biodata";

class PemilihanContainer extends Component {
  style = {
    backgroundImage: "url('" + Bg + "')"
  };
  render() {
    return (
      <div className="client__login" style={this.style}>
        <div className="pemilihan__avatar row">
          {this.props.user.map(user => (
            <div key={user.id}>
              <input
                type="radio"
                name="ketua"
                value={user.id}
                id={user.id}
                className="input-hidden"
                onClick={this.props.onChange}
              />
              <label htmlFor={user.id}>
                <img src={user.photo} alt={user.nama} />
              </label>
            </div>
          ))}
        </div>
        {this.props.terpilih === 0 ? (
          ""
        ) : (
          <div className="div-pemilih">
            <button
              className="btn btn-primary pilih__button"
              onClick={this.props.Clicked}
            >
              Lanjut
            </button>
            <Biodata
              terpilih={parseInt(this.props.terpilih, 10)}
              data={this.props.user}
            />
          </div>
        )}
      </div>
    );
  }
}

export default PemilihanContainer;
