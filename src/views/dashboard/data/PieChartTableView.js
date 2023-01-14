import { useEffect, useState } from "react";

import PieChart from "../../../examples/Charts/PieChart";
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";

import colors from "assets/theme/base/colors";
import axios from "axios";

const { gradients, dark } = colors;

function PieChartTableView() {
  const labels = ["0-9", "10-19", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80-89", "90-99", ">=100"];
  const [data, setData] = useState({
        labels: labels,
        datasets: {
          label: "# of Votes",
          data: [],
        },
      });


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
      const ageCounts = new Array(11).fill(0);
      response.data.data.forEach((obj) => {  // 统计年龄分布
        const ageIdx = Math.min(Math.floor(obj.age / 10), 10);  // 100岁以上放在一起统计
        ageCounts[ageIdx] = ageCounts[ageIdx] ? ageCounts[ageIdx] + 1 : 1;
      });
      // console.log(data);
      setData({
        labels: labels,
        datasets: {
          label: "# of Votes",
          data: ageCounts,
        },
      });
    });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <PieChart
        title={"病人年龄扇形图"}
        chart={data}
      >
      </PieChart>
    </DashboardLayout>
  );
}

export default PieChartTableView;