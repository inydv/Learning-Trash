import React from "react";
import "../Styles/Contact.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import NewsLetter from "../Components/NewsLetter";

function Contact() {
  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <h3 className="title">Contact</h3>
        <form className="form">
          <fieldset className="fieldForName">
            <legend className="nameLegend">Name *</legend>
            <div className="firstName">
              <label className="firstNameLabel">
                <input type="text" className="firstNameInput" />
                <span className="firstNameSpan">First Name</span>
              </label>
            </div>
            <div className="lastName">
              <label className="lastNameLabel">
                <input type="text" className="lastNameInput" />
                <span className="lastNameSpan">Last Name</span>
              </label>
            </div>
          </fieldset>

          <div className="email">
            <label className="emailLabel">Email *</label>
            <input type="email" className="emailInput" />
          </div>

          <div className="subject">
            <label className="subjectLabel">Subject *</label>
            <input type="text" className="subjectInput" />
          </div>

          <div className="message">
            <label className="messageLabel">Message *</label>
            <textarea className="messageTextarea"></textarea>
          </div>

          <div className="btn">
            <button>Submit</button>
          </div>
        </form>
      </div>
      <NewsLetter />
      <Footer />
    </div>
  );
}

export default Contact;
