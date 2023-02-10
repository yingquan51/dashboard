import { useMemo, useEffect, useState } from "react";
import axios from "axios";

import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Data
import { patientColumnCells } from "./columns/patientColumnCells";
import TableCard from "./components/TableCard";

function DataTableView() {
  // const data = useMemo(() => dataTableData.rows, [dataTableData]);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    //console.log(admin, password);
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/api/info/get",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      console.log(response);
      const { data, total } = response.data;
      setData(data);
      setTotal(total);
    });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox my={3}>
        { TableCard("病人基本信息", patientColumnCells, data, total) }
      </SoftBox>
    </DashboardLayout>
  );
}

export default DataTableView;
