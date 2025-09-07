import React, { useEffect, useState } from "react";
import "../Styles/jzt.css"; 
import Navbar from "./Navbar copy 2";

function DonorsList() {
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [bloodFilter, setBloodFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  // Fetch donors from backend
  useEffect(() => {
    const getDonors = async () => {
      try {
        const reqData = await fetch("http://localhost:3001/donors"); 
        const resData = await reqData.json();
        setDonors(resData);
        setFilteredDonors(resData);
      } catch (error) {
        console.error("Error fetching donors data:", error);
      }
    };
    getDonors();
  }, []);

  // Filter logic
  useEffect(() => {
    let data = donors;

    if (searchTerm) {
      data = data.filter(
        (donor) =>
          donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          donor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          donor.cnic.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (bloodFilter) {
      data = data.filter((donor) => donor.bloodGroup === bloodFilter);
    }

    if (cityFilter) {
      data = data.filter((donor) => donor.city === cityFilter);
    }

    setFilteredDonors(data);
  }, [searchTerm, bloodFilter, cityFilter, donors]);

  const uniqueCities = [...new Set(donors.map((d) => d.city))];

  // Edit donor
  const handleEdit = (donor) => {
    setEditingId(donor._id || donor.id || donor.donor_id);
    setFormData({ ...donor });
  };

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);
    setFormData({});
  };

  // Save edited donor
  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:3001/donors/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Update failed");

      setDonors((prev) =>
        prev.map((d) =>
          (d._id || d.id || d.donor_id) === editingId ? formData : d
        )
      );
      setEditingId(null);
    } catch (err) {
      console.error("Error updating donor:", err);
      alert("Update failed. Please try again.");
    }
  };

  // Delete donor
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/donors/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");

      setDonors((prev) => prev.filter((d) => (d._id || d.id || d.donor_id) !== id));
    } catch (err) {
      console.error("Error deleting donor:", err);
      alert("Delete failed. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="jaz">
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

        {/* Donors Table */}
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
              Donors Information
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
            {filteredDonors.length > 0 ? (
              filteredDonors.map((donor, index) => {
                const id = donor._id || donor.id || donor.donor_id;
                const isEditing = editingId === id;
                return (
                  <tr key={index}>
                    {[
                      "name",
                      "email",
                      "number",
                      "gender",
                      "cnic",
                      "age",
                      "address",
                      "country",
                      "province",
                      "city",
                      "bloodGroup",
                    ].map((field, i) => (
                      <td
                        key={i}
                        style={{
                          borderRight: "2px solid black",
                          borderBottom: "2px solid black",
                        }}
                      >
                        {isEditing ? (
                          <input
                            type="text"
                            name={field}
                            value={formData[field] || ""}
                            onChange={handleChange}
                          />
                        ) : (
                          donor[field]
                        )}
                      </td>
                    ))}
                    <td style={{ borderBottom: "2px solid black" }}>
                      {isEditing ? (
                        <>
                          <button
                            onClick={handleSave}
                            style={{
                              background: "red",
                              color: "white",
                              marginRight: "5px",
                            }}
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancel}
                            style={{ background: "red", color: "white" }}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(donor)}
                            style={{
                              background: "red",
                              color: "white",
                              marginRight: "5px",
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(id)}
                            style={{ background: "red", color: "white" }}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="12" style={{ textAlign: "center", padding: "20px" }}>
                  ❌ No donors found
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

export default DonorsList;
