import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regHeart} from '@fortawesome/free-regular-svg-icons'
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { CartXFill } from 'react-bootstrap-icons';

const CardControllers = ({ card, user, handleDelete, changeLikeStatus , display , removeCartCards}) => {
  const cardLikes = card.likes;
  let isCardLiked = null;
  let cart =null;

  if(display === "cart"){
    cart = "cart";
  }

  if (user && cardLikes.length)
    isCardLiked = cardLikes.find((id) => id === user._id);

  return (
    <div style={{marginLeft: "1vh"}}>
      <div style={{display: "flex",justifyContent: "space-between",}}>
        <div>
          <img src="https://ae01.alicdn.com/kf/H3f645a747e2840f9bc543e561fde86fdA.png" alt="Shop Icon" className="shop-icon"/>
          <span> {card.bizName}</span>
        </div>
      <div className="justify-content-between d-flex px-2 pb-2">
      <div>
        {user && (
            <div>
              <FontAwesomeIcon
                icon={isCardLiked ?  solidHeart : regHeart}
                className={isCardLiked ? "text-danger" : "text-secondary"}
                onClick={() => changeLikeStatus(card._id, user)}
                />
                {cardLikes.length}{" "}
            </div>
          )}
        </div>
      </div>
      </div>
      {user && (user._id === card.user_id) | user.isAdmin ? (
        <div>
          <span className="cursor" onClick={() => handleDelete(card._id)}>
            Delete |{" "}
          </span>
          <Link to={`/edit-product/${card._id}`}>
            <span className="cursor">Edit</span>
          </Link>
        </div>
      ) : null}
      
    <div>
    {cart && (
        <div style={{display: "flex",justifyContent: "center",marginTop: "1vh"}}>
          <span className="btn" onClick={() => removeCartCards(card._id, user)}> <CartXFill style={{fontSize:"30px"}} /></span>
        </div>
      )}
    </div>
    </div>
  );
};

CardControllers.propTypes = {
  card: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  changeLikeStatus: PropTypes.func.isRequired,
  user: PropTypes.object,
  display: PropTypes.string,
  removeCartCards: PropTypes.func,
};

export default CardControllers;
