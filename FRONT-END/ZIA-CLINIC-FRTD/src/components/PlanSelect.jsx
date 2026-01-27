import React, { useState } from "react";
import "../index.css";

const PlanSelect = () => {
  const [selected, setSelected] = useState("basic");

  return (
    <div className="plan-wrapper">
      <h2 className="title">Choose Your Plan</h2>
      <p className="subtitle">Simple pricing. Transparent value.</p>

      <div className="plans">
        {/* Basic Plan */}
        <div
          className={`plan-card ${selected === "basic" ? "active" : ""}`}
          onClick={() => setSelected("basic")}
        >
          <span className="radio">
            {selected === "basic" && <span className="dot"></span>}
          </span>

          <h3>Basic Access</h3>
          <p className="price">PKR 600</p>
          <p className="desc">Consultation without medicines</p>
        </div>

        {/* Premium Plan */}
        <div
          className={`plan-card ${selected === "premium" ? "active" : ""}`}
          onClick={() => setSelected("premium")}
        >
          <span className="radio">
            {selected === "premium" && <span className="dot"></span>}
          </span>

          <h3>Premium Care</h3>
          <p className="price">PKR 1000</p>
          <p className="desc">Consultation with medicines included</p>
        </div>
      </div>

      <button className="continue-btn">Continue</button>
    </div>
  );
};

export default PlanSelect;
