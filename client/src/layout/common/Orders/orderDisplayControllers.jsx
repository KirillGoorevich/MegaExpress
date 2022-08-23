import {
    faIdCard,
    faTableList,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import PropTypes from "prop-types";

const OrderDisplayControllers = ({ display, handleDisplay }) => {
    return (
      <>
        {/* card view */}
      <button
        className="btn btn-outlien-dark me-1"
        onClick={() => handleDisplay("order-cards")}
        disabled={display === "order-cards" ? true : false}
      >
        <FontAwesomeIcon icon={faIdCard} />
      </button>
      {/* table view */}
      <button
        className="btn btn-outlien-dark me-1"
        onClick={() => handleDisplay("order-table-row")}
        disabled={display === "order-table-row" ? true : false}
      >
        <FontAwesomeIcon icon={faTableList} />
      </button>
      </>
    );
  };
  
  OrderDisplayControllers.propTypes = {
    display: PropTypes.string.isRequired,
    handleDisplay: PropTypes.func.isRequired,
  };
  
  export default OrderDisplayControllers;
  