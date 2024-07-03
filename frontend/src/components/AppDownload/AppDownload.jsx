import React from "react";
import "./AppDownload.css";
import { assets } from "../../assets/assets";
const AppDownload = () => {
  return (
    <div className="app-download" id="app-download">
      <p>
        For Better Experience Download <br />
        Bite App
      </p>
      <div className="app-download-platforms">
        <img src={assets.app_store} alt="" />
        <img className="gg_play" src={assets.gg_play} alt="" />
      </div>
    </div>
  );
};

export default AppDownload;
