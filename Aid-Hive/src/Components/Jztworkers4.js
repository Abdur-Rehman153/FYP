import React, { useState } from "react";
import "../Styles/BloodDonationForm.css";
import Navbar from "./Navbar copy 2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";

function Jztworkers4() {
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [status, setstatus] = useState("");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [addjztStatus, setaddjztStatus] = useState("");

  // Validation function
  const validateForm = () => {
    if (!name.trim()) {
      toast.error("⚠️ Name is required!");
      return false;
    }
    if (!city.trim()) {
      toast.error("⚠️ City is required!");
      return false;
    }
    if (!address.trim()) {
      toast.error("⚠️ Address is required!");
      return false;
    }
    if (!phone.trim()) {
      toast.error("⚠️ Phone number is required!");
      return false;
    }
    if (!/^[0-9]{10,15}$/.test(phone)) {
      toast.error("⚠️ Phone number must be 10–15 digits!");
      return false;
    }
    if (!status.trim()) {
      toast.error("⚠️ Status is required!");
      return false;
    }
    return true;
  };

  const addjzt = (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Stop if validation fails

    Axios.post("http://localhost:3001/addjzt", {
      name,
      city,
      address,
      phone,
      status,
    })
      .then((response) => {
        if (response.data.message) {
          setaddjztStatus(response.data.message);
          toast.success(response.data.message, { autoClose: 3000 });
        } else {
          setaddjztStatus("Data sent SUCCESSFULLY!");
          toast.success("Data sent SUCCESSFULLY!", { autoClose: 3000 });
        }

        // Reset form fields after successful submission
        setname("");
        setcity("");
        setaddress("");
        setphone("");
        setstatus("");
      })
      .catch((error) => {
        if (error.response && error.response.data.message) {
          toast.error(error.response.data.message, { autoClose: 3000 });
        } else {
          toast.error("Something went wrong!", { autoClose: 3000 });
        }
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
            <span>Aidhive Workers Data Insertion Form</span>
          </h2>

          <form className="form-content" onSubmit={addjzt}>
            <label>
              Full Name:
              <input
                type="text"
                name="Name"
                value={name}
                onChange={(e) => setname(e.target.value)}
                placeholder="Enter Name"
              />
            </label>
            <br />

            <label>
              City:
              <input
                type="text"
                name="city"
                value={city}
                onChange={(e) => setcity(e.target.value)}
                placeholder="Enter city"
              />
            </label>
            <br />

            <label>
              Address:
              <input
                type="text"
                name="address"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
                placeholder="Enter address"
              />
            </label>
            <br />

            <label>
              Phone Number:
              <input
                type="text"
                name="phone"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
                placeholder="Enter Phone Number"
              />
            </label>
            <br />

            <label>
              Status:
              <select
                name="status"
                value={status}
                onChange={(e) => setstatus(e.target.value)}
              >
                <option value="">-- Select Status --</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </label>

            <br />

            <button type="submit" className="text-appointment-btn">
              Confirm
            </button>
            <h3>{addjztStatus}</h3>
          </form>
        </div>

        <div className="legal-footer">
          <p>© 2025-2026 Aid-Hive. All rights reserved to Aid-Hive.</p>
        </div>
      </div>

      {/* Toast container to display popups */}
      <ToastContainer position="top-right" />
    </>
  );
}

export default Jztworkers4;
