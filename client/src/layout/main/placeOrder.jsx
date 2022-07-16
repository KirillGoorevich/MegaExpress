import React from "react";
import { getCard } from "../../services/cardService";
import Joi from "joi-browser";
import Form from "../common/Form/Form";
import { getCurrentDate, getCurrentMonth, getCurrentYear, getDeliveryDateAndYear } from "../common/utils/getDate"
import { toast } from "react-toastify";
import { createOrder } from "../../services/orderService";
import { Navigate } from "react-router-dom";

class PlaceOrder extends Form {
  state = {
    card: {},
    data: {
      selectedFeature: "",
      displayPrice: 0,
      displayColor: "",
      selectedQuantity: 1,
      selectedCountry: "israel",
      name: "",
      phone: "",
      address: "",
      cardNumber: "",
      cardName: "",
      validMonth: "1",
      validYear: getCurrentYear(),
      cvv: "",
    },
    errors: {},
    isMounted: false,
    isOrderPlaced: false,
  };

  changeValidYear = (e)=>{
    let newData = this.state.data;
    newData.validYear = e.target.value;
    this.setState({data: newData});
  }

  changeValidMonth = (e)=>{
    let newData = this.state.data;
    newData.validMonth = e.target.value;
    this.setState({data: newData});
  }

  changeCountry = (e)=>{
    let newData = this.state.data;
    newData.selectedCountry = e.target.value;
    this.setState({data: newData});
  }

  changeSelectedQuantity(sign){
    let newData = this.state.data;
    newData.selectedQuantity = this.state.data.selectedQuantity;
    if(sign === "+"){
      newData.selectedQuantity++;
    }
    else if(sign === "-"){
      newData.selectedQuantity--;
    }
    this.setState({data: newData});
  }

  async componentDidMount() {
    try {
      const { data } = await getCard(this.props.id);
      let orderData = this.state.data;
      orderData.selectedFeature = this.props.selectedFeature;
      orderData.displayPrice = this.props.displayPrice;
      orderData.displayColor = this.props.displayColor;
      orderData.selectedQuantity = this.props.selectedQuantity;
      orderData.selectedCountry = this.props.selectedCountry;
      this.setState({ card: data, isMounted: true,data: orderData});
    } catch (error) {
      this.setState({ errors: error.message });
    }
  }

  schema = {
    selectedFeature: Joi.string().required(),
    displayPrice: Joi.number().required(),
    displayColor: Joi.string().required(),
    selectedQuantity: Joi.number().required(),
    selectedCountry: Joi.string().required(),
    name: Joi.string().min(2).max(256).required().label("Name"),
    phone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/)
      .label("Phone"),
    address: Joi.string().required().min(6).label("Business address"),
    cardNumber: Joi.string().regex(/^\d+$/).min(16).max(16).required().label("Card Number"),
    cardName: Joi.string().min(2).max(256).required().label("Cardholder Name"),
    validMonth: Joi.string().required(),
    validYear: Joi.string().required(),
    cvv: Joi.string().min(3).max(4).regex(/^\d+$/).required().label("CVV"),
  };

  doSubmit = async () => {
    try {
      if(this.state.data.validYear === (getCurrentYear()) && Number(this.state.data.validMonth) < Number((getCurrentMonth()))){
          toast.error("This card has expired.",{
          autoClose: false,
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      else{
        let imageUrl = this.state.card.image.url;
        let imageAlt = this.state.card.image.alt;
        if(this.state.data.displayColor === this.state.card.color2){
          imageUrl = this.state.card.image2.url;
          imageAlt = this.state.card.image2.alt;
        }
        else if(this.state.data.displayColor === this.state.card.color3){
          imageUrl = this.state.card.image3.url;
          imageAlt = this.state.card.image3.alt;
        }
        else if(this.state.data.displayColor === this.state.card.color4){
          imageUrl = this.state.card.image4.url;
          imageAlt = this.state.card.image4.alt;
        }
        else if(this.state.data.displayColor === this.state.card.color5){
          imageUrl = this.state.card.image5.url;
          imageAlt = this.state.card.image5.alt;
        }
        const image = {url: imageUrl,alt: imageAlt};
        const name = this.state.card.name;
        const description = this.state.card.description;
        const bizName = this.state.card.bizName;
        const price = this.state.card.price;
        const ship = this.state.card.ship;
        const returnfree = this.state.card.returnfree;
        const sellerId = this.state.card.sellerId;
        const cardId = this.state.card._id;
        const card = {image: image,name: name,description: description,bizName: bizName,price: price,ship: ship,returnfree: returnfree,sellerId: sellerId,cardId: cardId};
        const data = this.state.data;
        const date = getCurrentDate();
        let deliveryDate =getDeliveryDateAndYear(this.state.data.selectedCountry);
        const order = {card: card,data: data,date: date,deliveryDate: deliveryDate};
        await createOrder(order);
        toast.success("your new order has been placed");
        this.setState({ isOrderPlaced: true });
      }
     
    } catch (error) {
      if (error.response && error.response.status === 400)
        this.setState({
          errors: { email: "This user is already registered!" },
        });
    }
  };

  render() {
    const currentYear = Number(getCurrentYear());
    const { card, isMounted,} = this.state;
    if (!isMounted) return null;
    const {
      image: { url: url1, alt: alt1 },
      image2: {url : url2,alt : alt2},
      image3: {url : url3,alt : alt3},
      image4: {url : url4,alt : alt4},
      image5: {url : url5,alt : alt5},
    } = card;

    const { user } = this.props;

    if (!user)
      return <Navigate replace to="/login" />;

    const { isOrderPlaced } = this.state;
    if (isOrderPlaced) return <Navigate replace to="/my-orders" />;

    return (
      <React.Fragment>
        <div className="container" style={{ display: "flex", justifyContent: "space-between"}}>
          <form
            id="order-form"
            onSubmit={this.handleSubmit}
            autoComplete="off"
            method="POST"
            className="col-12 col-md-10 col-xl-6 border p-2 bg-white"
            style={{margin: "1vw"}}
          >
            <div>
              <strong>Country/Region</strong>
            <div>
            <img src="https://countryflagsapi.com/svg/il" alt="Israel flag" className="flag-icon" style={{display: ( this.state.data.selectedCountry === "israel") ? 'inline' : 'none' }}/>
            <img src="https://countryflagsapi.com/svg/us" alt="The United States Of America flag" className="flag-icon" style={{display: ( this.state.data.selectedCountry === "usa") ? 'inline' : 'none' }}/>
            <img src="https://countryflagsapi.com/svg/ru" alt="Russian Federation flag" className="flag-icon" style={{display: ( this.state.data.selectedCountry === "russia") ? 'inline' : 'none' }}/>
            <img src="https://countryflagsapi.com/svg/cn" alt="China flag" className="flag-icon" style={{display: ( this.state.data.selectedCountry === "china") ? 'inline' : 'none' }}/>
            <img src="https://countryflagsapi.com/svg/in" alt="India flag" className="flag-icon" style={{display: ( this.state.data.selectedCountry === "india") ? 'inline' : 'none' }}/>
              <select defaultValue = {this.state.data.selectedCountry} onChange={this.changeCountry}>
                <option value="israel" >Israel</option>
                <option value="usa" >United States</option>
                <option value="russia" >Russia</option>
                <option value="china" >China</option>
                <option value="india" >India</option>
              </select>
            </div>
              <br />
              <strong>Personal Information</strong>
              <br />
              {this.renderInput("name", "Contact Name")}
              {this.renderInput("phone", "Phone")}
              {this.renderInput("address", "Shipping Address")}
              <br />
              <strong>Payment Method</strong>
              {this.renderInput("cardNumber", "Card Number")}
              {this.renderInput("cardName", "Cardholder Name")}
              <strong>VALID THRU</strong>
              <br />
              <div>
              <span>Month:&nbsp;</span>
              <select defaultValue = {this.state.data.validMonth} onChange={this.changeValidMonth}>
                <option value= {1} >January</option>
                <option value= {2} >February</option>
                <option value= {3} >March</option>
                <option value= {4} >April</option>
                <option value= {5} >May</option>
                <option value= {6} >June</option>
                <option value= {7} >July</option>
                <option value= {8} >August</option>
                <option value= {9} >September</option>
                <option value= {10} >October</option>
                <option value= {11} >November</option>
                <option value= {12} >December</option>
              </select>
              <span>&nbsp;&nbsp;</span>
              <span>Year:&nbsp;</span>
              <select defaultValue = {this.state.data.validYear} onChange={this.changeValidYear}>
                <option value={currentYear} >{currentYear}</option>
                <option value={currentYear+1} >{currentYear+1}</option>
                <option value={currentYear+2} >{currentYear+2}</option>
                <option value={currentYear+3} >{currentYear+3}</option>
                <option value={currentYear+4} >{currentYear+4}</option>
                <option value={currentYear+5} >{currentYear+5}</option>
                <option value={currentYear+6} >{currentYear+6}</option>
                <option value={currentYear+7} >{currentYear+7}</option>
                <option value={currentYear+8} >{currentYear+8}</option>
                <option value={currentYear+9} >{currentYear+9}</option>
                <option value={currentYear+10} >{currentYear+10}</option>
                <option value={currentYear+11} >{currentYear+11}</option>
              </select>
              </div>
              <br />
              {this.renderInput("cvv", "CVV")}
              <li>
                CVV is either a 3 digit number on the back of your card or a 4 digit number on the front.
              </li>
            </div>
            </form>
            <div className="col-12 col-md-10 col-xl-6 border p-2 bg-white"
            style={{margin: "1vw"}}
            >
            <img src="https://ae01.alicdn.com/kf/H3f645a747e2840f9bc543e561fde86fdA.png" alt="Shop Icon" className="shop-icon"/>
            <strong>{this.state.card.bizName}</strong><br /><br />
            <p><strong>Name: </strong>{this.state.card.name}</p>
            <p><strong>Color: </strong>{this.state.data.displayColor}</p>
            <p><strong>Feature: </strong>{this.state.data.selectedFeature}</p>
            <p><strong>Price Per Unit: </strong>US ${(this.state.data.displayPrice).toFixed(2)}</p>
            <strong>Quantity:&nbsp;&nbsp;&nbsp;</strong>
            <span><button className="custom-btn-minus" disabled={this.state.data.selectedQuantity<=1} onClick={()=>this.changeSelectedQuantity("-")}>-</button> {this.state.data.selectedQuantity} <button className="custom-btn-plus" disabled={this.state.data.selectedQuantity>=this.state.card.quantity} onClick={()=>this.changeSelectedQuantity("+")}>+</button></span>
            <div>
            <img
              style={{ width: "15vw",marginTop: "1vh",display: (this.state.data.displayColor === "Default" || this.state.data.displayColor === this.state.card.color1) ? 'inline' : 'none'}}
              src={url1}
              className="card-img"
              alt={alt1}
            ></img>
            <img
              style={{ width: "15vw",marginTop: "1vh",display: (this.state.data.displayColor === this.state.card.color2) ? 'inline' : 'none'}}
              src={url2}
              className="card-img"
              alt={alt2}
            ></img>
            <img
              style={{ width: "15vw",marginTop: "1vh",display: (this.state.data.displayColor === this.state.card.color3) ? 'inline' : 'none'}}
              src={url3}
              className="card-img"
              alt={alt3}
            ></img>
            <img
              style={{ width: "15vw",marginTop: "1vh",display: (this.state.data.displayColor === this.state.card.color4) ? 'inline' : 'none'}}
              src={url4}
              className="card-img"
              alt={alt4}
            ></img>
            <img
              style={{width: "15vw",marginTop: "1vh",display: (this.state.data.displayColor === this.state.card.color5) ? 'inline' : 'none'}}
              src={url5}
              className="card-img"
              alt={alt5}
            ></img>
            <br /><br />
            <strong>Summary</strong>
            <p><strong>Total item costs: </strong>US ${(this.state.data.displayPrice*this.state.data.selectedQuantity).toFixed(2)}</p>
            <p><strong>Total Shipping: </strong>US ${(this.state.card.ship*this.state.data.selectedQuantity).toFixed(2)}</p>
            <p><strong>All Total: </strong>US ${(this.state.data.displayPrice*this.state.data.selectedQuantity+this.state.card.ship*this.state.data.selectedQuantity).toFixed(2)}</p>
            <button className="btn btn-danger mt-2 col-12" type="submit" form="order-form" disabled={this.validate()}>Place Order</button>
            </div>
            </div>
            
        </div>
      </React.Fragment>
    );
  }
}

export default PlaceOrder;
