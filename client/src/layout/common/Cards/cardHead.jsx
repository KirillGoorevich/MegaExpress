import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CardHead = ({ card }) => {
  const {
    _id,
    name,
    price,
    image: { url, alt },
  } = card;

  return (
    <div className="card-head">
      <Link to={`/product-details/${_id}`}>
        <img className="img-fluid" src={url} alt={alt} />
      </Link>
      <div className="p-2">
        <h5 className="card-name">{name}</h5>
        <strong className="card-text">US ${price}</strong>
        <hr className="m-0" />
      </div>
    </div>
  );
};

CardHead.propTypes = {
  card: PropTypes.object.isRequired,
};

export default CardHead;
