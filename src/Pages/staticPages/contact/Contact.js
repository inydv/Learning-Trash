import React, { useEffect, useState } from "react";
import "./Contact.css";
import { useNavigate } from "react-router-dom";

function Contact() {
  const navigate = useNavigate();

  const [TF, setTF] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTF(false);
    window.scrollTo(0, 0);
    setTimeout(function () {
      navigate("/");
    }, 2000);
  };

  return (
    <div>
      <div className="wrap">
        {TF ? (
          <>
            <h1 className="title">Contact</h1>
            <form className="form" onSubmit={handleSubmit}>
              <fieldset className="fieldForName">
                <legend className="nameLegend">Name *</legend>
                <div className="firstName">
                  <label className="firstNameLabel">
                    <input type="text" className="firstNameInput" autoFocus={true} required />
                    <span className="firstNameSpan">First Name</span>
                  </label>
                </div>
                <div className="lastName">
                  <label className="lastNameLabel">
                    <input type="text" className="lastNameInput" required />
                    <span className="lastNameSpan">Last Name</span>
                  </label>
                </div>
              </fieldset>

              <div className="email">
                <label className="emailLabel">Email *</label>
                <input type="email" className="emailInput" required />
              </div>

              <div className="subject">
                <label className="subjectLabel">Subject *</label>
                <input type="text" className="subjectInput" required />
              </div>

              <div className="message">
                <label className="messageLabel">Message *</label>
                <textarea className="messageTextarea" required></textarea>
              </div>

              <div className="btn">
                <button type="submit">SUBMIT</button>
              </div>
            </form>
          </>
        ) : (
          <div className="afterSubmit">
          <h1>Thanks For Contacting Us 😁</h1>
          <p>Redirecting To Home Within 2 Seconds</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Contact;
