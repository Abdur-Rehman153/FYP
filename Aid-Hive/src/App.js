import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Legal from "./Pages/Legal";
import NotFound from "./Pages/NotFound";
import Appointment from "./Pages/Appointment";
import BloodDonation from "./Pages/BloodDonation";
import Jztworkers4 from "./Pages/Jztworkers4"; // Correct component name (capitalized)
import Jztworkers from "./Pages/Jztworkers"; // Correct component name
import Jztworkers2 from "./Pages/Jztworkers2"; // Correct component name (capitalized)
import Jztworkers3 from "./Pages/Jztworkers3"; // Correct component name (capitalized)
import Delet from "./Pages/Delet"; // Correct component name (capitalized)
import DonorsList from "./Pages/DonorsList"; 
import RecipientsList from "./Pages/RecipientsList"; 


function App() {
  return (
    <div className="App">
      <Router >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/BloodDonation" element={<BloodDonation />}/>
          <Route path="/Jztworkers" element={<Jztworkers />} /> {/* Corrected component name */}
          <Route path="/Jztworkers2" element={<Jztworkers2/>} /> {/* Corrected component name */}
          <Route path="/Jztworkers3" element={<Jztworkers3/>} /> {/* Corrected component name */}
          <Route path="/Jztworkers4" element={<Jztworkers4/>} /> {/* Corrected component name */}
          <Route path="/Delet" element={<Delet/>} /> {/* Corrected component name */}
          <Route path="/Donorslist" element={<DonorsList/>} />
          <Route path="/RecipientsList" element={<RecipientsList/>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
    

      </Router>
    </div>
  );
}

export default App;
