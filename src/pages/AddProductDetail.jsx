import React, { useEffect, useRef, useState } from "react";
import { Form } from "@themesberg/react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

import Loading from "../assets/images/loading.gif";
import AlertCustom from "../components/alert-custom/Alert";

const AddProductDetail = () => {
  const DOMAIN = "https://hama-be.vercel.app/";
  // const DOMAIN = "https://hama-be-git-dev-minh0812.vercel.app/";

  const history = useHistory();
  const [cookies] = useCookies(["token"]);

  const titleRef = useRef();
  const typeRef = useRef();
  const sizeRef = useRef();
  const priceRef = useRef();
  const quantityRef = useRef();
  const descriptionRef = useRef();

  const [category, setCategory] = useState([]);
  const imageFiles = useRef([]);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const [loadingData, setLoadingData] = useState(true);
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(false);

  const getCategories = async () => {
    const response = await axios.get(`${DOMAIN}api/categories`);
    setCategory(response.data);
    setLoadingData(false);
  };

  const handleSelectImage = async (e) => {
    if (e.target.files.length > 0) {
      setLoadingImage(true);
      imageFiles.current = [];
      Array.from(e.target.files).forEach(async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("name", Date.now() + file.name);
        await axios({
          method: "POST",
          url: "https://api.imgbb.com/1/upload?key=55b682fb2235adc9beb9aa845a4f08de",
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

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoadingProduct(true);
    const product = {
      name: titleRef?.current?.value || "",
      images: imageFiles?.current || [],
      size:
        sizeRef?.current?.value?.split(",")?.map((item) => item.trim()) || [],
      price: priceRef.current.value || 0,
      description: descriptionRef.current.value || "",
      quantity: quantityRef.current.value || 0,
      category_id: typeRef.current.value,
    };
    await axios
      .post(`${DOMAIN}api/products`, product, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        setLoadingProduct(false);
        setMessage("Add product successfully");
        setVariant("success");
        setShowAlert(true);
        setTimeout(() => {
          history.push("/products");
        }, 2000);
      })
      .catch((err) => {
        console.log("err", err);
        setLoadingProduct(false);
        setMessage("Add product failed");
        setVariant("danger");
        setShowAlert(true);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <div className="py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="card">
                <div className="card-header">
                  <h4>Thông tin chi tiết sản phẩm</h4>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label> Tên sản phẩm </label>
                        <input
                          type="text"
                          name="title"
                          ref={titleRef}
                          className="form-control"
                          placeholder="Nhập tên sản phẩm"
                          required
                          style={{
                            border: "1px solid #ced4da",
                            borderRadius: "20px",
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label> Loại sản phẩm </label>
                        <Form.Select
                          className="form-control"
                          ref={typeRef}
                          style={{
                            border: "1px solid #ced4da",
                            borderRadius: "20px",
                          }}
                        >
                          <option key={0} value="0">
                            {loadingData
                              ? "Đang tải dữ liệu..."
                              : "Chọn loại sản phẩm"}
                          </option>
                          {!loadingData &&
                            category.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.name}
                              </option>
                            ))}
                        </Form.Select>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label> Kích thước </label>
                        <input
                          type="text"
                          name="size"
                          className="form-control"
                          ref={sizeRef}
                          placeholder="30x30cm, 40x40cm, 50x50cm"
                          style={{
                            border: "1px solid #ced4da",
                            borderRadius: "20px",
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label>Hình ảnh </label>
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
                        <label>Số lượng </label>
                        <input
                          type="number"
                          name="quantity"
                          ref={quantityRef}
                          className="form-control"
                          placeholder="Nhập số lượng sản phẩm"
                          required
                          style={{
                            border: "1px solid #ced4da",
                            borderRadius: "20px",
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label> Giá </label>
                        <input
                          type="number"
                          name="price"
                          ref={priceRef}
                          className="form-control"
                          placeholder="Nhập giá sản phẩm"
                          required
                          style={{
                            border: "1px solid #ced4da",
                            borderRadius: "20px",
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group mb-3">
                        <label> Mô tả </label>
                        <textarea
                          type="text"
                          name="description"
                          ref={descriptionRef}
                          className="form-control"
                          placeholder="Nhập mô tả sản phẩm"
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
                          className="btn btn-primary"
                          style={{
                            backgroundColor: "#243a6f",
                            borderRadius: "10px",
                          }}
                          disabled={loadingImage || loadingProduct}
                          onClick={handleAddProduct}
                        >
                          {loadingImage
                            ? "Đang tải hình ảnh..."
                            : loadingProduct
                            ? "Đang thêm sản phẩm..."
                            : "Thêm sản phẩm"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* images */}
            <div className="col-md-5">
              <div className="card">
                <div className="app">
                  <div>
                    <div className="result">
                      <center>
                        <h5>Hình ảnh</h5>
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
            </div>
          </div>
        </div>
      </div>
      <AlertCustom
        show={showAlert}
        setShow={setShowAlert}
        title={message}
        variant={variant}
      />
    </div>
  );
};

export default AddProductDetail;
