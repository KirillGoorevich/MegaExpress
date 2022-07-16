import React from "react";
import Form from "../common/Form/Form";
import Joi from "joi-browser";
import PageHeader from "../common/pageHeader";
import { toast } from "react-toastify";
import { getCurrentUser, resetPassword } from "../../services/userService";
import { Navigate } from "react-router-dom";

//when it comes to cyber security this page is garbage not only is it accessable via URL, it also allows a hacker that merely knows an email to change the password,basically making passwords useless
//perhaps sending a secret code to the email would help in this regard...
//the best thing i can do is route this to a complex url such as:
// "/reset-password/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFBgVFRUZGRUaGxgaGxsZGxsbGh0a..."
//maybe use a function to generate a random url
class ResetPasswrd extends Form {
  state = {
    data: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    errors: {},
  };

  schema = {
    //validation here isn't important since it was done at signup
    email: Joi.string().min(6).required().email().label("Email").regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
    password: Joi.string().required().min(8).label("Password").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=(?:\D*\d){4})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    passwordConfirm: Joi.string().required().min(8).label("Password Confirm").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=(?:\D*\d){4})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
  };

  doSubmit = async () => {
    try {
    const user = { ...this.state.data };
    if(user.passwordConfirm !== user.password){
      toast.error("Your passwords don't match!",{
        autoClose: false,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    delete user.passwordConfirm;
    await resetPassword(user);
    
    toast.success("Your password was reset");
    window.location = "/login";
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
            title="Password Reset"
            subTitle="Here you can reset your password"
          />
          <div className="center">
            <form
              onSubmit={this.handleSubmit}
              autoComplete="off"
              method="POST"
              className="col-12 col-md-10 col-xl-6 border p-2 bg-white"
            >
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "New Password", "password")}
              {this.renderInput("passwordConfirm", "Password Confirm", "password")}
              {this.renderButtonYellow("Reset")}
              <br /><br />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ResetPasswrd;