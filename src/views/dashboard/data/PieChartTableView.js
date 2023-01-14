import { useEffect, useState } from "react";

import PieChart from "../../../examples/Charts/PieChart";
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";

import colors from "assets/theme/base/colors";
import axios from "axios";

const { gradients, dark } = colors;

const defaultData = {
  labels: ["1", "2", "3", "4", "5", "6"],
  datasets: {
    label: "# of Votes",
    data: [12, 19, 3, 5, 2, 3],
  },
};

function PieChartTableView() {
  const [data, setData] = useState([]);

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
      setData(response.data.data);
    });
  }, []);



  return (
    <DashboardLayout>
      <DashboardNavbar />
      <PieChart
        title={"病人年龄扇形图"}
        chart={defaultData}
      >
      </PieChart>
    </DashboardLayout>
  );
}

export default PieChartTableView;