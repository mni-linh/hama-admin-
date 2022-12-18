import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

import CategoryItem from "../components/category-item/CategoryItem";
import ModelCategory from "../components/modal-category/ModelCategory";
import { Spinner } from "@themesberg/react-bootstrap";

const Category = () => {
  const DOMAIN = "https://hama-be.vercel.app/";
  // const DOMAIN = "https://hama-be-git-dev-minh0812.vercel.app/";

  const [cookies] = useCookies(["token"]);
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [loading, setLoading] = useState(true);

  const handleGetCategories = async () => {
    await axios
      .get(`${DOMAIN}api/categories`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
    setLoading(false);
  };

  useEffect(() => {
    handleGetCategories();
  }, []);

  return (
    <div>
      <h2>Categories</h2>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className="row">
          {categories?.map((item) => (
            <CategoryItem
              key={item?.id}
              item={item}
              setShow={setShow}
              setDataModal={setDataModal}
            />
          ))}
          <CategoryItem
            className="addNew"
            item={{
              name: "",
              image_review:
                "https://cdn-icons-png.flaticon.com/512/4903/4903809.png",
              func: "add",
            }}
            setDataModal={setDataModal}
            setShow={setShow}
          />
        </div>
      )}
      <ModelCategory
        token={cookies?.token}
        show={show}
        setShow={setShow}
        dataModal={dataModal}
        setDataModal={setDataModal}
        setCategories={setCategories}
        categories={categories}
      />
    </div>
  );
};

export default Category;
