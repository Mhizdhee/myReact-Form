import React from "react";
import { useState } from "react";
import axios from "axios";
import { Input, Textarea, Button, Alert, AlertIcon } from "@chakra-ui/react";

import Images from "../Images/contact-img.jpg";
import "../styles/contact.css";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

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

    // setErrors({});
    // setError(false);
    setSuccess(false);
    setLoading(true);
    const userData = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };
    console.log(userData);
    axios
      .post(
        "https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries",
        userData
      )
      .then((response) => {
        console.log(response.status, response.data.token);
        // setLoading(false);
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      })
      .catch((error) => {
        // setLoading(false);
        setError("Something went wrong. Please try again later");
      })
      .finally(() => {
        setLoading(false);
      });

    const errors = validateForm();
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      // submit form
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
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
            {success && (
              <Alert status="success">
                <AlertIcon />
                Form submitted successfully
              </Alert>
            )}
            {error && (
              <Alert status="failed">
                <AlertIcon />
                Form submitted failed
              </Alert>
              // <div className="error-message">Form submission failed</div>
            )}
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
                <Button type="submit" colorScheme="linkedin">
                  Submit
                </Button>
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
