import React, { useState} from "react";
import "../Styles/BloodDonationForm.css";
import Navbar from "./Navbar copy 2";
import { ToastContainer} from "react-toastify";
import Axios from "axios";
function Delete(){
  const [name, setname] = useState("");



  const [deletejztStatus, setdeletejztStatus] = useState("");

  const deletejzt = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/deletejzt", {
      name: name,
    
    
      /*
      monthlyIncome: monthlyIncome,
      medicalConditions: medicalConditions,*/
      
    }).then((response) => {
      // setdeletejztStatus(response);
      // console.log(response);
      if(response.data.message){
        setdeletejztStatus(response.data.message);
      }else{
        setdeletejztStatus("Data send SUCCESSFULLY");
      }
    })
  }

  return (
    <><div className="home-section">
      <Navbar />

    </div><div className="appointment-form-section">
   
          
       

        <div className="form-container">
          <h2 className="form-title">
            <span>Deletion Form</span>
          </h2>

          <form className="form-content"  onSubmit={deletejzt}>
 
            <label>
             Full Name:
              <input
                type="text"
                name="Name"
                onChange={(e) => {setname(e.target.value)}} placeholder="Enter Name of Person you want to delete" required />
          
            </label>

            <br />
            
      
      


            <button type="submit" className="text-appointment-btn" onClick={deletejzt} >
              Confirm
            </button>
            <h3 >{deletejztStatus}</h3>

          </form>
          <br>
</br>
<br>
</br>
<br>
</br><br>
</br>
<br>
</br>
<br>
</br>
<br>
</br>
<br>
</br>
<br>
</br>
<br>
</br>
<br>
</br>
<br>
</br>
        </div>

        <div className="legal-footer">
          <p>© 2025-2026 Aid-Hive. All rights reserved to Aid-Hive.</p>
        </div>

        <ToastContainer autoClose={5000} limit={1} closeButton={false} />
      </div></>
  );
}

export default Delete;
