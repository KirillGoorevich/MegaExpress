import PropTypes from "prop-types";
import CardBody from "./cardBody";
import CardControllers from "./cardControllers";
import CardHead from "./cardHead";

const Card = ({ card, handleDelete, user, changeLikeStatus , display , removeCartCards}) => {
  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3 mt-3">
      <div className="card px-0" style={{minWidth: "10vw"}}>
        <CardHead card={card} />
        <CardBody card={card} />
        <CardControllers
          card={card}
          user={user}
          handleDelete={handleDelete}
          changeLikeStatus={changeLikeStatus}
          display={display}
          removeCartCards = {removeCartCards}
        />
      </div>
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  changeLikeStatus: PropTypes.func.isRequired,
  user: PropTypes.object,
  display: PropTypes.string,
  removeCartCards: PropTypes.func,
};

export default Card;
