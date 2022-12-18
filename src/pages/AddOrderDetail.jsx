import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

import { Button, Form } from "@themesberg/react-bootstrap";
import AlertCustom from "../components/alert-custom/Alert";

const formatter = new Intl.NumberFormat("vi-VI", {
  style: "currency",
  currency: "VND",
});

const AddOrderDetail = () => {
  const status = ["", "Tiền mặt", "Paypal"];

  const DOMAIN = "https://hama-be.vercel.app/";
  // const DOMAIN = "http://localhost:8080/";

  const [cookies] = useCookies(["token"]);
  const history = useHistory();

  const [orders, setOrders] = useState({});
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");

  const handleUpDateStatus = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .put(
        `${DOMAIN}api/order/${orders.id}`,
        {
          ...orders,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      )
      .then(() => {
        setLoading(false);
        setAlertMessage("Cập nhật trạng thái thành công!");
        setAlertVariant("success");
        setShowAlert(true);
        setTimeout(() => {
          history.push("/orders");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setAlertMessage("Lỗi khi cập nhật trạng thái");
        setAlertVariant("danger");
        setShowAlert(true);
      });
  };

  useEffect(() => {
    setOrders(history.location.state.order);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="py-3 bg-Muted link">
        <div className="container"></div>
      </div>

      <div className="py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <div className="card">
                <div className="card-header">
                  <h4>Order information</h4>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group mb-3">
                        <label> Name </label>
                        <input
                          type="text"
                          value={orders.name}
                          readOnly
                          name="fullName"
                          className="form-control"
                          style={{
                            border: "1px solid #ced4da",
                            borderRadius: "20px",
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group mb-3">
                        <label> Phone </label>
                        <input
                          type="text"
                          value={orders.phone}
                          readOnly
                          name="phone"
                          className="form-control"
                          style={{
                            border: "1px solid #ced4da",
                            borderRadius: "20px",
                          }}
                          pattern="[0-9]{4}[0-9]{3}[0-9]{3}"
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group mb-3">
                        <label> Email </label>
                        <input
                          type="text"
                          value={orders.email}
                          readOnly
                          name="email"
                          className="form-control"
                          style={{
                            border: "1px solid #ced4da",
                            borderRadius: "20px",
                          }}
                          pattern="[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}"
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group mb-3">
                        <label> Address </label>
                        <input
                          type="text"
                          value={orders.address}
                          readOnly
                          name="address"
                          row="3"
                          className="form-control"
                          style={{
                            border: "1px solid #ced4da",
                            borderRadius: "20px",
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group mb-3">
                        <label> Note </label>
                        <textarea
                          type="text"
                          value={orders.note}
                          readOnly
                          name="address"
                          row="3"
                          className="form-control"
                          style={{
                            border: "1px solid #ced4da",
                            borderRadius: "20px",
                          }}
                        ></textarea>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label> Status </label>
                        <Form.Select
                          className="form-control form-control"
                          style={{
                            border: "1px solid #ced4da",
                            borderRadius: "20px",
                            color: "gray",
                          }}
                          value={orders.status}
                          onChange={(event) => {
                            setOrders({
                              ...orders,
                              status: event.target.value,
                            });
                          }}
                        >
                          <option value="1">Đang xử lý</option>
                          <option value="2">Đang đóng gói</option>
                          <option value="3">Đang giao hàng</option>
                          <option value="4">Giao hàng thành công</option>
                          <option value="5">Đã hủy</option>
                        </Form.Select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div
                        className="form-group text-end"
                        style={{
                          margin: "auto",
                          padding: "30px 0px 30px 75px",
                        }}
                      >
                        <Button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleUpDateStatus}
                          disabled={loading}
                          style={{
                            backgroundColor: "#243a6f",
                            borderRadius: "10px",
                            margin: "auto",
                          }}
                        >
                          {loading ? "Cập nhật..." : "Cập nhật"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <table className="table table-bordered">
                <thead>
                  <tr
                    style={{
                      display: "grid",
                      gridTemplateColumns: "250px 90px 90px 90px 90px",
                      gridGap: "10px",
                      backgroundColor: "transparent",
                      padding: "5px",
                      borderBottom: "1px solid black",
                    }}
                  >
                    <th
                      style={{
                        textAlign: "center",
                        fontWeight: "500",
                        borderRight: "1px solid black",
                      }}
                    >
                      Product
                    </th>
                    <th
                      style={{
                        textAlign: "center",
                        fontWeight: "500",
                        borderRight: "1px solid black",
                      }}
                    >
                      Price
                    </th>
                    <th
                      style={{
                        textAlign: "center",
                        fontWeight: "500",
                        borderRight: "1px solid black",
                      }}
                    >
                      Size
                    </th>

                    <th style={{ textAlign: "center", fontWeight: "500" }}>
                      Quantity
                    </th>

                    <th style={{ textAlign: "center", fontWeight: "500" }}>
                      Total
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {orders.products &&
                    orders.products.map((item, index) => (
                      <tr
                        key={index}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "250px 90px 90px 80px 100px",
                          gridGap: "10px",
                          backgroundColor: "transparent",
                          padding: "5px",
                          borderBottom: "1px solid black",
                        }}
                      >
                        <td
                          style={{
                            textAlign: "center",
                            borderRight: "1px solid black",
                          }}
                        >
                          {item.name}
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            borderRight: "1px solid black",
                          }}
                        >
                          {item.price.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            borderRight: "1px solid black",
                          }}
                        >
                          {item.size}
                        </td>

                        <td style={{ textAlign: "center" }}>{item.quantity}</td>

                        <td style={{ textAlign: "center", fontWeight: "500" }}>
                          {(item.quantity * item.price).toLocaleString(
                            "vi-VN",
                            {
                              style: "currency",
                              currency: "VND",
                            }
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              <div style={{ padding: "15px" }}>
                <p>Phương thức thanh toán: {status[orders.payment_id]}</p>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "417px 100px 144px",
                }}
              >
                <p></p>
                <p style={{ fontWeight: "500" }}>Grand Total:</p>
                <p>{formatter.format(orders?.total_price || 0)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AlertCustom
        show={showAlert}
        setShow={setShowAlert}
        title={alertMessage}
        variant={alertVariant}
      />
    </div>
  );
};

export default AddOrderDetail;
