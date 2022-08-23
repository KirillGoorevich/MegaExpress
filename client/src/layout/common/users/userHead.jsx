import PropTypes from "prop-types";

const UserHead = ({ user , image}) => {
  const {
    name,
  } = user;


  return (
    <div>
      <img className="img-fluid" src={image}
      alt={"profile pic"} />
      <div className="p-2">
        <h5 className="card-name">{name}</h5>
        <hr className="m-0" />
      </div>
    </div>
  );
};

UserHead.propTypes = {
  user: PropTypes.object.isRequired,
  image: PropTypes.string.isRequired,
};

export default UserHead;
