import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

import Table from "../components/table/Table";

const customerTableHead = ["", "Name", "Email", "Phone", "Address"];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.name}</td>
    <td>{item.email}</td>
    <td>{item.phone}</td>
    <td>{item.address}</td>
  </tr>
);

const Customers = () => {
  const DOMAIN = "https://hama-be.vercel.app/";
  //   const DOMAIN = "http://localhost:8080/";
  const [cookies] = useCookies(["token"]);

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleGetCustomers = async () => {
    await axios
      .get(`${DOMAIN}api/users`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setCustomers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetCustomers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <h2 className="page-header">Customers</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              {loading ? (
                "Loading..."
              ) : (
                <Table
                  limit="10"
                  headData={customerTableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  bodyData={customers}
                  renderBody={(item, index) => renderBody(item, index)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
