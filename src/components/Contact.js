import React from "react";
import { useState } from "react";
import axios from "axios";
import { Input, Textarea, Button } from "@chakra-ui/react";

import Images from "../Images/contact-img.jpg";
import "../styles/contact.css";

const Contact = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    };
    axios
      .post(
        "https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries",
        userData
      )
      .then((response) => {
        console.log(response.status, response.data.token);
      });
  };

  return (
    <>
      <div className="card">
        <div className="card-info">
          <h1>CONTACT US</h1>
        </div>
        <div className="card-details">
          <div className="form-card">
            <form onSubmit={handleSubmit}>
              <Input
                type="name"
                value={data.name}
                onChange={handleChange}
                variant="filled"
                placeholder="Name"
              />
              <Input
                type="email"
                value={data.email}
                onChange={handleChange}
                variant="filled"
                placeholder="Email"
              />
              <Input
                type="subject"
                value={data.subject}
                onChange={handleChange}
                variant="filled"
                placeholder="Subject"
              />
              <Textarea
                type="message"
                value={data.message}
                onChange={handleChange}
                variant="filled"
                placeholder="Message..."
                rows="4"
                cols="50"
              />
              <div className="btn">
                <Button colorScheme="linkedin">Submit</Button>
              </div>
            </form>
          </div>

          <div className="image">
            <img src={Images} alt="contact" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
