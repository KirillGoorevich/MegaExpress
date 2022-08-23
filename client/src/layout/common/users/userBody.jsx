import PropTypes from "prop-types";

const UserBody = ({ user }) => {
  const { email, biz, phone, isAdmin, createdAt} = user;
  return (
    <div className="card-body p-2">
      <span>Email: {email}</span><br />
      <span>Phone: {phone}</span><br />
      <span>Admin User: {""+isAdmin}</span><br />
      <span>Buisness User: {""+biz}</span><br />
      <span>Created At: {createdAt}</span><br />
    </div>
  );
};

UserBody.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserBody;
