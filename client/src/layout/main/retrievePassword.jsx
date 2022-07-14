import React from "react";
import Form from "../common/Form/Form";
import Joi from "joi-browser";
import PageHeader from "../common/pageHeader";
import { getCurrentUser,} from "../../services/userService";
import { Navigate, } from "react-router-dom";
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { ContactUs } from "../../services/ContactUs";

class RetrievePassword extends Form {
  state = {
    data: {
      email: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().min(6).required().email().label("Email").regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
  };

  doSubmit = async () => {
    const form = useRef();
    <form ref={form}>
      <input type="text" name="name" />
      <input type="email" name={this.state.data.email} />
      <textarea name="message" />
    </form>
    try {
      emailjs.sendForm('service_jax54es', 'template_ttoppbi', form.current, 'GlmuU6i0hzeL3XFsX')
      .then((result) => {
          // console.log(result.text);
      }, (error) => {
          // console.log(error.text);
      });
    } catch (error) {
      if (error.response && error.response.status === 400)
        this.setState({
          errors: { email: "An Error has Occured" },
        });
    }
  };

  render() {
    const user = getCurrentUser();
    if (user) return <Navigate replace to="/" />;

    return (
      <div
        style={{ minHeight: "85vh" }}
        className="container-fluid bg-light pb-4"
      >
        <div className="container">
          <PageHeader
            title="Retrieve Password"
            subTitle="Here you can retrieve your password"
          />
          <p style={{display: "flex",justifyContent: "center"}}>Please enter the login ID of the account to retrieve your password</p>
          <ContactUs/>
        </div>
      </div>
    );
  }
}

export default RetrievePassword;
