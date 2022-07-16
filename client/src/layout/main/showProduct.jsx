import React, { Component } from "react";
import { getCard } from "../../services/cardService";
import PageHeader from "../common/pageHeader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as regHeart} from '@fortawesome/free-regular-svg-icons'
import { faHeart as solidHeart, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { changeLikeStatus, changeCartStatus } from "../../services/cardService";
import { getCurrentUser } from "../../services/userService";
import {getDeliveryDate} from '../common/utils/getDate'
import { Link} from 'react-router-dom';
import { toast } from "react-toastify";

class ShowProduct extends Component {
  state = {
    card: {},
    errors: {},
    isMounted: false,
    isCardLiked: null,
    isInCart: null,
    numLikes: null,
    displayColor: "",
    selectedFeature: "",
    displayPrice: 0,
    selectedQuantity: 1,
    selectedCountry: "israel",
    isUser: getCurrentUser(),
  };

  changeCountry = (e)=>{
    this.setState({selectedCountry: e.target.value});
  }

  changeSelectedQuantity(sign){
    let selectedQuantity = this.state.selectedQuantity;
    if(sign === "+"){
      selectedQuantity++;
    }
    else if(sign === "-"){
      selectedQuantity--;
    }
    this.setState({selectedQuantity: selectedQuantity});
  }

  changeDisplayPrice(price,feature) {
    this.setState({displayPrice: price,selectedFeature: feature});
  }
  changeDisplayColor(color) {
    this.setState({displayColor: color});
  } 

  async changeLikeStatus(id) {
    await changeLikeStatus(id);
    if(this.state.isCardLiked === "Yes"){
      this.setState({isCardLiked: "No",numLikes: this.state.numLikes -1});
    }
    else if(this.state.isCardLiked === "No"){
      this.setState({isCardLiked: "Yes",numLikes: this.state.numLikes +1});
    }
    else if(this.state.isCardLiked === null){
      //no user, do nothing
    }
  }

  async changeCartStatus(id) {
    if(!this.isUser){
      window.location.href = "/login";
    }
    if(this.state.isInCart === "Yes"){
      toast.warning("This product is already in your cart!.",{
        autoClose: true,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    else{
      await changeCartStatus(id);
      window.location.href = "/cart";
    }
  } 

  async componentDidMount() {
    try {
      const { data } = await getCard(this.props.id);
      let isUserLikedCard =null;
      let isUserInCart = null;
      let numLikes = data.likes.length;
      const user = getCurrentUser();
      if(user){
        isUserLikedCard = data.likes.find((id) => id === user._id);
        if(isUserLikedCard){
          isUserLikedCard = "Yes";
        }
        else{
          isUserLikedCard = "No";
        }
        isUserInCart = data.cart.find((id) => id === user._id);
        if(isUserInCart){
          isUserInCart = "Yes";
        }
        else{
          isUserInCart = "No";
        }
      }
      let selectedFeature = "Default";
      if(data.feature1){
        selectedFeature = data.feature1;
      }
      let displayPrice = data.price;
      let displayColor = "Default";
      if(data.color1){
        displayColor = data.color1;
      }
      if(this.state.card.color1){
        displayColor = this.state.card.color1;
      }
      this.setState({ card: data, isMounted: true,numLikes: numLikes,selectedFeature: selectedFeature ,displayPrice: displayPrice,displayColor: displayColor,isCardLiked: isUserLikedCard, isInCart: isUserInCart });
    } catch (error) {
      this.setState({ errors: error.message });
    }
  }

  render() {
    const { card, isMounted,displayPrice } = this.state;
    if (!isMounted) return null;
    const {
      name,
      description,
      image: { url: url1, alt: alt1 },
      sold,
      price,
      image2: {url : url2,alt : alt2},
      image3: {url : url3,alt : alt3},
      image4: {url : url4,alt : alt4},
      image5: {url : url5,alt : alt5},
    } = card;

    return (
      <React.Fragment>
        <PageHeader title={name} subTitle="" />
        <div className="container" style={{ display: "flex", justifyContent: "space-between"}}>
            <div className="order-div">
            <img
              style={{ maxWidth: "33vh" ,minWidth: "25vh",display: (this.state.displayColor === "Default" || this.state.displayColor === this.state.card.color1) ? 'inline' : 'none'}}
              src={url1}
              className="card-img"
              alt={alt1}
            ></img>
            <img
              style={{ maxWidth: "33vh" ,minWidth: "25vh",display: (this.state.displayColor === this.state.card.color2) ? 'inline' : 'none'}}
              src={url2}
              className="card-img"
              alt={alt2}
            ></img>
            <img
              style={{ maxWidth: "33vh" ,minWidth: "25vh",display: (this.state.displayColor === this.state.card.color3) ? 'inline' : 'none'}}
              src={url3}
              className="card-img"
              alt={alt3}
            ></img>
            <img
              style={{ maxWidth: "33vh" ,minWidth: "25vh",display: (this.state.displayColor === this.state.card.color4) ? 'inline' : 'none'}}
              src={url4}
              className="card-img"
              alt={alt4}
            ></img>
            <img
              style={{ maxWidth: "33vh" ,minWidth: "25vh",display: (this.state.displayColor === this.state.card.color5) ? 'inline' : 'none'}}
              src={url5}
              className="card-img"
              alt={alt5}
            ></img>
            </div>
            <div className="order-div">
            <br />
            <span style={{display: (this.state.card.numColors > 0) ? 'flex' : 'none' , justifyContent: "space-between"}}>Colors:</span>
            <div style={{display: (this.state.card.numColors > 0) ? 'flex' : 'none' , justifyContent: "space-between"}}>
                <button className="btn btn-outline-dark" style={{display: (this.state.card.color1) ? 'none' : 'inline' , }} onClick={() => this.changeDisplayColor("Default")}>Default</button>
                <button className="btn btn-outline-dark" style={{display: (this.state.card.color1) ? 'inline' : 'none' , }} onClick={() => this.changeDisplayColor("Default")}>{this.state.card.color1}</button>
                <button className="btn btn-outline-dark" style={{display: (this.state.card.color2) ? 'inline' : 'none' , }} onClick={() => this.changeDisplayColor(this.state.card.color2)}>{this.state.card.color2}</button>
                <button className="btn btn-outline-dark" style={{display: (this.state.card.color3) ? 'inline' : 'none' , }} onClick={() => this.changeDisplayColor(this.state.card.color3)}>{this.state.card.color3}</button>
                <button className="btn btn-outline-dark" style={{display: (this.state.card.color4) ? 'inline' : 'none' , }} onClick={() => this.changeDisplayColor(this.state.card.color4)}>{this.state.card.color4}</button>
            </div>
            <br />
            <div style={{display: (this.state.card.numColors > 0) ? 'flex' : 'none' , justifyContent: "space-between"}}>
            <button className="btn btn-outline-dark" style={{display: (this.state.card.color5) ? 'inline' : 'none' , }} onClick={() => this.changeDisplayColor(this.state.card.color5)}>{this.state.card.color5}</button>
            </div>
            <br />
            Quantity:
            <br />
            <span><button className="custom-btn-minus" disabled={this.state.selectedQuantity<=1} onClick={()=>this.changeSelectedQuantity("-")}>-</button> {this.state.selectedQuantity} <button className="custom-btn-plus" disabled={this.state.selectedQuantity>=this.state.card.quantity} onClick={()=>this.changeSelectedQuantity("+")}>+</button></span>
            <span style={{color: "#999999"}}> {this.state.card.quantity} Pieces availible</span>
            <br />
            <br />
            <div>
            Ships to <FontAwesomeIcon icon={faLocationDot} /><span>&nbsp;&nbsp;</span>  
            <select defaultValue = {this.state.selectedCountry} onChange={this.changeCountry}>
                <option value="israel" >Israel</option>
                <option value="usa" >United States</option>
                <option value="russia" >Russia</option>
                <option value="china" >China</option>
                <option value="india" >India</option>
              </select>
            </div>
            <br />
            <div style={{display: "flex", justifyContent: "space-between"}}>
              <strong style={{display: (this.state.card.ship === 0) ? 'inline' : 'none' , }}>Free Shipping</strong>
              <strong style={{display: (this.state.card.ship !== 0) ? 'inline' : 'none' , }}>Shipping: US ${this.state.card.ship}</strong>
              <strong style={{display: (this.state.card.returnfree === "yes") ? 'inline' : 'none' , }}>Free Return</strong>
            </div>
            <br />
            <span>Estimated delivery on {getDeliveryDate(this.state.selectedCountry)}</span>
            <br /><br />
            <div style={{display: "flex", justifyContent: "space-between"}}>
            <Link 
            to={`/place-order/${this.state.card._id}`}
            state = {{
              displayColor: this.state.displayColor,
              selectedFeature: this.state.selectedFeature,
              displayPrice: this.state.displayPrice,
              selectedQuantity: this.state.selectedQuantity,
              selectedCountry: this.state.selectedCountry,
            }}
            style={{display: (this.state.card.quantity !== 0) ? 'inline' : 'none' , }}
            ><button className="custom-btn-buy-now" >Buy Now</button></Link>
            <button className="custom-btn-out-of-stock" disabled style={{display: (this.state.card.quantity === 0) ? 'inline' : 'none' , }}>Out Of Stock</button>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <button className="custom-btn-add-to-cart" onClick={() => this.changeCartStatus(this.props.id)}>Add to Cart</button>
            </div>
            </div>
            <div className="order-div">
            <div>
              {sold}
              <strong> orders</strong>
            </div>
            <div style={{backgroundColor: "red",border: "none",color: "white",padding: "0px 0px 0px 0px",textDecoration: "none",borderRadius: "12px",width: "400px"}}>
              <p style={{textAlign: "center",fontSize: "12px",}}>Shop now &amp; save more!</p>
              <div style={{fontSize: "22px",padding: "0px 0px 0px 10px",}}>
              US
              <strong> ${(displayPrice*this.state.selectedQuantity).toFixed(2)}</strong>
            </div>
                <span style={{fontSize: "14px",padding: "0px 0px 0px 10px",textDecoration: "line-through"}}>US ${(displayPrice*2*this.state.selectedQuantity).toFixed(2)}</span>
                <span style={{fontSize: "14px",}}>  -50%</span>
            </div>
            <br />
            <span style={{display: (this.state.card.numFeatures > 0) ? 'flex' : 'none' , justifyContent: "space-between"}}>Features:</span>
            <div style={{display: (this.state.card.numFeatures > 0) ? 'flex' : 'none' , justifyContent: "space-between"}}>
                <button className="btn btn-outline-dark" style={{display: (this.state.card.feature1) ? 'none' : 'inline' , }} onClick={() => this.changeDisplayPrice(price,this.state.card.feature1)}>Default</button>
                <button className="btn btn-outline-dark" style={{display: (this.state.card.feature1) ? 'inline' : 'none' , }} onClick={() => this.changeDisplayPrice(price,this.state.card.feature1)}>{this.state.card.feature1}</button>
                <button className="btn btn-outline-dark" style={{display: (this.state.card.feature2) ? 'inline' : 'none' , }} onClick={() => this.changeDisplayPrice(this.state.card.feature2price,this.state.card.feature2)}>{this.state.card.feature2}</button>
                <button className="btn btn-outline-dark" style={{display: (this.state.card.feature3) ? 'inline' : 'none' , }} onClick={() => this.changeDisplayPrice(this.state.card.feature3price,this.state.card.feature3)}>{this.state.card.feature3}</button>
                <button className="btn btn-outline-dark" style={{display: (this.state.card.feature4) ? 'inline' : 'none' , }} onClick={() => this.changeDisplayPrice(this.state.card.feature4price,this.state.card.feature4)}>{this.state.card.feature4}</button>
            </div>
            <br />
            <div style={{display: (this.state.card.numFeatures > 0) ? 'flex' : 'none' , justifyContent: "space-between"}}>
            <button className="btn btn-outline-dark" style={{display: (this.state.card.feature5) ? 'inline' : 'none' , }} onClick={() => this.changeDisplayPrice(this.state.card.feature5price,this.state.card.feature5)}>{this.state.card.feature5}</button>
            </div>
            <br />
            <div>
              <strong>Description </strong>
              <br />
              {description}
            </div>
            <div style={{display: (this.isUser) ? 'inline' : 'none'}}>
              <strong><FontAwesomeIcon 
              icon={this.state.isCardLiked === "Yes" ?  solidHeart : regHeart}
              className={this.state.isCardLiked === "Yes" ? "text-danger" : "text-secondary"}
              onClick={() => this.changeLikeStatus(this.props.id)}
              style={{width: "30px",height: "30px"}}
              />  </strong>
              <span style={{fontSize: "30px"}}>{this.state.numLikes}</span>
            </div>
            </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ShowProduct;
