import React from "react";
import moment from 'moment'
import { Link } from "react-router-dom";
import "../assets/css/order.css";

const ReadOnlyRowOrder = ({order, handleDeleteClick }) => {
  return (
    <tr
      style={{
        display: "grid",
        gridTemplateColumns: "150px 100px 200px 200px 230px 100px",
        gridGap: "10px",
        padding: "10px",
        width: "99%",
      }}
    >
      <td style={{ textAlign: "left", padding: "5px" }}>
          <button type="button" className="btn btn-secondary">
            View
          </button>
        &nbsp;
        <ReadOnlyRowOrder
          type="button"
          onClick={() => handleDeleteClick(order.id)}
          className="btn btn-danger"
        >
          Delete
        </ReadOnlyRowOrder>
      </td>
    </tr>
  );
};

export default ReadOnlyRowOrder;
