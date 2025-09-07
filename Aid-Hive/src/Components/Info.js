import React from "react";
import InformationCard from "./InformationCard";
import { faHeartPulse, faTruckMedical, faTooth } from "@fortawesome/free-solid-svg-icons";
import "../Styles/Info.css";

function Info() {
  return (
    <div className="info-section" id="services">
      <div className="info-title-content">
        <h3 className="info-title">
          <span>What We Do</span>
        </h3>
        <p className="info-description">
          We bring healthcare to your convenience, offering a comprehensive
          range of on-demand blood Group to save lifes. Our
          platform allows you to connect with Donors who can
          provide  Blood of different Blood Group and offer
          quick way to help Humanity around the world.All this is done under servalance of  <b>Aid-Hive</b>.
        </p>
      </div>

      <div className="info-cards-content">
        <InformationCard
          title="Emergency Care"
          description="Our Emergency Care service is designed to be your reliable support
            in critical situations. Whether it's a sudden blood requirement or
            any medical concern that requires immediate attention, our team of
            dedicated Aid-Hive professionals are available 24/7 to provide
            prompt and efficient care."
          icon={faTruckMedical}
        />

        <InformationCard
          title="Blood Request"
          description="
          Our dedicated team of hematologists and medical specialists employs cutting-edge technology to address your 
          blood-related needs and develop customized treatment strategies. Whether you require thorough blood screenings or
           advanced therapeutic interventions, we are devoted to supporting you in maintaining optimal blood health. Our mission is to ensure that you receive the personalized care necessary for a vibrant and fulfilling life."
          icon={faHeartPulse}
        />

        <InformationCard
          title="Donate For Humanity"
          description="Give with compassion as our Blood Donation services address a crucial need in healthcare.
           Our dedicated team facilitates the donation process, ensuring a seamless and positive experience for both donors and recipients. 
           From organizing blood drives to collecting life-saving donations, we are committed to fostering a community of giving that contributes to the well-being of others.
           Join us in making a difference through the simple yet powerful act of blood donation."
          icon={faTooth}
        />
      </div>
    </div>
  );
}

export default Info;
