import PropTypes from "prop-types";
import { getCurrentUser } from "../../../services/userService";
import Order from "./order"

const Orders = ({ orders }) => {
  if (!orders.length) return <div>No Orders In The State Object...</div>;

  const user = getCurrentUser();

  return (
    <div className="row">
      {orders.map((order, i) => (
        <Order
          key={i}
          order={order}
          user={user}
        />
      ))}
    </div>
  );
};

Orders.propTypes = {
  orders: PropTypes.array.isRequired,
};

export default Orders;
