import React from "react";
import { useState } from "react";
import axios from "axios";
import { Input, Textarea, Button } from "@chakra-ui/react";

import Images from "../Images/contact-img.jpg";
import "../styles/contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};

    if (!formData.name) {
      errors.name = "Name is required";
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.message) {
      errors.message = "Message is required";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm();
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      // submit form
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   setData({
  //     ...data,
  //     [e.target.name]: value,
  //   });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const userData = {
  //     name: data.name,
  //     email: data.email,
  //     subject: data.subject,
  //     message: data.message,
  //   };
  axios
    .post(
      "https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries"
      // userData
    )
    .then((response) => {
      console.log(response.status, response.data.token);
    });
  // };

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
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="filled"
                placeholder="Name"
              />
              {errors.name && <div className="error">{errors.name}</div>}

              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="filled"
                placeholder="Email"
              />
              {errors.email && <div className="error">{errors.email}</div>}

              <Input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                variant="filled"
                placeholder="Subject"
              />

              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                variant="filled"
                placeholder="Message..."
                rows="4"
                cols="50"
              />
              {errors.message && <div className="error">{errors.message}</div>}

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
