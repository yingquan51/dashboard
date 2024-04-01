import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../views/dashboard/Dashboard";
import Login from "../views/login/Login";
import Register from "../views/login/Register";
import Home from "../views/dashboard/home/Home";
import User from "../views/dashboard/user/User";
import Error from "../views/other/Error";
import PatientTableView from "views/dashboard/data/PatientTableView";
import PieChartTableView from "views/dashboard/data/PieChartTableView"
import PatientDetailTablesView from "../views/dashboard/data/PatientDetailTablesView";
import AllColumnsView from "../views/dashboard/data/AllColumnsView";
import PatientUploadTableView from "views/dashboard/data/PatientUploadTableView";
import SampleTableView from "views/dashboard/data/SampleTableView";
import PopulationChartView from "views/dashboard/data/PopulationChartView";
import HistoryChartView from "views/dashboard/data/HistoryChartView";
import TreatmentChartView from "views/dashboard/data/TreatmentChartView";
import SurvivalChartView from "views/dashboard/data/SurvivalChartView";
import PathologyChartView from "views/dashboard/data/PathologyChartView";


export default function IndexRouter() {
  const isToken = localStorage.getItem("token");
  const isTokenExpiredTime = localStorage.getItem("tokenExpiredTime") && localStorage.getItem("tokenExpiredTime") > new Date().getTime()
  const isLogin = isToken && isTokenExpiredTime ? <Dashboard /> : <Login />
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
          <Route path="allColumns" element={<AllColumnsView />} />
          <Route path="patientTable" element={<PatientTableView />} />
          <Route path="pieChartTable" element={<PieChartTableView />} />
          <Route path="patientDetailTables" element={<PatientDetailTablesView />} />
          <Route path="sampleTable" element={<SampleTableView />} />
        </Route>
        <Route path="upload">
          <Route path="patientUploadTable" element={<PatientUploadTableView />} />
        </Route>
        <Route path="visualization">
          <Route path="pieChartTable" element={<PieChartTableView />} />
          <Route path="population" element={<PopulationChartView/>}></Route>
          <Route path="history" element={<HistoryChartView/>}></Route>
          <Route path="pathology" element={<PathologyChartView/>}></Route>
          <Route path="treatment" element={<TreatmentChartView/>}></Route>
          <Route path="survival" element={<SurvivalChartView/>}></Route>
        </Route>
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
}