import React, { useEffect } from "react";

import { Link } from "react-router-dom";

import Chart from "react-apexcharts";

import { useSelector } from "react-redux";

import StatusCard from "../components/status-card/StatusCard";

import Table from "../components/table/Table";

import Badge from "../components/badge/Badge";

import statusCards from "../assets/JsonData/status-card-data.json";
import Customers from "./Customers";
// xóa
const chartOptions = {
  series: [
    {
      name: "Total Access",
      data: [40, 70, 20, 90, 36, 80, 30, 91, 60],
    },
    {
      name: "Total revenue",
      data: [40, 30, 70, 80, 40, 16, 40, 20, 51, 10],
    },
  ],
  options: {
    color: ["#6ab04c", "#2980b9"],
    chart: {
      background: "transparent",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    legend: {
      position: "top",
    },
    grid: {
      show: false,
    },
  },
};
const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

const topCustomers = {
  head: ["User", "Total Orders", "Total Spending"],
  body: [
    {
      username: "Linh Tran",
      order: "53",
      price: "8.125.870 đ",
    },
    {
      username: "Minh Pham",
      order: "44",
      price: "7.470.251 đ",
    },
    {
      username: "Quynh Nguyen",
      order: "40",
      price: "6.410.840 đ",
    },
    {
      username: "Ngan Huynh",
      order: "38",
      price: "5.384.251 đ",
    },
    {
      username: "Trang Sam",
      order: "35",
      price: "4.338.840 đ",
    },
  ],
};

const renderCusomerHead = (item, index) => <th key={index}>{item}</th>;

const renderCusomerBody = (item, index) => (
  <tr key={index}>
    <td>{item.username}</td>
    <td>{item.order}</td>
    <td>{item.price}</td>
  </tr>
);

const latestOrders = {
  header: ["Order ID", "Users", "Total Price", "Date", "Status"],
  body: [
    {
      id: "#OD1711",
      user: "Linh Tran",
      date: "17 Jun 2021",
      price: "120.000 đ",
      status: "shipping",
    },
    {
      id: "#OD1712",
      user: "Minh Pham",
      date: "1 Jun 2021",
      price: "220.000 đ",
      status: "paid",
    },
    {
      id: "#OD1713",
      user: "Quynh Nguyen",
      date: "27 Jun 2021",
      price: "300.000 đ",
      status: "pending",
    },
    {
      id: "#OD1712",
      user: "Ngan Huynh",
      date: "1 Jun 2021",
      price: "120.000 đ",
      status: "paid",
    },
    {
      id: "#OD1713",
      user: "Trang Sam",
      date: "27 Jun 2021",
      price: "320.00d đ",
      status: "refund",
    },
  ],
};

const orderStatus = {
  shipping: "primary",
  pending: "warning",
  paid: "success",
  refund: "danger",
};

const renderOrderHead = (item, index) => <th key={index}>{item}</th>;

const renderOrderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.user}</td>
    <td>{item.price}</td>
    <td>{item.date}</td>
    <td>
      <Badge type={orderStatus[item.status]} content={item.status} />
    </td>
  </tr>
);

const Dashboard = () => {
  const themeReducer = useSelector((state) => state.ThemeReducer.mode);

  return (
    <div>
      <h2 className="page-header">Dashboard</h2>
      <div className="row">
        <div className="col-6">
          <div className="row">
            {statusCards.map((item, index) => (
              <div className="col-6" key={index}>
                <StatusCard
                  icon={item.icon}
                  count={item.count}
                  title={item.title}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="col-6">
          <div className="card full-height">
            <Chart
              options={
                themeReducer === "theme-mode-dark"
                  ? {
                      ...chartOptions.options,
                      theme: { mode: "dark" },
                    }
                  : {
                      ...chartOptions.options,
                      theme: { mode: "light" },
                    }
              }
              series={chartOptions.series}
              type="line"
              height="100%"
            />
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <div className="card__header">
              <h5>Top Customers</h5>
            </div>
            <div className="card__body">
              <Table
                headData={topCustomers.head}
                renderHead={(item, index) => renderCusomerHead(item, index)}
                bodyData={topCustomers.body}
                renderBody={(item, index) => renderCusomerBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to="/">View all</Link>
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="card">
            <div className="card__header">
              <h5>Latest Orders</h5>
            </div>
            <div className="card__body">
              <Table
                headData={latestOrders.header}
                renderHead={(item, index) => renderOrderHead(item, index)}
                bodyData={latestOrders.body}
                renderBody={(item, index) => renderOrderBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to="/">View all </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
