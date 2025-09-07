import React, { useEffect, useState } from "react";
import Doctor from "../Assets/blood-doctor.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart,faTint, faAngleUp } from "@fortawesome/free-solid-svg-icons";

import { useNavigate  } from "react-router-dom";
import "../Styles/Hero.css";

function Hero() {
  const navigate = useNavigate();
  const [goUp, setGoUp] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookAppointmentClick = () => {
    navigate("/appointment");
  };
  const handleBloodDonationClick = () => {
    navigate("/bloodDonation");
  };

  useEffect(() => {
    const onPageScroll = () => {
      if (window.scrollY > 600) {
        setGoUp(true);
      } else {
        setGoUp(false);
      }
    };
    window.addEventListener("scroll", onPageScroll);

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);

  return (
    <div className="section-container">
      <div className="hero-section">
        <div className="text-section">
          {/* <p className="text-headline">❤️ Health comes first 🩸</p> */}
          <h2 className="text-title">
            Find Blood and Rigester youself As Donor to Help Humanity
          </h2>
          <p className="text-descritpion">
            This the platform that help you to save lifes and work for humanity,Thalesemia patient can
             rise request for blood and other persons can register himself as donnor.This platform is 
             under servalance of Aid-Hive.
             <br>
             </br>

          </p>
          <br>
          </br>
     <div className="bt1">    <button
            className="text-appointment-btn"
            type="button"
            onClick={handleBookAppointmentClick}
          >
            <FontAwesomeIcon icon={faTint} /> Request Blood
          </button>
         
          </div> 
          
      <div className="bt2">   <button
        className="text-appointment-btn"
        type="button"
        onClick={handleBloodDonationClick}
      >
        <FontAwesomeIcon icon={faTint} /> Donate Blood
      </button>
      <br>
      </br>
      </div> 
          <div className="text-stats">
            <div className="text-stats-container">
              <p>145k+</p>
              <p>Satisfied Patients</p>
            </div>

            <div className="text-stats-container">
              <p>50+</p>
              <p>Donors</p>
            </div>

            <div className="text-stats-container">
              <p>10+</p>
              <p>Aid-Hive Workers</p>
            </div>
          </div>
       
        </div>

        <div className="hero-image-section">
          <img className="hero-image1" src={Doctor} alt="Doctor" />
        </div>
      </div>

      <div
        onClick={scrollToTop}
        className={`scroll-up ${goUp ? "show-scroll" : ""}`}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </div>
    </div>
  );
}

export default Hero;
