import React, { useEffect, useState } from 'react';
import "../Styles/jzt.css";
import { Link } from "react-router-dom";
import Navbar from "./Navbar copy 2";

function Jztworker3() {
  const [jztWorkers, setJztWorkers] = useState([]);

  useEffect(() => {
    const getJztWorkers = async () => {
      try {
        const reqData = await fetch("http://localhost:3001/api/jzt"); // Assuming '/api/jzt' is the correct endpoint
        const resData = await reqData.json();
        setJztWorkers(resData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getJztWorkers();
  }, []);

  return (
    <div>
      <Navbar />
   
    <div className='jaz'    >
 
    

      
      <table style={{ width: '100%' }}>

        <thead>
        <h1 style={{ backgroundColor: 'transparent', borderBottom: '4px solid red', display: 'inline-block', }}>Person Details</h1>
        <tr style={{  borderBottom: '2px solid black' }}>
       
    <th><span>Name</span></th>
    <th><span>City</span></th>
    <th><span>Address</span></th>
    <th><span>Phone Number</span></th>
    <th><span>Status</span></th>
  </tr>
        </thead>
        <tbody >
        {jztWorkers.map((worker, index) => (
              <tr key={index}>
                
                <td style={{ borderRight: '2px solid black', borderBottom: '2px solid black' }}>{worker.name}</td>
                <td style={{ borderRight: '2px solid black', borderBottom: '2px solid black' }}>{worker.city}</td>
                <td style={{ borderRight: '2px solid black', borderBottom: '2px solid black' }}>{worker.address}</td>
                <td style={{ borderRight: '2px solid black', borderBottom: '2px solid black' }}>{worker.phone}</td>
                <td style={{ borderRight: '2px solid black', borderBottom: '2px solid black' }}>{worker.status === 'Active' ? 'Active' : 'Inactive'}</td>
                
                        </tr>
                        )) 
                        }                        
                        </tbody>
      </table>
      </div>
      <div className="legal-footer">
    <p>© 2025-2026 Aid Hive. All rights reserved to Aid Hive.</p>
  </div>
    </div>
    
  
  );
};

export default Jztworker3;
