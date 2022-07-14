import { useLocation, useParams } from "react-router-dom";
import PlaceOrder from "./placeOrder";



const PlaceOrderConvertor = ({ user }) => {
  const { id } = useParams();
  const location = useLocation();
  const {displayColor,selectedFeature ,displayPrice,selectedQuantity,selectedCountry} = location.state;
  return <PlaceOrder id={id} displayColor={displayColor} displayPrice={displayPrice} selectedQuantity={selectedQuantity} selectedCountry={selectedCountry} selectedFeature={selectedFeature} user={user}/>;
};

export default PlaceOrderConvertor;
