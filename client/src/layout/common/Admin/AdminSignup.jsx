import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import Form from "../Form/Form";
import { getCurrentUser, login, signup } from "../../../services/userService";
import PageHeader from "../pageHeader";

class AdminSignup extends Form {
  state = {
    data: {
      name: "",
      phone: "",
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    name: Joi.string().required().min(2).label("Name"),
    phone: Joi.string()
      .min(10)
      .max(11)
      .required()
      .regex(/^0[2-9]\d{0,1}[ ,-]{0,1}\d{7,8}$/)
      .label("Phone"),
    email: Joi.string().required().min(6).email().label("Email").regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
    password: Joi.string().required().min(8).label("Password").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=(?:\D*\d){4})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
  };

  doSubmit = async () => {
    try {
      const user = { ...this.state.data };
      user.biz = true;
      user.isAdmin = true;
      await signup(user);
      toast.success(`${user.name} you signup successfully`);
      delete user.name;
      delete user.biz;
      delete user.isAdmin;
      delete user.phone;
      await login(user);
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400)
        this.setState({
          errors: { email: "This user is already registered!" },
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
            title="Admin Signup Page"
            subTitle="Here you can signup as Admin"
          />
          <div className="center">
            <form
              onSubmit={this.handleSubmit}
              autoComplete="off"
              method="POST"
              className="col-12 col-md-10 col-xl-6 border p-2 bg-white"
            >
              {this.renderInput("name", "Name")}
              {this.renderInput("phone", "Phone")}
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
              <p>At least 1 upper and lowercase letters,4 numbers and one of these (!@#$%^*-_*&amp;)</p>
              {this.renderButton("Register as Admin")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminSignup;
