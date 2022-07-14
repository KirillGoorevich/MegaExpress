import React from "react";
import Form from "./../common/Form/Form";
import Joi from "joi-browser";
import PageHeader from "./../common/pageHeader";
import { toast } from "react-toastify";
import { getCurrentUser, login, signup } from "../../services/userService";
import { Navigate } from "react-router-dom";


class SellerSignup extends Form {

  constructor(props) {
    super(props)

    this.state = {
      selectOptionValue: '1',
      data: {
        name: "",
        email: "",
        phone: "",
        address: "",
        bank: "Leumi",
        bankNumber: "",
        password: "",
        passwordConfirm: "",
      },
      errors: {},
    };
  }
  
  bankChange = (e) => {
    let newStateData = this.state.data;
    newStateData.bank = e.target.value;
    this.setState({
      data: newStateData,
    })
  }

  schema = {
    name: Joi.string().required().min(2).label("Name"),
    email: Joi.string().required().min(6).email().label("Email").regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
    address: Joi.string().required().min(6).label("Business address"),
    phone: Joi.string()
      .min(10)
      .max(11)
      .required()
      .regex(/^0[2-9]\d{0,1}[ ,-]{0,1}\d{7,8}$/)
      .label("Phone"),
    bank: Joi.string(),
    bankNumber: Joi.string().min(7).max(7).regex(/^\d+$/),
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
      else{
        delete user.passwordConfirm;
        user.biz = true;
        await signup(user);
        toast.success(`${user.name} you signup successfully`);
        delete user.name;
        delete user.biz;
        delete user.address;
        delete user.phone;
        delete user.bank;
        delete user.bankNumber;
        await login(user);
        window.location = "/create-product";
      }
     
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
            title="Business Signup"
            subTitle="Here you can signup as a business and start selling your products"
          />
          <div className="center">
            <form
              onSubmit={
                this.handleSubmit
              }
              autoComplete="off"
              method="POST"
              className="col-12 col-md-10 col-xl-6 border p-2 bg-white"
            >
              {this.renderInput("name", "Name")}
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("phone", "Phone")}
              {this.renderInput("address", "Business address")}
              Bank 
              <br />
              <select defaultValue = "leumi" onChange={this.bankChange}>
                <option value="leumi" >Leumi</option>
                <option value="discount" >Discount</option>
                <option value="hapoalim" >Hapoalim</option>
                <option value="mizrahi tfahot" >Mizrahi Tfahot</option>
              </select>
              <br />
              <br />
              {this.renderInput("bankNumber", "Bank Account Number")}
              {this.renderInput("password", "Password", "password")}
              <p>At least 1 upper and lowercase letters,4 numbers and one of these (!@#$%^*-_*&amp;)</p>
              {this.renderInput("passwordConfirm", "Password Confirm", "password")}
              <br />
              <p className='text-warning'>Do Not Use the same password as your bank account!!!</p>
              <p>In the current day and age hackers are an ever present threat; do not give away any more information then you need to.</p>
              {this.renderButtonYellow("Create Account")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SellerSignup;
