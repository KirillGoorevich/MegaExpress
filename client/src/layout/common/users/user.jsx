import PropTypes from "prop-types";
import UserBody from "./userBody";
import UserControllers from "./userControllers";
import UserHead from "./userHead";

const User = ({ handleDelete,cur_user ,user,makeAdmin,image}) => {
  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3 mt-3">
      <div className="card px-0" style={{minWidth: "10vw"}}>
        <UserHead 
        user={user} 
        image={image}
        />
        <UserBody user={user} />
        <UserControllers
          user={user}
          cur_user={cur_user}
          handleDelete={handleDelete}
          makeAdmin= {makeAdmin}
        />
      </div>
    </div>
  );
};

User.propTypes = {
  cur_user: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  makeAdmin: PropTypes.func.isRequired,
  user: PropTypes.object,
  image: PropTypes.string.isRequired,
};

export default User;