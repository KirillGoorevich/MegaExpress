import React from "react";
import Form from "../common/Form/Form";
import Joi from "joi-browser";
import PageHeader from "../common/pageHeader";
import { toast } from "react-toastify";
import { editCard, getCard } from "../../services/cardService";
import { Link, Navigate } from "react-router-dom";

class EditProduct extends Form {
  state = {
    data: {},
    errors: {},
    isCardEdit: false,
    isMounted: false,
  };

  addFeature(){
    if(this.state.data.numFeatures <5){
      let newStateData = this.state.data;
    newStateData.numFeatures ++;
    this.setState({
      data: newStateData,
    })
    this.setState(this.state.data);
    }
  }
  removeFeature(){
    if(this.state.data.numFeatures >0){
      let newStateData = this.state.data;
    newStateData.numFeatures --;
    this.setState({
      data: newStateData,
    })
    this.setState(this.state.data);
    }
  }
  addColor(){
    if(this.state.data.numColors <5){
      let newStateData = this.state.data;
    newStateData.numColors ++;
    this.setState({
      data: newStateData,
    })
    this.setState(this.state.data);
    }
  }
  removeColor(){
    if(this.state.data.numColors >0){
      let newStateData = this.state.data;
    newStateData.numColors --;
    this.setState({
      data: newStateData,
    })
    this.setState(this.state.data);
    }
  }

  returnChange = (e) => {
    let newStateData = this.state.data;
    newStateData.returnfree = e.target.value;
    this.setState({
      data: newStateData,
    })
  }

  subcategoryChange = (e) => {
    let newStateData = this.state.data;
    newStateData.subcategory = e.target.value;
    this.setState({
      data: newStateData,
    })
  }

  categoryChange = (e) => {
    let newStateData = this.state.data;
    newStateData.category = e.target.value;
    if(newStateData.category === "women"){
      newStateData.subcategory = "dresses";
    }
    else if(newStateData.category === "men"){
      newStateData.subcategory = "hoodies";
    }
    else if(newStateData.category === "phones"){
      newStateData.subcategory = "android";
    }
    else if(newStateData.category === "office"){
      newStateData.subcategory = "cpus";
    }
    else if(newStateData.category === "electronic"){
      newStateData.subcategory = "cables";
    }
    else if(newStateData.category === "jewelry"){
      newStateData.subcategory = "silver";
    }
    else if(newStateData.category === "home"){
      newStateData.subcategory = "fabric";
    }
    else if(newStateData.category === "bags"){
      newStateData.subcategory = "totes";
    }
    else if(newStateData.category === "toys"){
      newStateData.subcategory = "dresses";
    }
    else if(newStateData.category === "outdoor"){
      newStateData.subcategory = "swimming";
    }
    else if(newStateData.category === "beauty"){
      newStateData.subcategory = "bundle-closure";
    }
    else if(newStateData.category === "automobiles"){
      newStateData.subcategory = "lights";
    }
    else if(newStateData.category === "tools"){
      newStateData.subcategory = "analysis";
    }
    this.setState({
      data: newStateData,
    })
  }

  schema = {
    name: Joi.string().min(2).max(256).required().label("Name"),
    description: Joi.string().min(2).max(1024).required().label("Description"),
    url: Joi.string().min(11).max(1024).uri().label("Image - Enter a URL").required(),
    alt: Joi.string().min(2).max(256).label("Alt").required(),
    category: Joi.string().min(2).max(256).required().label("Title"),
    subcategory: Joi.string().min(2).max(256).required().label("Title"),
    price: Joi.string().regex(/^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*\.[0-9]{2}$/).required(),
    sold: Joi.number().required(),
    ship: Joi.string().regex(/^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*\.[0-9]{2}$/).required(),
    returnfree: Joi.string().required(),
    numFeatures: Joi.number().required(),
    feature1: Joi.string().min(2).max(256).allow("").label("Default Feature:"),
    feature2: Joi.string().min(2).max(256).allow("").label("Second Feature:"),
    feature2price: Joi.string().allow("").regex(/^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*\.[0-9]{2}$/),
    feature3: Joi.string().min(2).max(256).allow("").label("Third Feature:"),
    feature3price: Joi.string().allow("").regex(/^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*\.[0-9]{2}$/),
    feature4: Joi.string().min(2).max(256).allow("").label("Fourth Feature:"),
    feature4price: Joi.string().allow("").regex(/^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*\.[0-9]{2}$/),
    feature5: Joi.string().min(2).max(256).allow("").label("Fifth Feature:"),
    feature5price: Joi.string().allow("").regex(/^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*\.[0-9]{2}$/),
    numColors: Joi.number().required(),
    color1: Joi.string().min(2).max(256).allow("").label("Default Color:"),
    color2: Joi.string().min(2).max(256).allow("").label("Second Color:"),
    url2: Joi.string().min(11).max(1024).uri().allow("").label("Color 2 Image - Enter a URL"),
    alt2: Joi.string().min(2).max(256).allow("").label("Color 2 Alt"),
    color3: Joi.string().min(2).max(256).allow("").label("Third Color:"),
    url3: Joi.string().min(11).max(1024).uri().allow("").label("Color 3 Image - Enter a URL"),
    alt3: Joi.string().min(2).max(256).allow("").label("Color 3 Alt"),
    color4: Joi.string().min(2).max(256).allow("").label("Fourth Color:"),
    url4: Joi.string().min(11).max(1024).uri().allow("").label("Color 4 Image - Enter a URL"),
    alt4: Joi.string().min(2).max(256).allow("").label("Color 4 Alt"),
    color5: Joi.string().min(2).max(256).allow("").label("Fifth Color:"),
    url5: Joi.string().min(11).max(1024).uri().allow("").label("Color 5 Image - Enter a URL"),
    alt5: Joi.string().min(2).max(256).allow("").label("Color 5 Alt"),
    quantity: Joi.number().integer().min(1).required(),
    sellerId: Joi.string().required(),
  };

  async componentDidMount() {
    try {
      const { id } = this.props;
      const { data: card } = await getCard(id);
      //need to make these checks since mapToModel breaks otherwise
      if(!card.feature2price){
        card.feature2price = 0;
      }
      if(!card.feature3price){
        card.feature3price = 0;
      }
      if(!card.feature4price){
        card.feature4price = 0;
      }
      if(!card.feature5price){
        card.feature5price = 0;
      }
      
      
      this.setState({ isMounted: true, data: this.mapToModel(card) });
    } catch (error) {
      this.setState({ errors: { alt: error.message } });
    }
  }

  mapToModel(card) {
    const {
      name,
      description,
      image: { url, alt },
      category,
      subcategory,
      price,
      sold,
      ship,
      returnfree,
      quantity,
      sellerId,
      numFeatures,
      feature1,
      feature2,
      feature2price,
      feature3,
      feature3price,
      feature4,
      feature4price,
      feature5,
      feature5price,
      numColors,
      color1,
      color2,
      image2: { url : url2, alt :alt2},
      color3,
      image3: { url : url3, alt :alt3},
      color4,
      image4: { url : url4, alt :alt4},
      color5,
      image5: { url : url5, alt :alt5},
    } = card;
    return { 
      name,
      description,
      url, 
      alt,
      category, 
      subcategory, 
      price : price.toFixed(2),
      sold,
      ship : ship.toFixed(2),
      returnfree,
      quantity,
      sellerId,
      numFeatures,
      feature1,
      feature2,
      feature2price : feature2price.toFixed(2),
      feature3,
      feature3price : feature3price.toFixed(2),
      feature4,
      feature4price : feature4price.toFixed(2),
      feature5,
      feature5price : feature5price.toFixed(2),
      numColors,
      color1,
      color2,
      url2, 
      alt2,
      color3,
      url3, 
      alt3,
      color4,
      url4, 
      alt4,
      color5,
      url5, 
      alt5,
    };
  }

  doSubmit = async () => {
    try {
      const card = { ...this.state.data };
      const { id } = this.props;
      card._id = id;
      
      const maxFeatures = 5;
      let invalidFeatures = 0;

      if(!card.feature5||!card.feature5price){
        card.feature5 = "";
        card.feature5price = "";
        invalidFeatures ++;
      }
      if(!card.feature4||!card.feature4price){
        card.feature4 = "";
        card.feature4price = "";
        invalidFeatures ++;
      }
      if(!card.feature3||!card.feature3price){
        card.feature3 = "";
        card.feature3price = "";
        invalidFeatures ++;
      }
      if(!card.feature2||!card.feature2price){
        card.feature2 = "";
        card.feature2price = "";
        invalidFeatures ++;
      }
      if(!card.feature1){
        card.feature1 = "";
        invalidFeatures ++;
      }
      const validFeatures = maxFeatures-invalidFeatures;
      card.numFeatures = validFeatures;

      const maxColors = 5;
      let invalidColors = 0;

      if(!card.color5||!card.url5||!card.alt5){
        card.color5 = "";
        card.url5 = "";
        card.alt5 = "";
        invalidColors ++;
      }
      if(!card.color4||!card.url4||!card.alt4){
        card.color4 = "";
        card.url4 = "";
        card.alt4 = "";
        invalidColors ++;
      }
      if(!card.color3||!card.url3||!card.alt3){
        card.color3 = "";
        card.url3 = "";
        card.alt3 = "";
        invalidColors ++;
      }
      if(!card.color2||!card.url2||!card.alt2){
        card.color2 = "";
        card.url2 = "";
        card.alt2 = "";
        invalidColors ++;
      }
      if(!card.color1){
        card.color1 = "";
        invalidColors ++;
      }
      const validColors = maxColors-invalidColors;
      card.numColors = validColors;

      await editCard(card);
      toast.success("your product was been edited successfully");
      this.setState({ isCardEdit: true });
    } catch (error) {
      this.setState({ errors: { alt: error.message } });
    }
  };

  render() {
    const { isCardEdit, isMounted } = this.state;

    if (!isMounted) return null;

    if (isCardEdit) return <Navigate replace to="/my-products" />;

    return (
      <div
        style={{ minHeight: "85vh" }}
        className="container-fluid bg-light pb-4"
      >
        <div className="container">
          <PageHeader
            title="Edit Product"
            subTitle="Here you can edit your product"
          />
          <div className="center">
            <form
              onSubmit={this.handleSubmit}
              autoComplete="off"
              method="POST"
              className="col-12 col-md-10 col-xl-6 border p-2 bg-white"
            >
              {this.renderInput("name", "Name")}
              {this.renderTextarea("description", "Description")}
              {this.renderInput("url", "Image - Enter a URL")}
              {this.renderInput("alt", "Alt")}
              Category
              <br />
              <select defaultValue = {this.state.data.category} onChange={this.categoryChange}>
                <option value="women" >Women's Fashion</option>
                <option value="men" >Men's Fashion</option>
                <option value="phones" >Phones &amp; Telecommunication</option>
                <option value="office" >Computer, Office &amp; Security</option>
                <option value="electronic" >Consumer Electronics</option>
                <option value="jewelry" >Jewelry &amp; Watches</option>
                <option value="home" >Home,Pet &amp; Appliances</option>
                <option value="bags" >Bags &amp; Shoes</option>
                <option value="toys" >Toys , Kids &amp; Babies</option>
                <option value="outdoor" >Outdoor Fun &amp; Sports</option>
                <option value="beauty" >Beauty, Health &amp; Hair</option>
                <option value="automobiles" >Automobiles &amp; Motorcycles</option>
                <option value="tools" >Home Improvement &amp; Tools</option>
              </select>
              <br /><br />
              Subcategory
              <br />
              <select defaultValue = {this.state.data.subcategory} onChange={this.subcategoryChange} style={{display: (this.state.data.category === "women") ? 'block' : 'none' }}>
                <option value="dresses" >Dresses</option>
                <option value="tees" >Tees</option>
                <option value="blouses" >Blouses &amp; Shirts</option>
                <option value="hoodies" >Hoodies &amp; Sweatshirts</option>
                <option value="sets" >Women's Sets</option>
                <option value="suits" >Suits &amp; Blazers</option>
                <option value="tanks" >Tanks &amp; Camis</option>
                <option value="coats" >Coats &amp; Jackets</option>
                <option value="sweaters" >Sweaters</option>
                <option value="bodysuits" >Bodysuits</option>
              </select>
              <select defaultValue = {this.state.data.subcategory} onChange={this.subcategoryChange} style={{display: (this.state.data.category === "men") ? 'block' : 'none' }}>
                <option value="hoodies" >Hoodies &amp; Sweatshirts</option>
                <option value="sets" >T-shirts</option>
                <option value="suits" >Casual Shorts</option>
                <option value="tanks" >Men's Sets</option>
                <option value="coats" >Jackets</option>
              </select>
              <select defaultValue = {this.state.data.subcategory} onChange={this.subcategoryChange} style={{display: (this.state.data.category === "phones") ? 'block' : 'none' }}>
                <option value="android" >Android Phones</option>
                <option value="iphones" >iPhones</option>
                <option value="feature" >Feature Phones</option>
                <option value="refurbished" >Refurbished Phones</option>
                <option value="8gb" >8GB RAM</option>
                <option value="5g" >5G Phones</option>
              </select>
              <select defaultValue = {this.state.data.subcategory} onChange={this.subcategoryChange} style={{display: (this.state.data.category === "office") ? 'block' : 'none' }}>
                <option value="cpus" >CPUs</option>
                <option value="motherboards" >Motherboards</option>
                <option value="graphic" >Graphic Cards</option>
                <option value="mice" >Mice</option>
                <option value="keyboards" >Keyboards</option>
              </select>
              <select defaultValue = {this.state.data.subcategory} onChange={this.subcategoryChange} style={{display: (this.state.data.category === "electronic") ? 'block' : 'none' }}>
                <option value="cables" >Cables &amp; Adapters</option>
                <option value="cigarettes" >Electronic Cigarettes</option>
                <option value="batteries" >Batteries</option>
                <option value="chargers" >Chargers</option>
                <option value="accessories" >Home Electronic Accessories</option>
                <option value="cases" >Bags &amp; Cases</option>
              </select>
              <select defaultValue = {this.state.data.subcategory} onChange={this.subcategoryChange} style={{display: (this.state.data.category === "jewelry") ? 'block' : 'none' }}>
                <option value="silver" >925 Silver Jewelry</option>
                <option value="diamond" >Diamond Jewelry</option>
                <option value="pearl" >Pearl Jewelry</option>
                <option value="gem" >Gemstones</option>
                <option value="gold" >K-Gold Jewelry</option>
                <option value="earrings" >Fine Earrings</option>
                <option value="sets" >Fine Jewelry Sets</option>
                <option value="men" >Men's Fine Jewelry</option>
              </select>
              <select defaultValue = {this.state.data.subcategory} onChange={this.subcategoryChange} style={{display: (this.state.data.category === "home") ? 'block' : 'none' }}>
                <option value="fabric" >Fabric &amp; Sewing Supplies</option>
                <option value="needle" >Needle Arts &amp; Craft</option>
                <option value="painting" >5D DIY Diamond Painting</option>
              </select>
              <select defaultValue = {this.state.data.subcategory} onChange={this.subcategoryChange} style={{display: (this.state.data.category === "bags") ? 'block' : 'none' }}>
                <option value="totes" >Totes</option>
                <option value="shoulder" >Shoulder Bags</option>
                <option value="wallet" >Wallet</option>
                <option value="evening" >Evening Bags</option>
                <option value="clutches" >Clutches</option>
              </select>
              <select defaultValue = {this.state.data.subcategory} onChange={this.subcategoryChange} style={{display: (this.state.data.category === "toys") ? 'block' : 'none' }}>
                <option value="dresses" >Dresses</option>
                <option value="cloth-sets" >Clothing Sets</option>
                <option value="cloth-family" >Family Matching &amp; outfits</option>
                <option value="hoodies" >Hoodies &amp; Sweatshirts</option>
                <option value="robes" >Sleepwear &amp; Robes</option>
                <option value="child-shoes" >Children Shoes</option>
                <option value="strollers" >Baby Strollers</option>
              </select>
              <select defaultValue = {this.state.data.subcategory} onChange={this.subcategoryChange} style={{display: (this.state.data.category === "outdoor") ? 'block' : 'none' }}>
                <option value="swimming" >Swimming</option>
                <option value="onepiece" >One Piece Suits</option>
                <option value="twopiece" >Two Piece Suits</option>
                <option value="coverups" >Cover-Ups</option>
                <option value="men" >Men's Swimwear</option>
                <option value="children" >Children's Swimwear</option>
              </select>
              <select defaultValue = {this.state.data.subcategory} onChange={this.subcategoryChange} style={{display: (this.state.data.category === "beauty") ? 'block' : 'none' }}>
                <option value="bundle-closure" >Bundles With Closure</option>
                <option value="three-fourths" >3/4 Bundles</option>
                <option value="precolored" >Pre-Colored Weaves</option>
                <option value="closuress" >Closures</option>
              </select>
              <select defaultValue = {this.state.data.subcategory} onChange={this.subcategoryChange} style={{display: (this.state.data.category === "automobiles") ? 'block' : 'none' }}>
                <option value="lights" >Car Lights</option>
                <option value="interior" >Interior Parts</option>
                <option value="exterior" >Exterior Parts</option>
                <option value="vehicle" >Vehicle Sensors</option>
                <option value="brake" >Brake Systems</option>
                <option value="wipers" >Windshield Wipers</option>
                <option value="other" >Other Replacement Parts</option>
              </select>
              <select defaultValue = {this.state.data.subcategory} onChange={this.subcategoryChange} style={{display: (this.state.data.category === "tools") ? 'block' : 'none' }}>
                <option value="analysis" >Measurement &amp; Analysis Tools</option>
                <option value="hand" >Hand Tools</option>
                <option value="power" >Power Tools</option>
                <option value="garden" >Garden Tools</option>
                <option value="sets" >Tool Sets</option>
              </select>
              <br /><br />
              {this.renderInput("price", "Price In USD - Example: 34.70")}
              {this.renderInput("ship", "Shipping Price In USD")}
              Free Return
              <br />
              <select defaultValue = {this.state.data.returnfree} onChange={this.returnChange}>
                <option value="no" >No</option>
                <option value="yes" >Yes</option>
              </select>
              <br /><br />
              {this.renderInput("quantity", "Quantity")}
              <br /><br />
              <div>
                <div className="btn btn-success" onClick={() => this.addFeature()}>Add Feature</div>
                <div className="btn btn-danger" onClick={() => this.removeFeature()}>Remove Feature</div>
                <span style={{float: "right"}}>
                <div className="btn btn-warning" onClick={() => this.addColor()}>Add Color</div>
                <div className="btn btn-danger" onClick={() => this.removeColor()}>Remove Color</div>
                </span>
                
                
              </div>
              <br />
              {/* features */}
              <div style={{display: ( this.state.data.numFeatures > 0) ? 'block' : 'none' }}>
              <br></br>
              {this.renderInput("feature1", "Default Feature:")}
              </div>
              <div style={{display: ( this.state.data.numFeatures > 1) ? 'block' : 'none' }}>
              <br></br>
              {this.renderInput("feature2", "Second Feature:")}
              {this.renderInput("feature2price", "Price In USD")}
              </div>
              <div style={{display: ( this.state.data.numFeatures > 2) ? 'block' : 'none' }}>
              <br></br>
              {this.renderInput("feature3", "Third Feature:")}
              {this.renderInput("feature3price", "Price In USD")}
              </div>
              <div style={{display: ( this.state.data.numFeatures > 3) ? 'block' : 'none' }}>
              <br></br>
              {this.renderInput("feature4", "Fourth Feature:")}
              {this.renderInput("feature4price", "Price In USD")}
              </div>
              <div style={{display: ( this.state.data.numFeatures > 4) ? 'block' : 'none' }}>
              <br></br>
              {this.renderInput("feature5", "Fifth Feature:")}
              {this.renderInput("feature5price", "Price In USD")}
              </div>
              {/* colors */}
              <div style={{display: ( this.state.data.numColors > 0) ? 'block' : 'none' }}>
              <br></br>
              {this.renderInput("color1", "Default Color:")}
              </div>
              <div style={{display: ( this.state.data.numColors > 1) ? 'block' : 'none' }}>
              <br></br>
              {this.renderInput("color2", "Second Color:")}
              {this.renderInput("url2", "Color 2 Image - Enter a URL")}
              {this.renderInput("alt2", "Color 2 Alt")}
              </div>
              <div style={{display: ( this.state.data.numColors > 2) ? 'block' : 'none' }}>
              <br></br>
              {this.renderInput("color3", "Third Color:")}
              {this.renderInput("url3", "Color 3 Image - Enter a URL")}
              {this.renderInput("alt3", "Color 3 Alt")}
              </div>
              <div style={{display: ( this.state.data.numColors > 3) ? 'block' : 'none' }}>
              <br></br>
              {this.renderInput("color4", "Fourth Color:")}
              {this.renderInput("url4", "Color 4 Image - Enter a URL")}
              {this.renderInput("alt4", "Color 4 Alt")}
              </div>
              <div style={{display: ( this.state.data.numColors > 4) ? 'block' : 'none' }}>
              <br></br>
              {this.renderInput("color5", "Fifth Color:")}
              {this.renderInput("url5", "Color 5 Image - Enter a URL")}
              {this.renderInput("alt5", "Color 5 Alt")}
              </div>
              <br />

              {this.renderButton("Edit Product")}
              

              <Link to="/my-products">
                <span className="btn btn-danger mt-1 col-12">Cancel</span>
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditProduct;
