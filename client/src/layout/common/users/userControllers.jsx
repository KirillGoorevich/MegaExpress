import PropTypes from "prop-types";

const UserControllers = ({ user, cur_user, handleDelete,makeAdmin}) => {

  return (
    <div style={{marginLeft: "1vh"}}>
      {cur_user.isAdmin && user._id !== cur_user._id ? (
          <span className="cursor" onClick={() => handleDelete(user._id)}>
          Delete {" "}
          </span>
      ) : null}
      {cur_user.isAdmin && !user.isAdmin ? (
          <span className="cursor" onClick={() => makeAdmin(user._id)}>
          |{" "} Make Admin
          </span>
      ) : null}
    </div>
  );
};

UserControllers.propTypes = {
  cur_user: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  makeAdmin: PropTypes.func.isRequired,
};

export default UserControllers;
