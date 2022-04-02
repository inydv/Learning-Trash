import React from "react";
import Navbar from "../Components/Navbar";
import NewsLetter from "../Components/NewsLetter";
import Footer from "../Components/Footer";
import "../Styles/AfterSubmitForm.css";

function AfterSubmitForm() {
  return (
    <div className="AfterSubmitForm">
      <Navbar />
      <h1 className="thanks">Thanks For Contact Us...</h1>
      <NewsLetter />
      <Footer />
    </div>
  );
}

export default AfterSubmitForm;
