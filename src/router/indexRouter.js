import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../views/dashboard/Dashboard";
import Login from "../views/login/Login";
import Register from "../views/login/Register";
import Home from "../views/dashboard/home/Home";
import User from "../views/dashboard/user/User";
import Error from "../views/other/Error";
import DataTableView from "views/dashboard/data/DataTableView";
import UploadData from "views/dashboard/data/uploadData";
import PieChartTableView from "views/dashboard/data/PieChartTableView"
import PatientDetailTablesView from "../views/dashboard/data/PatientDetailTablesView";

export default function IndexRouter() {
  const isToken = localStorage.getItem("token");
  const isTokenExpiredTime = localStorage.getItem("tokenExpiredTime") && localStorage.getItem("tokenExpiredTime") > new Date().getTime()
  const isLogin = isToken && isTokenExpiredTime ? <Dashboard/> : <Login/>
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={isLogin}>
        <Route path="" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="user">
          <Route path="user" element={<User />} />
          <Route path="profile" element={<User />} />
          <Route path="logs" element={<User />} />
        </Route>
        <Route path="data">
          <Route path="table" element={<DataTableView />} />
          <Route path="pieChartTable" element={<PieChartTableView />} />
          <Route path="patientDetailTables" element={<PatientDetailTablesView />} />
          <Route path="upload" element={<UploadData />} />
        </Route>
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
}