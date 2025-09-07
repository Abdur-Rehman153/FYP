import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/BloodDonationForm.css";
import Navbar from "../Components/Navbar copy";
import { ToastContainer } from "react-toastify";
import Axios from "axios";

function DonarForm() {
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [number, setnumber] = useState("");
  const [cnic, setcnic] = useState("");
  const [dob, setdob] = useState("");
  const [gender, setgender] = useState("");
  const [address, setaddress] = useState("");
  const [country, setcountry] = useState("");
  const [province, setprovice] = useState("");
  const [city, setcity] = useState("");
  const [bloodGroup, setbloodGroup] = useState("");
  const [age, setage] = useState("");

  const [registerStatus, setRegisterStatus] = useState("");

  const register = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/register", {
      name,
      email,
      number,
      gender,
      cnic,
      dob,
      age,
      address,
      country,
      province,
      city,
      bloodGroup,
    }).then((response) => {
      if (response.data.message) {
        setRegisterStatus(response.data.message);
      } else {
        setRegisterStatus("Data sent SUCCESSFULLY");
      }
       // Reset form fields after successful submission
       setemail("");
       setname("");
       setnumber("");
       setcnic("");
       setdob("");
       setgender("");
       setaddress("");
       setcountry("");
       setprovice("");
       setcity("");
       setbloodGroup("");
       setage("");
    });
  };

  return (
    <>
      <div className="home-section">
        <Navbar />
      </div>

      <div className="appointment-form-section">
        <div className="form-container">
          <h2 className="form-title">
            <span>Blood Donation Form</span>
          </h2>

          <form className="form-content" onSubmit={register}>
            <label>
              Full Name:
              <input
                type="text"
                name="Name"
                onChange={(e) => setname(e.target.value)}
                placeholder="Enter your Name"
                required
              />
            </label>
            <br />

            <label>
              Email:
              <input
                type="email" 
                name="email"
                onChange={(e) => setemail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </label>
            <br />

            <label>
              Phone Number:
              <input
                type="tel"
                name="number"
                pattern="[0-9]{10,11}" //10-11 digits
                onChange={(e) => setnumber(e.target.value)}
                placeholder="Enter your Phone Number"
                required
              />
            </label>
            <br />

            <label>
              Gender:
              <select
                value={gender}
                name="gender"
                onChange={(e) => setgender(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="private">Rather not Say</option>
              </select>
            </label>
            <br />

            <label>
              CNIC Number:
              <input
                type="text"
                name="cnic"
                pattern="[0-9]{13}" //13 digits
                onChange={(e) => setcnic(e.target.value)}
                placeholder="Enter your CNIC (13 digits)"
                required
              />
            </label>
            <br />

            <label>
              Date of Birth:
              <input
                type="date"
                name="dob"
                onChange={(e) => setdob(e.target.value)}
                required
              />
            </label>
            <br />

            <label>
              Age:
              <input
                type="number"
                name="age"
                min="18"
                max="65" //donors age range
                onChange={(e) => setage(e.target.value)}
                placeholder="Enter your age"
                required
              />
            </label>
            <br />

            <label>
              Address:
              <input
                type="text"
                name="address"
                onChange={(e) => setaddress(e.target.value)}
                placeholder="Enter your address"
                required
              />
            </label>
            <br />

            <label>
              Country:
              <input
                type="text"
                name="country"
                onChange={(e) => setcountry(e.target.value)}
                placeholder="Enter your Country"
                required
              />
            </label>
            <br />

            <label>
              Province:
              <input
                type="text"
                name="province"
                onChange={(e) => setprovice(e.target.value)}
                placeholder="Enter your Province"
                required
              />
            </label>
            <br />

            <label>
              City:
              <input
                type="text"
                name="city"
                onChange={(e) => setcity(e.target.value)}
                placeholder="Enter your city"
                required
              />
            </label>
            <br />

            <label>
              Blood Group:
              <select
                name="bloodGroup"
                onChange={(e) => setbloodGroup(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </label>
            <br />

            <button type="submit" className="text-appointment-btn">
              Confirm
            </button>
            <h3>{registerStatus}</h3>
          </form>
        </div>

        <div className="legal-footer">
          <p>© 2025-2026 Aid Hive. All rights reserved to AidHive.</p>
        </div>

        <ToastContainer autoClose={5000} limit={1} closeButton={false} />
      </div>
    </>
  );
}

export default DonarForm;
