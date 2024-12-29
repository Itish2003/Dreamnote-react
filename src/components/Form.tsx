// import React from 'react'
// import PropTypes from 'prop-types'
import "../scss/form.scss";
import "../index.css";
import { CardBack } from "./CardBack";
import { FormPage } from "./FormPage";
import { useState } from "react";
import { CardFront } from "./CardFront";
function TestForm() {
  const [isSignUp, setIsSignUp] = useState(false); // Manage toggle state
  return (
    <>
      <div className="page-two">
        <div className="card-switch">
          <label className="switch">
            {/* <input
            type="checkbox"
            className="toggle"
            checked={isSignUp}
            onChange={() => setIsSignUp(!isSignUp)}
          /> */}
            {/* <span className="slider" /> */}
            <label className="rocker rocker-small">
              <input
                type="checkbox"
                className="toggle"
                checked={isSignUp}
                onChange={() => setIsSignUp(!isSignUp)}
              />
              <span className="switch-left">Sign Up</span>
              <span className="switch-right">Login</span>
            </label>
          </label>
        </div>

        <div className="page-2">
          <div className="card-side ">
            <div className={`flip-card-inner ${isSignUp ? "flip" : ""} `}>
              <div className="flip-card-front ">
                <CardFront />
              </div>
              <div className="flip-card-back">
                <CardBack />
              </div>
            </div>
          </div>
          <FormPage />
        </div>
      </div>
    </>
  );
}

export default TestForm;
