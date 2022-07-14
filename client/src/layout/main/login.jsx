import React from "react";
import Form from "../common/Form/Form";
import Joi from "joi-browser";
import PageHeader from "../common/pageHeader";
import { toast } from "react-toastify";
import { getCurrentUser, login } from "../../services/userService";
import { Navigate,Link } from "react-router-dom";

class Login extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    //validation here isn't important since it was done at signup
    email: Joi.string().min(6).required().email().label("Email"),
    password: Joi.string().required().min(8).label("Password"),
  };

  doSubmit = async () => {
    try {
      const user = { ...this.state.data };
      await login(user);
      toast.success("you logged successfully");
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400)
        this.setState({
          errors: { email: "Invalid email or password" },
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
            title="Login"
            subTitle="Here you can login and start buying our products"
          />
          <div className="center">
            <form
              onSubmit={this.handleSubmit}
              autoComplete="off"
              method="POST"
              className="col-12 col-md-10 col-xl-6 border p-2 bg-white"
            >
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
              <a href="/retrieve-password" target="_blank" rel="noopener noreferrer" style={{textDecoration: "none",}}>Forgot Password?</a>
              {this.renderButtonYellow("Login")}
              <br /><br />
            </form>
          </div>
          <div className="center">
            <p>Don't have an account?</p>
          </div>
          <div className="center">
          <Link to="/signup" className="btn  mt-2 col-6">
          <button
              className="btn btn-success mt-2 col-6"
              >Signup
            </button>
          </Link>
            </div>
        </div>
      </div>
    );
  }
}

export default Login;
