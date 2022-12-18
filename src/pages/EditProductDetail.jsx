import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

import { Form, Spinner } from "@themesberg/react-bootstrap";
import AlertCustom from "../components/alert-custom/Alert";

import Loading from "../assets/images/loading.gif";

const EditProductDetail = () => {
  const DOMAIN = "https://hama-be.vercel.app/";
  // const DOMAIN = "https://hama-be-git-dev-minh0812.vercel.app/";

  const [cookies] = useCookies(["token"]);
  const { id } = useParams();
  const history = useHistory();

  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);

  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const imageFiles = useRef([]);

  const handleSelectImage = async (e) => {
    if (e.target.files.length > 0) {
      imageFiles.current = [];
      setLoadingImage(true);
      Array.from(e.target.files).forEach(async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("name", Date.now() + file.name);
        await axios({
          method: "POST",
          url:
            "https://api.imgbb.com/1/upload?key=55b682fb2235adc9beb9aa845a4f08de",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
          .then((res) => {
            imageFiles.current.push(res.data.data.display_url);
            if (imageFiles.current.length === e.target.files.length) {
              setLoadingImage(false);
              setMessage("Upload image success");
              setVariant("success");
              setShowAlert(true);
            }
          })
          .catch((err) => {
            setLoadingImage(false);
            setMessage("Upload image failed");
            setVariant("danger");
            setShowAlert(true);
            console.log("err", err);
          });
      });
    }
  };

  const handleGetCategory = async () => {
    setLoadingCategories(true);
    await axios
      .get(`${DOMAIN}api/categories`)
      .then((res) => {
        setCategories(res?.data);
        setLoadingCategories(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingCategories(false);
      });
  };

  const handleGetProduct = async () => {
    setLoadingProduct(true);
    await axios
      .get(`${DOMAIN}api/products/${id}`)
      .then((res) => {
        setProduct(res?.data);
        imageFiles.current = res?.data?.images;
        setLoadingProduct(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingProduct(false);
        setMessage("Get product failed !!!");
        setVariant("danger");
        setShowAlert(true);
      });
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    setLoadingUpdate(true);
    axios
      .put(
        `${DOMAIN}api/products/${id}`,
        {
          ...product,
          images: imageFiles.current,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      )
      .then(() => {
        setLoadingUpdate(false);
        setMessage("Edit product success !!!");
        setVariant("success");
        setShowAlert(true);
        setTimeout(() => {
          history.push("/products");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setLoadingUpdate(false);
        setMessage("Edit product failed !!!");
        setVariant("danger");
        setShowAlert(true);
      });
  };

  useEffect(() => {
    handleGetCategory();
    if (history?.location?.state?.product) {
      setProduct(history?.location?.state?.product);
      imageFiles.current = history?.location?.state?.product?.images;
    } else {
      handleGetProduct();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return loadingProduct ? (
    <div className="d-flex justify-content-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  ) : (
    <div>
      <div className="py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="card">
                <div className="card-header">
                  <h4>Product Details</h4>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label> Product's Name </label>
                        <input
                          type="text"
                          name="title"
                          value={product.name}
                          onChange={(e) => {
                            setProduct({
                              ...product,
                              name: e.target.value,
                            });
                          }}
                          className="form-control"
                          style={{
                            border: "1px solid #ced4da",
                            borderRadius: "20px",
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label>Product Type</label>
                        <Form.Select
                          className="form-control"
                          value={product.category_id}
                          style={{
                            border: "1px solid #ced4da",
                            borderRadius: "20px",
                          }}
                        >
                          <option key={0} value="0">
                            {loadingCategories
                              ? "Đang tải dữ liệu..."
                              : "Chọn loại sản phẩm"}
                          </option>
                          {!loadingCategories &&
                            categories.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.name}
                              </option>
                            ))}
                        </Form.Select>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label> Size </label>
                        <input
                          type="text"
                          name="color"
                          value={product?.size}
                          onChange={(event) => {
                            setProduct({
                              ...product,
                              size: event?.target?.value
                                ?.split(",")
                                ?.map((item) => item?.trim()),
                            });
                          }}
                          className="form-control"
                          style={{
                            border: "1px solid #ced4da",
                            borderRadius: "20px",
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label> Picture </label>
                        <Form.Control
                          type="file"
                          name="image"
                          className="form-control"
                          size="sm"
                          multiple
                          onChange={handleSelectImage}
                          style={{
                            border: "1px solid #ced4da",
                            borderRadius: "20px",
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label> Quantity </label>
                        <input
                          type="text"
                          name="slug"
                          value={product?.quantity}
                          onChange={(event) => {
                            setProduct({
                              ...product,
                              quantity: event?.target?.value,
                            });
                          }}
                          className="form-control"
                          style={{
                            border: "1px solid #ced4da",
                            borderRadius: "20px",
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label> Price </label>
                        <input
                          type="text"
                          name="price"
                          value={product?.price}
                          onChange={(event) => {
                            setProduct({
                              ...product,
                              price: event?.target?.value,
                            });
                          }}
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
                        <label> Product Description</label>
                        <textarea
                          type="text"
                          name="description"
                          value={product?.description}
                          onChange={(event) => {
                            setProduct({
                              ...product,
                              description: event?.target?.value,
                            });
                          }}
                          className="form-control"
                          style={{
                            border: "1px solid #ced4da",
                            borderRadius: "20px",
                          }}
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group text-end">
                        <button
                          type="button"
                          onClick={handleEditProduct}
                          className="btn btn-primary"
                          disabled={loadingImage || loadingUpdate}
                          style={{
                            backgroundColor: "#243a6f",
                            borderRadius: "10px",
                          }}
                        >
                          {loadingImage
                            ? "Loading images..."
                            : loadingUpdate
                            ? "Updating..."
                            : "Update"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-5">
              <table className="table">
                <div className="card">
                  <div className="app">
                    <div>
                      <div className="result">
                        <center>
                          <h5>Picture</h5>
                        </center>
                        {loadingImage ? (
                          <img
                            src={Loading}
                            alt="loading"
                            style={{ width: "90%", margin: "10px 5%" }}
                          />
                        ) : (
                          <div>
                            {imageFiles.current.map((item, index) => (
                              <img
                                key={index}
                                className="img-product-preview"
                                src={item}
                                alt="product"
                                style={{ width: "90%", margin: "10px 5%" }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <thead></thead>
              </table>
            </div>
          </div>
        </div>
      </div>
      <AlertCustom
        show={showAlert}
        setShow={setShowAlert}
        variant={variant}
        title={message}
      />
    </div>
  );
};

export default EditProductDetail;
