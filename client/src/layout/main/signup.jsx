import React from "react";
import Form from "../common/Form/Form";
import Joi from "joi-browser";
import PageHeader from "../common/pageHeader";
import { toast } from "react-toastify";
import { getCurrentUser, login, signup } from "../../services/userService";
import { Navigate } from "react-router-dom";

class Signup extends Form {
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
    password: Joi.string().required().min(8).label("Password").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=(?:\D*\d){4})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    email: Joi.string().required().min(6).email().label("Email").regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
  };

  doSubmit = async () => {
    try {
      const user = { ...this.state.data };
      await signup(user);
      toast.success(`${user.name} you signup successfully`);
      delete user.name;
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
            title="Signup"
            subTitle="Here you can signup to create your account"
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
              {this.renderButtonYellow("Signup")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
