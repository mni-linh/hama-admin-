import React, { Fragment, useState, useEffect } from "react";
import ReadOnlyRow from "./ReadOnlyRow";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Spinner } from "@themesberg/react-bootstrap";

import "../assets/css/product.css";
import AlertCustom from "../components/alert-custom/Alert";

const Products = () => {
  const DOMAIN = "https://hama-be.vercel.app/";
  // const DOMAIN = "https://hama-be-git-dev-minh0812.vercel.app/";

  const [cookies] = useCookies(["token"]);
  const [products, setProducts] = useState([]);
  const [productFilter, setProductFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [variantAlert, setVariantAlert] = useState("");
  const [messageAlert, setMessageAlert] = useState("");

  const handleSearch = (e) => {
    setProductFilter(
      products.filter((product) =>
        product.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleGetProducts = async () => {
    setLoading(true);
    await axios
      .get(`${DOMAIN}api/products`)
      .then((res) => {
        setProducts(res.data);
        setProductFilter(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleDeleteClick = async (id) => {
    setLoadingDelete(true);
    await axios
      .delete(`${DOMAIN}api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setMessageAlert("Xóa sản phẩm thành công");
        setVariantAlert("success");
        setShowAlert(true);
        setLoadingDelete(false);
        handleGetProducts();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setLoadingDelete(false);
        setShowAlert(true);
        setVariantAlert("danger");
        setMessageAlert("Xóa sản phẩm thất bại");
      });
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  return (
    <div>
      <h2 className="page-header">Products</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <div className="app-container">
                <form>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Enter product name..."
                    onChange={handleSearch}
                    style={{
                      border: "1px solid #ced4da",
                      borderRadius: "20px",
                      width: "300px",
                      display: "inline-block",
                      padding: "10px",
                      margin: "10px 0",
                      marginLeft: "4%",
                    }}
                  />
                  <Link to={"/add-product"}>
                    <button
                      className="btn btn-success"
                      style={{
                        textAlign: "center",
                        width: "190px",
                        float: "right",
                      }}
                    >
                      <i
                        className="bx bxs-add-to-queue"
                        style={{ padding: "10px" }}
                      />
                      Add product
                    </button>
                  </Link>
                  <table>
                    <thead>
                      <tr className="grid-container">
                        <th>Product's name</th>
                        <th>Picture</th>
                        <th>Price</th>
                        <th>Quantity</th>
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
                        productFilter?.map((product) => (
                          <Fragment key={product.id}>
                            <ReadOnlyRow
                              product={product}
                              handleDeleteClick={handleDeleteClick}
                              loadingDelete={loadingDelete}
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
        title={messageAlert}
        variant={variantAlert}
      />
    </div>
  );
};

export default Products;
