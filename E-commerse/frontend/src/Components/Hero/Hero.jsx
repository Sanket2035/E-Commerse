import React from "react";
import "./Hero.css";
import hand_image from "../Assets/hand.png";
import arrow_image from "../Assets/arrow-image.png";
import hero_image from "../Assets/hero_image.jpg";
const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>New arrivals only</h2>
        <div>
          <div className="hero-hand-icon">
            <p>new</p>
            <img src={hand_image} alt="hand" />
          </div>
          <p>collections</p>
          <p>for everyone</p>
        </div>
        <div className="hero-latest-btn">
          <div>Latest Collect</div>
          <img src={arrow_image} alt="hero" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="" />
      </div>
    </div>
  );
};

export default Hero;
