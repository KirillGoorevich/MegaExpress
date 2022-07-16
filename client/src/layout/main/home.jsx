import React from "react";
import { getCards } from "../../services/cardService";
import CardExtends from "../common/Cards/cardExtends";
import SearchBar from "../common/searchBar";
import DisplayControllers from "../common/DisplayModes/displayControllers";
import DisplayModes from "../common/DisplayModes/displayMode";
import { FaGem} from "react-icons/fa";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';




class HomePage extends CardExtends {
  state = {
    data: [],
    cards: [],
    isMount: false,
    display: "cards",
  };

  async componentDidMount() {
    try {
      const { data } = await getCards();
      this.setState({ data, cards: data, isMount: true });
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    const cards = [...this.state.cards];
    const { isMount, display } = this.state;
    if (!isMount) return null;

    return (
      <React.Fragment>
      <div style={{  display: 'flex', flexDirection: 'row', justifyContent: 'center',paddingBottom: "5vh"}}>
        <div style={{ marginTop: '5em', }}>
          {/* Links not implemented */}
        <ProSidebar style={{marginTop: "2vh"}}>
          <Menu iconShape="square">
            <MenuItem icon={<FaGem />}>Categories  <Link to="/" /></MenuItem>
            <SubMenu title="Women's Fashion" icon={<FaGem />}>
              <MenuItem>Dresses <Link to="/cat-order-converter" state={{ cat: "dresses" }}></Link></MenuItem>
              <MenuItem>Tees <Link to="/cat-order-converter" state={{ cat: "tees" }}></Link></MenuItem>
              <MenuItem>Blouses &amp; Shirts<Link to="/cat-order-converter" state={{ cat: "blouses" }}></Link></MenuItem>
              <MenuItem>Hoodies &amp; Sweatshirts<Link to="/cat-order-converter" state={{ cat: "hoodies" }}></Link></MenuItem>
              <MenuItem>Women's Sets<Link to="/cat-order-converter" state={{ cat: "sets" }}></Link></MenuItem>
              <MenuItem>Suits &amp; Blazers<Link to="/cat-order-converter" state={{ cat: "suits" }}></Link></MenuItem>
              <MenuItem>Tanks &amp; Camis<Link to="/cat-order-converter" state={{ cat: "tanks" }}></Link></MenuItem>
              <MenuItem>Coats &amp; Jackets<Link to="/cat-order-converter" state={{ cat: "coats" }}></Link></MenuItem>
              <MenuItem>Sweaters<Link to="/cat-order-converter" state={{ cat: "sweaters" }}></Link></MenuItem>
              <MenuItem>Bodysuits<Link to="/cat-order-converter" state={{ cat: "bodysuits" }}></Link></MenuItem>
            </SubMenu>
            <SubMenu title="Men's Fashion" icon={<FaGem />}>
              <MenuItem>Hoodies &amp; Sweatshirts<Link to="/cat-order-converter" state={{ cat: "hoodies" }}></Link></MenuItem>
              <MenuItem>T-shirts<Link to="/cat-order-converter" state={{ cat: "tanks" }}></Link></MenuItem>
              <MenuItem>Casual Shorts<Link to="/cat-order-converter" state={{ cat: "suits" }}></Link></MenuItem>
              <MenuItem>Men's Sets<Link to="/cat-order-converter" state={{ cat: "sets" }}></Link></MenuItem>
              <MenuItem>Jackets<Link to="/cat-order-converter" state={{ cat: "coats" }}></Link></MenuItem>
            </SubMenu>
            <SubMenu title="Phones &amp; Telecommunications" icon={<FaGem />}>
              <MenuItem>Android Phones<Link to="/cat-order-converter" state={{ cat: "android" }}></Link></MenuItem>
              <MenuItem>iPhones<Link to="/cat-order-converter" state={{ cat: "iphones" }}></Link></MenuItem>
              <MenuItem>Feature Phones<Link to="/cat-order-converter" state={{ cat: "feature" }}></Link></MenuItem>
              <MenuItem>Refurbished Phones<Link to="/cat-order-converter" state={{ cat: "refurbished" }}></Link></MenuItem>
              <MenuItem>8GB RAM<Link to="/cat-order-converter" state={{ cat: "8gb" }}></Link></MenuItem>
              <MenuItem>5G Phones<Link to="/cat-order-converter" state={{ cat: "5g" }}></Link></MenuItem>
            </SubMenu>
            <SubMenu title="Computer, Office &amp; Security" icon={<FaGem />}>
              <MenuItem>CPUs<Link to="/cat-order-converter" state={{ cat: "cpus" }}></Link></MenuItem>
              <MenuItem>Motherboards<Link to="/cat-order-converter" state={{ cat: "motherboards" }}></Link></MenuItem>
              <MenuItem>Graphic Cards<Link to="/cat-order-converter" state={{ cat: "graphic" }}></Link></MenuItem>
              <MenuItem>Mice<Link to="/cat-order-converter" state={{ cat: "mice" }}></Link></MenuItem>
              <MenuItem>Keyboards<Link to="/cat-order-converter" state={{ cat: "keyboards" }}></Link></MenuItem>
            </SubMenu>
            <SubMenu title="Consumer Electronics" icon={<FaGem />}>
              <MenuItem>Cables &amp; Adapters<Link to="/cat-order-converter" state={{ cat: "cables" }}></Link></MenuItem>
              <MenuItem>Electronic Cigarettes<Link to="/cat-order-converter" state={{ cat: "cigarettes" }}></Link></MenuItem>
              <MenuItem>Batteries<Link to="/cat-order-converter" state={{ cat: "batteries" }}></Link></MenuItem>
              <MenuItem>Chargers<Link to="/cat-order-converter" state={{ cat: "chargers" }}></Link></MenuItem>
              <MenuItem>Home Electronic Accessories<Link to="/cat-order-converter" state={{ cat: "accessories" }}></Link></MenuItem>
              <MenuItem>Bags &amp; Cases<Link to="/cat-order-converter" state={{ cat: "cases" }}></Link></MenuItem>
            </SubMenu>
            <SubMenu title="Jewelry &amp; Watches" icon={<FaGem />}>
              <MenuItem>925 Silver Jewelry<Link to="/cat-order-converter" state={{ cat: "silver" }}></Link></MenuItem>
              <MenuItem>Diamond Jewelry<Link to="/cat-order-converter" state={{ cat: "diamond" }}></Link></MenuItem>
              <MenuItem>Pearl Jewelry<Link to="/cat-order-converter" state={{ cat: "pearl" }}></Link></MenuItem>
              <MenuItem>Gemstones<Link to="/cat-order-converter" state={{ cat: "gem" }}></Link></MenuItem>
              <MenuItem>K-Gold Jewelry<Link to="/cat-order-converter" state={{ cat: "gold" }}></Link></MenuItem>
              <MenuItem>Fine Earrings<Link to="/cat-order-converter" state={{ cat: "earrings" }}></Link></MenuItem>
              <MenuItem>Fine Jewelry Sets<Link to="/cat-order-converter" state={{ cat: "sets" }}></Link></MenuItem>
              <MenuItem>Men's Fine Jewelry<Link to="/cat-order-converter" state={{ cat: "men" }}></Link></MenuItem>
            </SubMenu>
            <SubMenu title="Home,Pet &amp; Appliances" icon={<FaGem />}>
              <MenuItem>Fabric &amp; Sewing Supplies<Link to="/cat-order-converter" state={{ cat: "fabric" }}></Link></MenuItem>
              <MenuItem>Needle Arts &amp; Craft<Link to="/cat-order-converter" state={{ cat: "needle" }}></Link></MenuItem>
              <MenuItem>Scrapbooking &amp; Stamps<Link to="/cat-order-converter" state={{ cat: "painting" }}></Link></MenuItem>
            </SubMenu>
            <SubMenu title="Bags &amp; Shoes" icon={<FaGem />}>
              <MenuItem>Totes<Link to="/cat-order-converter" state={{ cat: "totes" }}></Link></MenuItem>
              <MenuItem>Shoulder Bags<Link to="/cat-order-converter" state={{ cat: "shoulder" }}></Link></MenuItem>
              <MenuItem>Wallet<Link to="/cat-order-converter" state={{ cat: "wallet" }}></Link></MenuItem>
              <MenuItem>Evening Bags<Link to="/cat-order-converter" state={{ cat: "evening" }}></Link></MenuItem>
              <MenuItem>Clutches<Link to="/cat-order-converter" state={{ cat: "clutches" }}></Link></MenuItem>
            </SubMenu>
            <SubMenu title="Toys , Kids &amp; Babies" icon={<FaGem />}>
              <MenuItem>Dresses<Link to="/cat-order-converter" state={{ cat: "dresses" }}></Link></MenuItem>
              <MenuItem>Clothing Sets<Link to="/cat-order-converter" state={{ cat: "cloth-sets" }}></Link></MenuItem>
              <MenuItem>Family Matching &amp; outfits<Link to="/cat-order-converter" state={{ cat: "cloth-family" }}></Link></MenuItem>
              <MenuItem>Hoodies &amp; Sweatshirts<Link to="/cat-order-converter" state={{ cat: "hoodies" }}></Link></MenuItem>
              <MenuItem>Sleepwear &amp; Robes<Link to="/cat-order-converter" state={{ cat: "robes" }}></Link></MenuItem>
              <MenuItem>Children Shoes<Link to="/cat-order-converter" state={{ cat: "child-shoes" }}></Link></MenuItem>
              <MenuItem>Baby Strollers<Link to="/cat-order-converter" state={{ cat: "strollers" }}></Link></MenuItem>
            </SubMenu>
            <SubMenu title="Outdoor Fun &amp; Sports" icon={<FaGem />}>
              <MenuItem>Swimming<Link to="/cat-order-converter" state={{ cat: "swimming" }}></Link></MenuItem>
              <MenuItem>One Piece Suits<Link to="/cat-order-converter" state={{ cat: "onepiece" }}></Link></MenuItem>
              <MenuItem>Two Piece Suits<Link to="/cat-order-converter" state={{ cat: "twopiece" }}></Link></MenuItem>
              <MenuItem>Cover-Ups<Link to="/cat-order-converter" state={{ cat: "coverups" }}></Link></MenuItem>
              <MenuItem>Men's Swimwear<Link to="/cat-order-converter" state={{ cat: "men" }}></Link></MenuItem>
              <MenuItem>Children's Swimwear<Link to="/cat-order-converter" state={{ cat: "children" }}></Link></MenuItem>
            </SubMenu>
            <SubMenu title="Beauty, Health &amp; Hair" icon={<FaGem />}>
              <MenuItem>Bundles With Closure<Link to="/cat-order-converter" state={{ cat: "bundle-closure" }}></Link></MenuItem>
              <MenuItem>3/4 Bundles<Link to="/cat-order-converter" state={{ cat: "three-fourths" }}></Link></MenuItem>
              <MenuItem>Pre-Colored Weaves<Link to="/cat-order-converter" state={{ cat: "precolored" }}></Link></MenuItem>
              <MenuItem>Closures<Link to="/cat-order-converter" state={{ cat: "closuress" }}></Link></MenuItem>
            </SubMenu>
            <SubMenu title="Automobiles &amp; Motorcycles" icon={<FaGem />}>
              <MenuItem>Car Lights<Link to="/cat-order-converter" state={{ cat: "lights" }}></Link></MenuItem>
              <MenuItem>Interior Parts<Link to="/cat-order-converter" state={{ cat: "interior" }}></Link></MenuItem>
              <MenuItem>Exterior Parts<Link to="/cat-order-converter" state={{ cat: "exterior" }}></Link></MenuItem>
              <MenuItem>Vehicle Sensors<Link to="/cat-order-converter" state={{ cat: "vehicle" }}></Link></MenuItem>
              <MenuItem>Brake Systems<Link to="/cat-order-converter" state={{ cat: "brake" }}></Link></MenuItem>
              <MenuItem>Windshield Wipers<Link to="/cat-order-converter" state={{ cat: "wipers" }}></Link></MenuItem>
              <MenuItem>Other Replacement Parts<Link to="/cat-order-converter" state={{ cat: "other" }}></Link></MenuItem>
            </SubMenu>
            <SubMenu title="Home Improvement &amp; Tools" icon={<FaGem />}>
              <MenuItem>Measurement &amp; Analysis Tools<Link to="/cat-order-converter" state={{ cat: "analysis" }}></Link></MenuItem>
              <MenuItem>Hand Tools<Link to="/cat-order-converter" state={{ cat: "hand" }}></Link></MenuItem>
              <MenuItem>Power Tools<Link to="/cat-order-converter" state={{ cat: "power" }}></Link></MenuItem>
              <MenuItem>Garden Tools<Link to="/cat-order-converter" state={{ cat: "garden" }}></Link></MenuItem>
              <MenuItem>Tool Sets<Link to="/cat-order-converter" state={{ cat: "sets" }}></Link></MenuItem>
            </SubMenu>
          </Menu>
        </ProSidebar>
        </div>
        <div style={{  alignItems: 'center', }}>
        <h1 className="text-center display-4" style={{color: '#e62e04', textDecoration: 'none'}}>MegaExpress</h1>
        <h5 className="text-center" style={{color: '#e62e04', textDecoration: 'none'}}>You order, We deliver!</h5>
        <div className="container">
          <SearchBar
            placeholder="I'm shopping for..."
            handleChange={this.handleChange}
          />
          <div style={{height: '1vh'}}></div>
          <DisplayControllers
            display={display}
            handeDisplay={this.handleDisplay}
          />
          
          <DisplayModes
            cards={cards}
            handleDelete={this.handleDelete}
            changeLikeStatus={this.changeLikeStatus}
            display={display}
          />
        </div>
        </div>
      </div>
      </React.Fragment>
    );
  }
}

export default HomePage;