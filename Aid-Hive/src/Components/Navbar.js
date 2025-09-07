import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from '@fortawesome/free-solid-svg-icons'; // Import the user icon

import "../Styles/Navbar.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


function Navbar() {
  const [nav, setNav] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);

  const openNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    if (showChatbot) {
      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.defer = true;

      window.embeddedChatbotConfig = {
        chatbotId: "_t3YtD_O9NLMjn4ZZlCET",
        domain: "www.chatbase.co",
      };

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [showChatbot]);

  const handleChatBtnClick = () => {
    if (!isButtonDisabled) {
      toast.info("Experiencing high traffic. Please wait a moment.Chatbot will show on bottom Right side", {
        position: toast.POSITION.TOP_CENTER,
        onOpen: () => setIsButtonDisabled(true),
        onClose: () => setIsButtonDisabled(false),
      });
      setShowChatbot(true); // Show chatbot iframe when button is clicked
    }
  };


  return (
    <div className="navbar-section">
      <h1 className="navbar-title">
        <Link to="/">
          Aid Hive
        </Link>
      </h1>

      {/* Desktop */}
      <ul className="navbar-items">
        <li>
          <Link to="/" className="navbar-links">
            Home
          </Link>
        </li>
        <li>
        <Link to="/BloodDonation" className="navbar-links">
            Donate
          </Link>
        </li>
        <li>
          <Link to="/appointment" className="navbar-links">
            Find Blood
          </Link>
        </li>
        <li>
          <Link to="/jztworkers" className="navbar-links">
            Aidhive Workers
          </Link>
        </li>
        <li>
          <a href="#about" className="navbar-links">
            About Us
          </a>
        </li>
        <Link to="/jztworkers2" className="navbar-btn" style={{ textDecoration: 'none',paddingRight: '30px',marginleft: '-180px',display: 'flex' }}>
  <FontAwesomeIcon icon={faUser} style={{ marginRight: '5px' }} />

  Aid Hive Admin
</Link>
      </ul>

  
      


      {/* <button
        className="navbar-btn"
        type="button"
        disabled={isButtonDisabled}
        onClick={handleChatBtnClick}
      >
        <FontAwesomeIcon icon={faCommentDots} /> Live chatbot
      </button> */}
      
     
    

      {/* Mobile */}
      <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
        <div onClick={openNav} className="mobile-navbar-close">
          <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
        </div>

        <ul className="mobile-navbar-links">
                 <li>
                   <Link onClick={openNav} to="/">
                     Home
                   </Link>
                 </li>
                 <li>
                   <Link onClick={openNav} to="/BloodDonation">
                     Donate
                   </Link>
                 </li>
                 <li>
                   <Link onClick={openNav} to="/appointment">
                     Find Donor
                   </Link>
                 </li>
                 <li>
                   <Link onClick={openNav} to="/jztworkers">
                     AIDHIVE Workers
                   </Link>
                 </li>        
                 <li>
                   <Link onClick={openNav} to="/jztworkers2">
                     Admin
                   </Link>
                 </li>
               </ul>
      </div>

      {/* Hamburger Icon */}
      <div className="mobile-nav">
        <FontAwesomeIcon
          icon={faBars}
          onClick={openNav}
          className="hamb-icon"
        />
      </div>
    </div>
  );
}

export default Navbar;
