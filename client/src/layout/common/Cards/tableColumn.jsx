import PropTypes from "prop-types";

const TableColumn = ({ cards }) => {
  return (
    <table className="vertical-table">
      <thead>
        <tr>
        <th>num.</th>
          <th>price</th>
          <th>Shipping</th>
          <th>Category</th>
          <th>Subcategory</th>
        </tr>
      </thead>
      <tbody>
        {cards.map((card, i) => {
          const {  price,ship,category,subcategory} = card;
          return (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{price}</td>
              <td>{ship}</td>
              <td>{category}</td>
              <td>{subcategory}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

TableColumn.propTypes = {
  cards: PropTypes.array.isRequired,
};

export default TableColumn;
