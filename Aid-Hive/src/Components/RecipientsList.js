import React, { useEffect, useState } from "react";
import "../Styles/jzt.css"; 
import Navbar from "./Navbar copy 2";

function RecipientsList() {
  const [recipients, setRecipients] = useState([]);
  const [filteredRecipients, setFilteredRecipients] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [bloodFilter, setBloodFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  
   // Filter logic
    useEffect(() => {
      let data = recipients;

      if (searchTerm) {
        data = data.filter(
          (recipient) =>
            recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recipient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recipient.cnic.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
  
      if (bloodFilter) {
        data = data.filter((recipient) => recipient.bloodGroup === bloodFilter);
      }
  
      if (cityFilter) {
        data = data.filter((recipient) => recipient.city === cityFilter);
      }

      setFilteredRecipients(data);
    }, [searchTerm, bloodFilter, cityFilter, recipients]);

    // const uniqueCities = [...new Set(recipients.map((r) => r.city))];

  // New states for editing
  const [editingRecipient, setEditingRecipient] = useState(null);
  const [formData, setFormData] = useState({});

  // Fetch recipients from backend
  useEffect(() => {
    const getRecipients = async () => {
      try {
        const reqData = await fetch("http://localhost:3001/recipients"); 
        const resData = await reqData.json();
        setRecipients(resData);
        setFilteredRecipients(resData);
      } catch (error) {
        console.error("Error fetching recipients data:", error);
      }
    };
    getRecipients();
  }, []);

  // Filter logic
  useEffect(() => {
    let data = recipients;

    if (searchTerm) {
      data = data.filter(
        (recipient) =>
          recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipient.cnic.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (bloodFilter) {
      data = data.filter((recipient) => recipient.bloodGroup === bloodFilter);
    }

    if (cityFilter) {
      data = data.filter((recipient) => recipient.city === cityFilter);
    }

    setFilteredRecipients(data);
  }, [searchTerm, bloodFilter, cityFilter, recipients]);

  // Unique cities for dropdown
  const uniqueCities = [...new Set(recipients.map((r) => r.city))];

  // Delete handler
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await fetch(`http://localhost:3001/recipients/${id}`, {
          method: "DELETE",
        });
        setRecipients((prev) => prev.filter((r) => r.id !== id));
      } catch (error) {
        console.error("Error deleting recipient:", error);
      }
    }
  };

  // Edit handlers
  const handleEdit = (recipient) => {
    setEditingRecipient(recipient.id);
    setFormData(recipient);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await fetch(`http://localhost:3001/recipients/${editingRecipient}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setRecipients((prev) =>
        prev.map((r) => (r.id === editingRecipient ? formData : r))
      );
      setEditingRecipient(null);
    } catch (error) {
      console.error("Error updating recipient:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="jaz">
        {/* Filters Section */}
        {/* Filters Section */}
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <input
            type="text"
            placeholder="🔍 Search by Name, Email or CNIC"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "8px",
              marginRight: "10px",
              borderRadius: "5px",
              border: "1px solid gray",
              width: "250px",
            }}
          />

          <select
            value={bloodFilter}
            onChange={(e) => setBloodFilter(e.target.value)}
            style={{
              padding: "8px",
              marginRight: "10px",
              borderRadius: "5px",
              border: "1px solid gray",
            }}
          >
            <option value="">Filter by Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>

          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid gray",
            }}
          >
            <option value="">Filter by City</option>
            {uniqueCities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Recipients Table */}
        <table style={{ width: "100%" }}>
          <thead>
            <h1
              style={{
                backgroundColor: "transparent",
                borderBottom: "4px solid red",
                display: "inline-block",
                textAlign: "center",
                whiteSpace: "nowrap",
                margin: "20px auto",
              }}
            >
              Recipients Information
            </h1>
            <tr style={{ borderBottom: "2px solid black" }}>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>CNIC</th>
              <th>Age</th>
              <th>Address</th>
              <th>Country</th>
              <th>Province</th>
              <th>City</th>
              <th>Blood Group</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecipients.length > 0 ? (
              filteredRecipients.map((recipient, index) => (
                <tr key={index}>
                  {editingRecipient === recipient.id ? (
                    <>
                      <td><input name="name" value={formData.name} onChange={handleInputChange} /></td>
                      <td><input name="email" value={formData.email} onChange={handleInputChange} /></td>
                      <td><input name="number" value={formData.number} onChange={handleInputChange} /></td>
                      <td><input name="gender" value={formData.gender} onChange={handleInputChange} /></td>
                      <td><input name="cnic" value={formData.cnic} onChange={handleInputChange} /></td>
                      <td><input name="age" value={formData.age} onChange={handleInputChange} /></td>
                      <td><input name="address" value={formData.address} onChange={handleInputChange} /></td>
                      <td><input name="country" value={formData.country} onChange={handleInputChange} /></td>
                      <td><input name="province" value={formData.province} onChange={handleInputChange} /></td>
                      <td><input name="city" value={formData.city} onChange={handleInputChange} /></td>
                      <td><input name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange} /></td>
                      <td>
                        <button onClick={handleUpdate}>Save</button>
                        <button onClick={() => setEditingRecipient(null)}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{recipient.name}</td>
                      <td>{recipient.email}</td>
                      <td>{recipient.number}</td>
                      <td>{recipient.gender}</td>
                      <td>{recipient.cnic}</td>
                      <td>{recipient.age}</td>
                      <td>{recipient.address}</td>
                      <td>{recipient.country}</td>
                      <td>{recipient.province}</td>
                      <td>{recipient.city}</td>
                      <td>{recipient.bloodGroup}</td>
                      <td>
                        <button onClick={() => handleEdit(recipient)}>Edit</button>
                        <button onClick={() => handleDelete(recipient.id)}>Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13" style={{ textAlign: "center", padding: "20px" }}>
                  ❌ No recipients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="legal-footer">
        <p>© 2025-2026 Aid Hive. All rights reserved to Aid Hive.</p>
      </div>
    </div>
  );
}

export default RecipientsList;
