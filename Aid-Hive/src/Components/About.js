import React from "react";
import Doctor from "../Assets/doctor-group.png";
import SolutionStep from "./SolutionStep";
import "../Styles/About.css";

function About() {
  return (
    <div className="about-section" id="about">
      <div className="about-image-content">
        <img src={Doctor} alt="Doctor Group" className="about-image1" />
      </div>

      <div className="about-text-content">
        <h3 className="about-title">
          <span>About Us</span>
        </h3>
        <p className="about-description">
          Welcome to Aid-Hive, your trusted platform for accessible and
          personalized healthcare. Our expert Aid-Hive Workers offer online consultations
          and specialized services, prioritizing your well-being. Join us on
          this journey towards a healthier you.
        </p>

        <h4 className="about-text-title">Your Solutions</h4>

        <SolutionStep
          title="Requet a Blood Group"
          description="Our dedicated team of hematologists and medical specialists employs cutting-edge technology to address your blood-related needs and develop customized treatment strategies. "
        />

        <SolutionStep
          title="Become Donor"
          description="From organizing blood drives to collecting life-saving donations, we are committed to fostering a community of giving that contributes to the well-being of others. 
          Join us in making a difference through the simple yet powerful act of blood donation."
        />

        <SolutionStep
          title="Get Your Solutions"
          description="Our experienced Welfare Workers and specialists are here to provide expert advice and personalized treatment plans, helping you achieve your best possible health."
        />
      </div>
    </div>
  );
}

export default About;
