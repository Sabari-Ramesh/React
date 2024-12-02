import React, { Component } from "react";
import image from "./advertiseimage/SocialAdvertise.png";
class Advertisement extends Component {
  render() {
    return (
      <>
        <h4 className="text-center">Advertisement</h4>
        <img
          src={image}
          alt="Advertisement"
          style={{
            width: "330px",
            height: "600px",
            objectFit: "cover",
          }}
        />
      </>
    );
  }
}

export default Advertisement;
