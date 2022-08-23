import PropTypes from "prop-types";
import Order from "./order"

const Orders = ({ orders,handleDelete,cur_user }) => {
  if (!orders.length) return <div>No Orders In The State Object...</div>;


  return (
    <div className="row">
      {orders.map((order, i) => (
        <Order
          key={i}
          order={order}
          cur_user={cur_user}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

Orders.propTypes = {
  orders: PropTypes.array.isRequired,
  handleDelete: PropTypes.func,
};

export default Orders;
