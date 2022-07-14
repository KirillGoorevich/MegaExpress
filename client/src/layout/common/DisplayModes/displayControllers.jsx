import {
  faIdCard,
  faTableList,
  faTableColumns,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const DisplayControllers = ({ display, handeDisplay }) => {
  return (
    <>
      {/* card view */}
      <button
        className="btn btn-outlien-dark me-1"
        onClick={() => handeDisplay("cards")}
        disabled={display === "cards" ? true : false}
      >
        <FontAwesomeIcon icon={faIdCard} />
      </button>

      {/* table view */}
      <button
        className="btn btn-outlien-dark me-1"
        onClick={() => handeDisplay("table-row")}
        disabled={display === "table-row" ? true : false}
      >
        <FontAwesomeIcon icon={faTableList} />
      </button>
      {/* table2 view */}
      <button
        className="btn btn-outlien-dark me-1"
        onClick={() => handeDisplay("table-column")}
        disabled={display === "table-column" ? true : false}
      >
        <FontAwesomeIcon icon={faTableColumns} />
      </button>
    </>
  );
};

DisplayControllers.propTypes = {
  display: PropTypes.string.isRequired,
  handeDisplay: PropTypes.func.isRequired,
};

export default DisplayControllers;
