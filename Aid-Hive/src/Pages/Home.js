import React from "react";
import Navbar from "../Components/Navbar";
import TV from "../Components/TV";
import Hero from "../Components/Hero";
import Info from "../Components/Info";
import About from "../Components/About";
import BookAppointment from "../Components/BookAppointment";
import Reviews from "../Components/Reviews";
// import Doctors from "../Components/Doctors";
import Footer from "../Components/Footer";

function Home() {
  return (
    <div className="home-section"     style={{ backgroundColor:'transparent' }}>
    
      <Navbar />
      <TV />
      <Hero />
      <Info />
      <About />
      {/* <BookAppointment /> */}
      {/* <Doctors />  */}
      <Reviews />    
      <Footer />
    </div>
  );
}

export default Home;
