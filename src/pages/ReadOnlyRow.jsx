import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import ModalConfirm from "../components/modal-confirm/ModalConfirm";

const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

const ReadOnlyRow = ({ product, handleDeleteClick, loadingDelete }) => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  const handleEditClick = (product) => {
    history.push(`/edit-product/${product.id}`, { product });
  };

  return (
    <tr className="grid-container">
      <td style={{ fontWeight: "unset", margin: "auto" }}>{product?.name}</td>
      <td>
        <img
          src={product?.images[0]}
          alt="product"
          style={{
            borderRadius: "20px",
            opacity: "0.9",
            margin: "auto",
            width: "100%",
          }}
        />
      </td>
      <td style={{ fontWeight: "unset", margin: "auto" }}>
        {formatter.format(product?.price)}
      </td>
      <td style={{ fontWeight: "unset", margin: "auto" }}>
        {product?.quantity}
      </td>
      <td style={{ margin: "auto" }}>
        <button
          type="button"
          className="btn btn-secondary"
          style={{ marginRight: "10px" }}
          onClick={() => handleEditClick(product)}
        >
          Update
        </button>
        <button
          className="btn btn-danger"
          type="button"
          onClick={() => setShowModal(true)}
          disabled={loadingDelete}
        >
          Delete
        </button>
      </td>
      <ModalConfirm
        show={showModal}
        setShow={setShowModal}
        title="Xóa sản phẩm"
        description="Bạn có chắc chắn muốn xóa sản phẩm này?"
        onSure={() => {
          setShowModal(false);
          handleDeleteClick(product.id);
        }}
      />
    </tr>
  );
};

export default ReadOnlyRow;
