import React from "react";

import "./styles.css"


const Preloader = (props) => {
  return (
    <div className="loader">
      <div className="loader-container text-center">
        <h3><b>Please wait a moment while we are preparing the content!</b></h3>
        <div className="sk-cube-grid">
          <div className="sk-cube sk-cube1"/>
          <div className="sk-cube sk-cube2"/>
          <div className="sk-cube sk-cube3"/>
          <div className="sk-cube sk-cube4"/>
          <div className="sk-cube sk-cube5"/>
          <div className="sk-cube sk-cube6"/>
          <div className="sk-cube sk-cube7"/>
          <div className="sk-cube sk-cube8"/>
          <div className="sk-cube sk-cube9"/>
        </div>
      </div>
    </div>
  )
};

export default Preloader;