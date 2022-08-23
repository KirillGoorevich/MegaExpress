import PropTypes from "prop-types";
import User from "./user";

const Users = ({ users, handleDelete, makeAdmin,cur_user,imageArray}) => {
  if (!users.length) return <div>No Users In The State Object...</div>;

  return (
    <div className="row">
      {users.map((user, i) => (
        <User
          key={i}
          user={user}
          handleDelete={handleDelete}
          makeAdmin = {makeAdmin}
          cur_user ={cur_user}
          image = {imageArray[i].image}
        />
      ))}
    </div>
  );
};

Users.propTypes = {
  cur_user: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  makeAdmin: PropTypes.func.isRequired,
  imageArray: PropTypes.array.isRequired,
};

export default Users;