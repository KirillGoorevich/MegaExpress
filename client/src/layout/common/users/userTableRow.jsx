import PropTypes from "prop-types";

const UserTableRow = ({ cur_user,users, handleDelete, makeAdmin}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>num.</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Admin User</th>
          <th>Buissness User</th>
          <th>Created At</th>
          <th>Delete</th>
          <th>Make Admin</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, i) => {
          const { name, email, phone, isAdmin, biz, createdAt } = user;
          return (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{name}</td>
              <td>{email}</td>
              <td>{phone}</td>
              <td>{""+isAdmin}</td>
              <td>{""+biz}</td>
              <td>{createdAt}</td>
              <td>{cur_user.isAdmin && user._id !== cur_user._id ? (
                <span className="cursor" onClick={() => handleDelete(user._id)}>
                Delete {" "}
                </span>
                ) : null}
              </td>
              <td>
                {cur_user.isAdmin && !user.isAdmin ? (
                <span className="cursor" onClick={() => makeAdmin(user._id)}>
                Make Admin
                </span>
                ) : null}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

UserTableRow.propTypes = {
  cur_user: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  makeAdmin: PropTypes.func.isRequired,
};

export default UserTableRow;
