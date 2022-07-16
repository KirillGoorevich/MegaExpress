import PropTypes from "prop-types";

const TableRow = ({ cards }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>num.</th>
          <th>name</th>
          <th>description</th>
          <th>price</th>
          <th>Shipping</th>
        </tr>
      </thead>
      <tbody>
        {cards.map((card, i) => {
          const { name, description, price,ship } = card;
          return (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{name}</td>
              <td>{description}</td>
              <td>{price}</td>
              <td>{ship}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

TableRow.propTypes = {
  cards: PropTypes.array.isRequired,
};

export default TableRow;
