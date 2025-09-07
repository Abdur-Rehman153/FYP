import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from '@fortawesome/free-solid-svg-icons'; // Import the user icon
import { useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


function Navbar() {
  const [nav, setNav] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
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
  }

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem('authToken'); // Clear authentication data
      navigate("/jztworkers2", { replace: true }); // Use navigate correctly
    }
  };


  return (
    <div className="navbar-section">
      <h1 className="navbar-title">
        <Link >
          Aid Hive
        </Link>
      </h1>

      {/* Desktop */}
      <ul className="navbar-items">
      <Link to="/jztworkers3" style={{ textDecoration: 'none' }}>
  <button style={{ backgroundColor: 'red', color: 'white', float: 'right', margin: '10px 20px 10px 0',gap: '7px',borderRadius: '16px',  }}>
    Admin Home
  </button>
</Link>

<Link to="/Jztworkers4" style={{ textDecoration: 'none' }}>
  <button style={{ backgroundColor: 'red', color: 'white', float: 'right', margin: '10px 20px 10px 0',borderRadius: '16px', }}>
    Add Worker
  </button>
</Link>

<Link to="/Delet" style={{ textDecoration: 'none' }}>
  <button style={{ backgroundColor: 'red', color: 'white', float: 'right', margin: '10px 20px 10px 0',borderRadius: '16px', }}>
    Delete Worker
  </button>
</Link>

<Link to="/DonorsList" style={{ textDecoration: 'none' }}>
  <button style={{ backgroundColor: 'red', color: 'white', float: 'right', margin: '10px 20px 10px 0',borderRadius: '16px', }}>
    Donors
  </button>
</Link>

<Link to="/RecipientsList" style={{ textDecoration: 'none' }}>
  <button style={{ backgroundColor: 'red', color: 'white', float: 'right', margin: '10px 20px 10px 0',borderRadius: '16px', }}>
    Recipients
  </button>
</Link>
    
     {/* 
<Link to="/jztworkers2" className="navbar-btn" style={{ textDecoration: 'none',paddingRight: '30px',marginleft: '-180px',display: 'flex' }}>
  <FontAwesomeIcon icon={faUser} style={{ marginRight: '5px' }} />

  JZT Admin
</Link>
*/}

      </ul>
      <div style={{ display: 'flex', gap: '10px' }}>
      <button
        className="navbar-btn"
        type="button"
     
        onClick={handleLogout}      >
 <FontAwesomeIcon icon={faUser} /> Logout      </button>

   {/*   <button
        className="navbar-btn"
        type="button"
        disabled={isButtonDisabled}
        onClick={handleChatBtnClick}
      >
        <FontAwesomeIcon icon={faCommentDots} /> Live chatbot
      </button>
*/}
      </div>
    

      {/* Mobile */}
      <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
        <div onClick={openNav} className="mobile-navbar-close">
          <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
        </div>

        <ul className="mobile-navbar-links">
          <li>
            <Link onClick={openNav} to="/jztworkers3">
              Admin Home
            </Link>
          </li>
          <li>
            <Link onClick={openNav} to="/Jztworkers4">
              Add Person
            </Link>
          </li>
          <li>
            <Link onClick={openNav} to="/Delet">
              Delete Person
            </Link>
          </li>
          <li>
            <Link onClick={openNav} to="/DonorsList">
              Donors
            </Link>
          </li>        
          <li>
            <Link onClick={openNav} to="/RecipientsList">
              Recipients 
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
