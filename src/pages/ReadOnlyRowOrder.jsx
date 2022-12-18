import React from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { Button, Spinner } from "@themesberg/react-bootstrap";

const ReadOnlyRowOrder = ({ order, handleDeleteClick, loading }) => {
  const history = useHistory();
  const status = [
    "",
    "Đang xử lý",
    "Đang đóng gói",
    "Đang giao hàng",
    "Giao hàng thành công",
    "Đã hủy",
  ];

  const handleEditClick = () => {
    history.push(`/edit-order/${order.id}`, { order: order });
  };

  return (
    <tr className="grid-container-order">
      <td style={{ fontWeight: "unset" }}>{order.name}</td>
      <td style={{ fontWeight: "unset" }}>
        {moment(order.created_at).format("DD/MM/YYYY, hh:mm:ss A")}
      </td>
      <td style={{ fontWeight: "unset", textTransform: "none" }}>
        {status[order.status]}
      </td>
      <td style={{ fontWeight: "unset" }}>{order.phone}</td>
      <td style={{ fontWeight: "unset" }}>{order.address}</td>
      <td>
        <Button
          type="button"
          className="btn btn-secondary"
          onClick={handleEditClick}
          style={{ marginRight: "10px" }}
        >
          Update
        </Button>
        <Button
          className="btn btn-danger"
          type="button"
          onClick={() => handleDeleteClick(order.id)}
          disabled={loading}
        >
          {loading ? (
            <Spinner animation="border" role="status" size="sm">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            "Delete"
          )}
        </Button>
      </td>
    </tr>
  );
};

export default ReadOnlyRowOrder;
