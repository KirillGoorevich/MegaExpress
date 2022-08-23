import PropTypes from "prop-types";
import { getCurrentUser } from "../../../services/userService";
import Orders from "./orders";
import OrderTableRow from "./orderTableRow";

const OrderDisplayModes = ({ orders, display, handleDelete,makeAdmin}) => {
  if (!orders.length) return <div>No Orders</div>;
  const cur_user  = getCurrentUser();

  if(display === "order-cards")
      return(
        <Orders
        orders={orders}
        handleDelete = {handleDelete}
        cur_user={cur_user}
      />
    );
  if(display === "order-table-row")
  return <OrderTableRow 
  orders={orders} 
  handleDelete = {handleDelete}
  cur_user={cur_user}
  />;
  else{
    return <div>{display}</div>
  }
};

OrderDisplayModes.propTypes = {
  orders: PropTypes.array.isRequired,
  display: PropTypes.string.isRequired,
  handleDelete: PropTypes.func,
};

export default OrderDisplayModes;
