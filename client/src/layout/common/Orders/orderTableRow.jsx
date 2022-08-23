import PropTypes from "prop-types";

const OrderTableRow = ({ cur_user,orders, handleDelete}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Buyer</th>
          <th>Contact</th>
          <th>Order ID</th>
          <th>Order placed on</th>
          <th>Status</th>
          <th>Order</th>
          <th>Feature</th>
          <th>Color</th>
          <th>Price per unit in US $</th>
          <th>Shipping per unit in US $</th>
          <th>Quantity</th>
          <th>Total in US $</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, i) => {
          const { createdAt } = order;
          return (
            <tr key={i}>
              <td>{order.data.name}</td>
              <td>{order.data.phone}</td>
              <td>{order._id}</td>
              <td>{order.date}</td>
              <td>{order.status}</td>
              <td>{order.card.name}</td>
              <td>{order.data.selectedFeature}</td>
              <td>{order.data.displayColor}</td>
              <td>{order.card.price}</td>
              <td>{order.card.ship}</td>
              <td>{order.data.selectedQuantity}</td>
              <td>{(order.data.selectedQuantity*(order.card.price+order.card.ship)).toFixed(2)}</td>
              <td>{createdAt}</td>
              <td>{cur_user.isAdmin ? (
                <span className="cursor" onClick={() => handleDelete(order._id)}>
                Delete {" "}
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

OrderTableRow.propTypes = {
  cur_user: PropTypes.object.isRequired,
  orders: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default OrderTableRow;
