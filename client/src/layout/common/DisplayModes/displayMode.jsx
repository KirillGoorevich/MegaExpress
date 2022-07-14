import PropTypes from "prop-types";
import Cards from "../Cards/cards";
import TableRow from "../Cards/tableRow.jsx.jsx";
import TableColumn from "../Cards/tableColumn";
import Orders from "../Orders/orders";

const DisplayModes = ({ cards, display, changeLikeStatus, handleDelete, removeCartCards}) => {
  if (!cards.length) return <div>No Products</div>;

  if (display === "cards" || display === "cat")
    return (
      <Cards
        cards={cards}
        changeLikeStatus={changeLikeStatus}
        handleDelete={handleDelete}
      />
    );
  if (display === "table-row") return <TableRow cards={cards} />;
  if (display === "table-column") return <TableColumn cards={cards} />;
  if(display === "orders")
      return(
        <Orders
        orders={cards}
      />
    );
  if (display === "cart")
      return (
        <Cards
          cards={cards}
          changeLikeStatus={changeLikeStatus}
          display={display}
          removeCartCards = {removeCartCards}
          handleDelete={handleDelete}
        />
    );
};

DisplayModes.propTypes = {
  cards: PropTypes.array.isRequired,
  display: PropTypes.string.isRequired,
  handleDelete: PropTypes.func,
  changeLikeStatus: PropTypes.func,
  removeCartCards: PropTypes.func,
};

export default DisplayModes;
