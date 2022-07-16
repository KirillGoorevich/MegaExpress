import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Order = ({ order }) => {
  const _id = order.card.cardId;
  const url = order.card.image.url;
  const alt = order.card.image.alt;

  return (
    <div className="container" style={{marginTop: "3vh"}}>
      <div style={{display: "flex"}}>
        <div className="col-xl-3"></div>
        <div className="col-12 col-md-10 col-xl-6 border p-2 bg-white" style={{diplay: "inline"}}>
          <div  style={{display: "flex",justifyContent: "space-between"}}>
            <div>
              <p>Buyer: {order.data.name}</p>
              <p>Contact: {order.data.phone}</p>
              <p><FontAwesomeIcon icon={faLocationDot}/>&nbsp; {order.data.address}</p>
            </div>
            <div>
              <p>Order ID: {order._id}</p>
              <p>Order placed on: {order.date}</p>
              <p>Status: {order.status}</p>
            </div>
          </div>
          <p style={{display: (order.card.returnfree === "yes") ? 'inline' : 'none' }}> If there are any problems, you can apply for a refund/return within 15 days of confirming receipt.</p>
        </div>
      </div>
      <div style={{display: "flex"}}>
      <div className="col-xl-3"></div>
      <div className="col-12 col-md-10 col-xl-6 border p-2 bg-white" style={{diplay: "inline"}}>
          <div style={{display: "flex",justifyContent: "space-between"}}>
          <div>
            <img src="https://ae01.alicdn.com/kf/H3f645a747e2840f9bc543e561fde86fdA.png" alt="Shop Icon" className="shop-icon"/>
            <span>{order.card.bizName}</span>
          </div>
            <p>Contact: {order.contact}</p>
          </div>
          <p>Estimated delivery date: {order.deliveryDate}</p>
        </div>
      </div>
      <div style={{display: "flex"}}>
      <div className="col-xl-3"></div>
      <div className="col-12 col-md-10 col-xl-6 border p-2 bg-white" style={{display: "flex",justifyContent: "space-between"}}>
        <div>
          <p>Order: {order.card.name}</p>
          <p>Feature: {order.data.selectedFeature}</p>
          <p>Color: {order.data.displayColor}</p>
          <p>Price per unit: US ${order.card.price}</p>
          <p>Shipping per unit: US ${order.card.ship}</p>
          <p>Quantity: {order.data.selectedQuantity}</p>
          <p>Total: US ${order.data.selectedQuantity*(order.card.price+order.card.ship)}</p>
        </div>
        <div>
          <Link to={`/product-details/${_id}`}>
            <img style={{width: "15vw"}} src={url} alt={alt} />
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
};

Order.propTypes = {
  order: PropTypes.object.isRequired,
};

export default Order;
