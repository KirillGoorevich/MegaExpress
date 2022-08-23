import PropTypes from "prop-types";
import { getCurrentUser } from "../../../services/userService";
import Users from "./users";
import UserTableRow from "./userTableRow.jsx";

const UserDisplayModes = ({ users, display, handleDelete,makeAdmin,imageArray}) => {
  if (!users.length) return <div>No Users</div>;
  const cur_user  = getCurrentUser();

  if (display === "user-cards")
    return (
      <Users
        users={users}
        handleDelete={handleDelete}
        makeAdmin={makeAdmin}
        cur_user={cur_user}
        imageArray={imageArray}
      />
    );
  if(display === "user-table-row"){
    return <UserTableRow 
    users={users} 
    handleDelete = {handleDelete}
    makeAdmin={makeAdmin}
    cur_user={cur_user}
    />;
  }
};

UserDisplayModes.propTypes = {
  users: PropTypes.array.isRequired,
  display: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  makeAdmin: PropTypes.func.isRequired,
  imageArray: PropTypes.array.isRequired,
};

export default UserDisplayModes;
