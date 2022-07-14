import PropTypes from "prop-types";

const CardBody = ({ card }) => {
  const {  sold ,ship, returnfree} = card;
  return (
    <div className="card-body p-2">
      <div>
        {sold}
        <span> sold</span>
      </div>
      <div>
        <p style={{display: (ship === 0) ? 'block' : 'none' }}>Free Shipping</p>
        <p style={{display: (ship !== 0) ? 'block' : 'none' }}>+Shipping: US ${ship}</p>
      </div>
      <div>
      <p style={{display: (returnfree === "yes") ? 'block' : 'none' }}>Free Return</p>
      </div>

    </div>
  );
};

CardBody.propTypes = {
  card: PropTypes.object.isRequired,
};

export default CardBody;
