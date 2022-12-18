import React, { Fragment, useState, useEffect } from "react";

import axios from "axios";
import { useCookies } from "react-cookie";

import ReadOnlyRowOrder from "./ReadOnlyRowOrder";
import "../assets/css/order.css";
import { Spinner } from "@themesberg/react-bootstrap";
import AlertCustom from "../components/alert-custom/Alert";

const Orders = () => {
  const DOMAIN = "https://hama-be.vercel.app/";
  // const DOMAIN = "http://localhost:8080/";

  const [cookies] = useCookies(["token"]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");

  const handleGetOrders = async () => {
    setLoading(true);
    await axios
      .get(`${DOMAIN}api/orders`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setAlertMessage("Lỗi khi lấy dữ liệu");
        setAlertVariant("danger");
        setShowAlert(true);
      });
  };

  const handleDeleteClick = async (orderId) => {
    setLoadingDelete(true);
    await axios
      .delete(`${DOMAIN}api/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        setLoadingDelete(false);
        setAlertMessage("Xóa đơn hàng thành công!");
        setAlertVariant("success");
        setShowAlert(true);
        setOrders(orders.filter((order) => order.id !== orderId));
      })
      .catch((err) => {
        setLoadingDelete(false);
        setAlertMessage("Xóa đơn hàng thất bại!");
        setAlertVariant("danger");
        setShowAlert(true);
        console.log(err);
      });
  };

  useEffect(() => {
    handleGetOrders();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <h2 className="page-header">Orders</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <div className="app-container">
                <form>
                  <table>
                    <thead>
                      <tr className="grid-container-order">
                        <th>Customer's name</th>
                        <th>Order date</th>
                        <th>Order Status</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Options</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr className="d-flex justify-content-center">
                          <td>
                            <Spinner animation="border" role="status">
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </Spinner>
                          </td>
                        </tr>
                      ) : (
                        orders.map((order, index) => (
                          <Fragment key={index}>
                            <ReadOnlyRowOrder
                              order={order}
                              handleDeleteClick={handleDeleteClick}
                              loading={loadingDelete}
                            />
                          </Fragment>
                        ))
                      )}
                    </tbody>
                  </table>
                </form>
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

export default Orders;
