import {
    faIdCard,
    faTableList,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import PropTypes from "prop-types";

const UserDisplayControllers = ({ display, handleDisplay }) => {
    return (
      <>
        {/* card view */}
      <button
        className="btn btn-outlien-dark me-1"
        onClick={() => handleDisplay("user-cards")}
        disabled={display === "user-cards" ? true : false}
      >
        <FontAwesomeIcon icon={faIdCard} />
      </button>
      {/* table view */}
      <button
        className="btn btn-outlien-dark me-1"
        onClick={() => handleDisplay("user-table-row")}
        disabled={display === "user-table-row" ? true : false}
      >
        <FontAwesomeIcon icon={faTableList} />
      </button>
      </>
    );
  };
  
  UserDisplayControllers.propTypes = {
    display: PropTypes.string.isRequired,
    handleDisplay: PropTypes.func.isRequired,
  };
  
  export default UserDisplayControllers;
  