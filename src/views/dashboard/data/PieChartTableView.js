import React, { useEffect, useState } from "react";


import PieChart from "../../../examples/Charts/PieChart";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import StackedBarChart from "examples/Charts/BarCharts/StackedBarChart";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import KMLineChart from "examples/Charts/LineCharts/KMLineChart";
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";


import colors from "assets/theme/base/colors";
import axios from "axios";
import SoftBox from "components/SoftBox";
import { CssBaseline } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { Portal } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { ButtonBase } from '@material-ui/core';
import { Image } from "@mui/icons-material";
import { array } from "prop-types";







const { gradients, dark } = colors;




function PieChartTableView() {
  const labels = ["0-9", "10-19", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80-89", "90-99", ">=100"];
  const [data, setData] = useState({
    labels: labels,
    datasets: {
      label: "# 年龄",
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
          label: "# 年龄",
          data: ageCounts,
        },
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <PieChart
        title={"病人年龄扇形图"}
        chart={data}
      >
      </PieChart>
    </DashboardLayout>
  );
}


// 返回中位确诊年龄
function Age() {
  const labels = ["0-5", "5-10", "10-15", "15-20", "20-25", "25-30", "30-35"];
  const [data, setData] = useState({
    labels: labels,
    datasets: [{
      label: "# 年龄",
      data: [],
    }],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/draw",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const ageCounts = new Array(7).fill(0);
      response.data.forEach((obj) => {  // 统计年龄分布
        const ageIdx = Math.min(Math.floor(obj.age / 5), 7);  // 35岁 7份
        ageCounts[ageIdx] = ageCounts[ageIdx] ? ageCounts[ageIdx] + 1 : 1;
      });
      // console.log(data);
      setData({
        labels: labels,
        datasets: [{
          label: "年龄",
          data: ageCounts,
          color: "info",
        }],
      });
    });
  }, []);


  return (
    <DashboardLayout>

      <VerticalBarChart
        title={"年轻患者(≤35)中位确诊年龄柱形图"}
        chart={data}
      >
      </VerticalBarChart>
    </DashboardLayout>
  );

}
// 返回家族史
function Family() {
  const labels = ["是", "否"];
  const [data, setData] = useState({
    labels: labels,
    datasets: {
      label: "# of Votes",
      data: [],
    },
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/draw",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const familyCounts = new Array(2).fill(0);
      var totalnum = 0;

      response.data.forEach((obj) => {  // 统计是否有家族史
        totalnum += 1;
        const familyIdx = obj.family == '是' ? 0 : 1;
        familyCounts[familyIdx] = familyCounts[familyIdx] ? familyCounts[familyIdx] + 1 : 1;

      });
      for (var i = 0; i < familyCounts.length; i++) {
        familyCounts[i] = (familyCounts[i] / totalnum) * 100;
      }

      setData({
        labels: labels,
        datasets: {
          label: "# of Votes",
          data: familyCounts,
        },
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <PieChart
        title={"家族史扇形图"}
        chart={data}
      >
      </PieChart>
    </DashboardLayout>
  );

}

// 返回是否生育
function Procreation() {
  const labels = ["是", "否"];
  const [data, setData] = useState({
    labels: labels,
    datasets: {
      label: "# of Votes",
      data: [],
    },
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/draw",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const proCounts = new Array(2).fill(0);
      var totalnum = 0;
      response.data.forEach((obj) => {  // 统计是否生育
        totalnum += 1;
        const proIdx = obj.sy == '是' ? 0 : 1;
        proCounts[proIdx] = proCounts[proIdx] ? proCounts[proIdx] + 1 : 1;
      });
      for (var i = 0; i < proCounts.length; i++) {
        proCounts[i] = (proCounts[i] / totalnum) * 100;
      }
      // console.log(data);
      setData({
        labels: labels,
        datasets: {
          label: "# of Votes",
          data: proCounts,
        },
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <PieChart
        title={"生育史扇形图"}
        chart={data}
      >
      </PieChart>
    </DashboardLayout>
  );

}


// 返回妊娠次数
function Gestation() {

  const labels = ["0", "1", "2", "3", "≥4"];
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "<=25",
        data: [],
      },
      {
        label: "25-30",
        data: [],
      },
      {
        label: ">30",
        data: [],
      },
    ],
  });





  useEffect(  // 页面第一次加载时，向后端请求数据
    () => {
      axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
      axios({
        method: "GET",
        url: "/diagram/data/draw",
        headers: {
          "x-session-token": localStorage.getItem("token"),
        },
      }).then(response => {
        const count1 = new Array(5).fill(0);
        const count2 = new Array(5).fill(0);
        const count3 = new Array(5).fill(0);
        var totalnum = 0;
        response.data.forEach((obj) => {  // 统计妊娠次数
          totalnum += 1;
          const gesIdx = Math.min(Math.floor(obj.hycs / 1), 4);
          count1[gesIdx] = count1[gesIdx] + (obj.age <= 25)
          count2[gesIdx] = count2[gesIdx] + (obj.age > 25 && obj.age <= 30)
          count3[gesIdx] = count3[gesIdx] + (obj.age > 30)


        });

        // for (var i = 0; i < gesCounts.length; i++) {
        //   gesCounts[i] = (gesCounts[i] / totalnum) * 100;
        // }
        // console.log(data);
        setData({
          labels: labels,
          datasets: [
            {
              label: "<=25",
              data: count1,
              color: 'pink'
            },
            {
              label: "25-30",
              data: count2,
              color: 'error'
            },
            {
              label: ">30",
              data: count3,
              color: 'green'
            },
          ],
        });
      });
    }
    , []);


  return (
    <DashboardLayout>

      <VerticalBarChart
        title={"妊娠次数柱形图"}
        chart={data}
      >
      </VerticalBarChart>
    </DashboardLayout>
  );
}

// 返回生产次数
function Parturition() {
  const labels = ["0", "1", "2", "3", "≥4"];
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "<=25",
        data: [],
      },
      {
        label: "25-30",
        data: [],
      },
      {
        label: ">30",
        data: [],
      },
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/draw",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const count1 = new Array(5).fill(0);
      const count2 = new Array(5).fill(0);
      const count3 = new Array(5).fill(0);
      response.data.forEach((obj) => {  // 统计生产次数
        const Idx = Math.min(Math.floor(obj.zyc / 1), 4);
        count1[Idx] = count1[Idx] + (obj.age <= 25)
        count2[Idx] = count2[Idx] + (obj.age > 25 && obj.age <= 30)
        count3[Idx] = count3[Idx] + (obj.age > 30)

      });
      // console.log(data);
      setData({
        labels: labels,
        datasets: [
          {
            label: "<=25",
            data: count1,
            color: 'success'
          },
          {
            label: "25-30",
            data: count2,
            color: 'info'
          },
          {
            label: ">30",
            data: count3,
            color: 'primary'
          },
        ],
      });
    });
  }, []);

  return (
    <DashboardLayout >

      <VerticalBarChart
        title={"生产次数柱形图"}
        chart={data}
      >
      </VerticalBarChart>
    </DashboardLayout>
  );
}

// 返回流产次数
function Abortion() {
  const labels = ["0", "1", "2", "3", "≥4"];
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "<=25",
        data: [],
      },
      {
        label: "25-30",
        data: [],
      },
      {
        label: ">30",
        data: [],
      },
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/draw",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const count1 = new Array(5).fill(0);
      const count2 = new Array(5).fill(0);
      const count3 = new Array(5).fill(0);
      response.data.forEach((obj) => {  // 统计流产次数
        const Idx = Math.min(Math.floor(obj.lczcs / 1), 4);
        count1[Idx] = count1[Idx] + (obj.age <= 25);
        count2[Idx] = count2[Idx] + (obj.age > 25 && obj.age <= 30);
        count3[Idx] = count3[Idx] + (obj.age > 30);
      });
      // console.log(data);
      setData({
        labels: labels,
        datasets: [
          {
            label: "<=25",
            data: count1,
            color: 'darkblue'
          },
          {
            label: "25-30",
            data: count2,
            color: 'rose'
          },
          {
            label: ">30",
            data: count3,
            color: 'darkblue'
          },
        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <VerticalBarChart
        title={"流产次数柱形图"}
        chart={data}
      >
      </VerticalBarChart>
    </DashboardLayout>
  );
}

//返回病理类型
function Pathology() {
  const labels = ['in_situ_Lobular', 'in_situ_DCIS', 'in_situ_Paget', 'in_situ_Intraductal', 'invasive_Lobular',
    'invasive_Duct', 'invasive_Mucinous', 'invasive_IMPC', 'others'];
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "<=25",
        data: [],
      },
      {
        label: "25-30",
        data: [],
      },
      {
        label: ">30",
        data: [],
      },
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/draw",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const count1 = new Array(9).fill(0);
      const count2 = new Array(9).fill(0);
      const count3 = new Array(9).fill(0);
      response.data.forEach((obj) => {
        var tmp = 0;
        if (obj.blxjtms == 'in_situ_Lobular') {
          tmp = 0;
        }
        else if (obj.blxjtms == 'in_situ_DCIS') {
          tmp = 1;
        }
        else if (obj.blxjtms == 'in_situ_Paget') {
          tmp = 2;
        }
        else if (obj.blxjtms == 'in_situ_Intraductal') {
          tmp = 3;
        }
        else if (obj.blxjtms == 'invasive_Lobular') {
          tmp = 4;
        }
        else if (obj.blxjtms == 'invasive_Duct') {
          tmp = 5;
        }
        else if (obj.blxjtms == 'invasive_Mucinous') {
          tmp = 6;
        }
        else if (obj.blxjtms == 'invasive_IMPC') {
          tmp = 7;
        }
        else {
          tmp = 8;
        }

        const Idx = tmp;
        count1[Idx] = count1[Idx] + (obj.age <= 25);
        count2[Idx] = count2[Idx] + (obj.age > 25 && obj.age <= 30);
        count3[Idx] = count3[Idx] + (obj.age > 30);
      });
      // console.log(data);
      setData({
        labels: labels,
        datasets: [
          {
            label: "<=25",
            data: count1,
            color: 'success'
          },
          {
            label: "25-30",
            data: count2,
            color: 'green'
          },
          {
            label: ">30",
            data: count3,
            color: 'darkgreen'
          },
        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <VerticalBarChart
        title={"病理类型柱形图"}
        chart={data}
      >
      </VerticalBarChart>
    </DashboardLayout>
  );

}


//返回手术方式
function SurgeryType() {
  const labels = ["全切", "保乳", "再造"];
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "<=25",
        data: [],
      },
      {
        label: "25-30",
        data: [],
      },
      {
        label: ">30",
        data: [],
      },
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/draw",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const count1 = new Array(3).fill(0);
      const count2 = new Array(3).fill(0);
      const count3 = new Array(3).fill(0);
      response.data.forEach((obj) => {  // 统计手术方式
        var tmp = 0;
        if (obj.ssfs == '全切') {
          tmp = 0;
        }
        else if (obj.ssfs == '保乳') {
          tmp = 1;
        }
        else {
          tmp = 2;
        }
        const Idx = tmp;
        count1[Idx] = count1[Idx] + (obj.age <= 25)
        count2[Idx] = count2[Idx] + (obj.age > 25 && obj.age <= 30)
        count3[Idx] = count3[Idx] + (obj.age > 30)
      });
      // console.log(data);
      setData({
        labels: labels,
        datasets: [
          {
            label: "<=25",
            data: count1,
            color: 'darkblue'
          },
          {
            label: "25-30",
            data: count2,
            color: 'rose'
          },
          {
            label: ">30",
            data: count3,
            color: 'darkblue'
          },
        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <VerticalBarChart
        title={"手术方式柱形图"}
        chart={data}
      >
      </VerticalBarChart>
    </DashboardLayout>
  );
}

//返回是否化疗
function Chemotherapy() {
  const labels = ["是", "否"];
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "<=25",
        data: [],
      },
      {
        label: "25-30",
        data: [],
      },
      {
        label: ">30",
        data: [],
      },
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/draw",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const count1 = new Array(2).fill(0);
      const count2 = new Array(2).fill(0);
      const count3 = new Array(2).fill(0);
      response.data.forEach((obj) => {  // 统计是否化疗

        const Idx = obj.shhl == '是' ? 0 : 1;
        count1[Idx] = count1[Idx] + (obj.age <= 25)
        count2[Idx] = count2[Idx] + (obj.age > 25 && obj.age <= 30)
        count3[Idx] = count3[Idx] + (obj.age > 30)
      });
      // console.log(data);
      setData({
        labels: labels,
        datasets: [
          {
            label: "<=25",
            data: count1,
            color: 'success'
          },
          {
            label: "25-30",
            data: count2,
            color: 'popcorn'
          },
          {
            label: ">30",
            data: count3,
            color: 'brown'
          },
        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <VerticalBarChart
        title={"是否化疗柱形图"}
        chart={data}
      >
      </VerticalBarChart>
    </DashboardLayout>
  );

}

//返回是否放疗
function Radiotherapy() {
  const labels = ["是", "否"];
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "<=25",
        data: [],
      },
      {
        label: "25-30",
        data: [],
      },
      {
        label: ">30",
        data: [],
      },
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/draw",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const count1 = new Array(2).fill(0);
      const count2 = new Array(2).fill(0);
      const count3 = new Array(2).fill(0);
      response.data.forEach((obj) => {  // 统计是否放疗

        const Idx = obj.shfl == '是' ? 0 : 1;
        count1[Idx] = count1[Idx] + (obj.age <= 25)
        count2[Idx] = count2[Idx] + (obj.age > 25 && obj.age <= 30)
        count3[Idx] = count3[Idx] + (obj.age > 30)
      });
      // console.log(data);
      setData({
        labels: labels,
        datasets: [
          {
            label: "<=25",
            data: count1,
            color: 'purple'
          },
          {
            label: "25-30",
            data: count2,
            color: 'orange'
          },
          {
            label: ">30",
            data: count3,
            color: 'info'
          },
        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <VerticalBarChart
        title={"是否放疗柱形图"}
        chart={data}
      >
      </VerticalBarChart>
    </DashboardLayout>
  );

}

//返回是否新辅助
function Neoadjuvant() {
  const labels = ["是", "否"];
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "<=25",
        data: [],
      },
      {
        label: "25-30",
        data: [],
      },
      {
        label: ">30",
        data: [],
      },
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/draw",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const count1 = new Array(2).fill(0);
      const count2 = new Array(2).fill(0);
      const count3 = new Array(2).fill(0);
      response.data.forEach((obj) => {  // 统计是否新辅助

        const Idx = obj.xfzzl == '是' ? 0 : 1;
        count1[Idx] = count1[Idx] + (obj.age <= 25)
        count2[Idx] = count2[Idx] + (obj.age > 25 && obj.age <= 30)
        count3[Idx] = count3[Idx] + (obj.age > 30)
      });
      // console.log(data);
      setData({
        labels: labels,
        datasets: [
          {
            label: "<=25",
            data: count1,
            color: 'info'
          },
          {
            label: "25-30",
            data: count2,
            color: 'primary'
          },
          {
            label: ">30",
            data: count3,
            color: 'error'
          },
        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <VerticalBarChart
        title={"是否新辅助治疗柱形图"}
        chart={data}
      >
      </VerticalBarChart>
    </DashboardLayout>
  );

}

//返回T分期
function T() {
  const labels = ["Tis", "T0", "T1", "T2", "T3", "T4"];
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "<=25",
        data: [],
      },
      {
        label: "25-30",
        data: [],
      },
      {
        label: ">30",
        data: [],
      },
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/draw2",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const count1 = new Array(6).fill(0);
      const count2 = new Array(6).fill(0);
      const count3 = new Array(6).fill(0);
      response.data.forEach((obj) => {

        var tmp = 0;
        if (obj.t == 'Tis') {
          tmp = 0;
        }
        else if (obj.t == 'T0') {
          tmp = 1;
        }
        else if (obj.t == 'T1') {
          tmp = 2;
        }
        else if (obj.t == 'T2') {
          tmp = 3;
        }
        else if (obj.t == 'T3') {
          tmp = 4;
        }
        else {
          tmp = 5;
        }

        const Idx = tmp;
        count1[Idx] = count1[Idx] + (obj.age <= 25)
        count2[Idx] = count2[Idx] + (obj.age > 25 && obj.age <= 30)
        count3[Idx] = count3[Idx] + (obj.age > 30)
      });
      // console.log(data);
      setData({
        labels: labels,
        datasets: [
          {
            label: "<=25",
            data: count1,
            color: 'cadetblue'
          },
          {
            label: "25-30",
            data: count2,
            color: 'olivedrab'
          },
          {
            label: ">30",
            data: count3,
            color: 'lightsalmon'
          },
        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <VerticalBarChart
        title={"T分期柱形图"}
        chart={data}
      >
      </VerticalBarChart>
    </DashboardLayout>
  );

}

//返回N分期
function N() {
  const labels = ["N0", "N1", "N2", "N3"];
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "<=25",
        data: [],
      },
      {
        label: "25-30",
        data: [],
      },
      {
        label: ">30",
        data: [],
      },
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/draw2",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const count1 = new Array(4).fill(0);
      const count2 = new Array(4).fill(0);
      const count3 = new Array(4).fill(0);
      response.data.forEach((obj) => {
        var tmp = 0;
        if (obj.n == 'N0') {
          tmp = 0;
        }
        else if (obj.n == 'N1') {
          tmp = 1;
        }
        else if (obj.n == 'N2') {
          tmp = 2;
        }
        else {
          tmp = 3;
        }

        const Idx = tmp;
        count1[Idx] = count1[Idx] + (obj.age <= 25)
        count2[Idx] = count2[Idx] + (obj.age > 25 && obj.age <= 30)
        count3[Idx] = count3[Idx] + (obj.age > 30)
      });
      // console.log(data);
      setData({
        labels: labels,
        datasets: [
          {
            label: "<=25",
            data: count1,
            color: 'green'
          },
          {
            label: "25-30",
            data: count2,
            color: 'warning'
          },
          {
            label: ">30",
            data: count3,
            color: 'error'
          },
        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <VerticalBarChart
        title={"N分期柱形图"}
        chart={data}
      >
      </VerticalBarChart>
    </DashboardLayout>
  );

}

//返回M分期
function M() {
  const labels = ["M0", "M1"];
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "<=25",
        data: [],
      },
      {
        label: "25-30",
        data: [],
      },
      {
        label: ">30",
        data: [],
      },
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/draw2",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const count1 = new Array(2).fill(0);
      const count2 = new Array(2).fill(0);
      const count3 = new Array(2).fill(0);
      response.data.forEach((obj) => {  // 统计是否新辅助

        const Idx = obj.m == '否' ? 0 : 1;
        count1[Idx] = count1[Idx] + (obj.age <= 25)
        count2[Idx] = count2[Idx] + (obj.age > 25 && obj.age <= 30)
        count3[Idx] = count3[Idx] + (obj.age > 30)
      });
      // console.log(data);
      setData({
        labels: labels,
        datasets: [
          {
            label: "<=25",
            data: count1,
            color: 'orange'
          },
          {
            label: "25-30",
            data: count2,
            color: 'purple'
          },
          {
            label: ">30",
            data: count3,
            color: 'pink'
          },
        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <VerticalBarChart
        title={"M分期柱形图"}
        chart={data}
      >
      </VerticalBarChart>
    </DashboardLayout>
  );

}

//返回TNM分期
function TNM() {
  const labels = ['0', 'I', 'IIA', 'IIB', 'IIIA', 'IIIB', 'IIIC', 'Unknown'];
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "<=25",
        data: [],
      },
      {
        label: "25-30",
        data: [],
      },
      {
        label: ">30",
        data: [],
      },
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/draw2",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const count1 = new Array(8).fill(0);
      const count2 = new Array(8).fill(0);
      const count3 = new Array(8).fill(0);
      response.data.forEach((obj) => {
        var tmp = 0;
        if (obj.tnm == '0') {
          tmp = 0;
        }
        else if (obj.tnm == 'I') {
          tmp = 1;
        }
        else if (obj.tnm == 'IIA') {
          tmp = 2;
        }
        else if (obj.tnm == 'IIB') {
          tmp = 3;
        }
        else if (obj.tnm == 'IIIA') {
          tmp = 4;
        }
        else if (obj.tnm == 'IIIB') {
          tmp = 5;
        }
        else if (obj.tnm == 'IIIC') {
          tmp = 6;
        }
        else {
          tmp = 7;
        }

        const Idx = tmp;
        count1[Idx] = count1[Idx] + (obj.age <= 25)
        count2[Idx] = count2[Idx] + (obj.age > 25 && obj.age <= 30)
        count3[Idx] = count3[Idx] + (obj.age > 30)
      });
      // console.log(data);
      setData({
        labels: labels,
        datasets: [
          {
            label: "<=25",
            data: count1,
            color: 'info'
          },
          {
            label: "25-30",
            data: count2,
            color: 'warning'
          },
          {
            label: ">30",
            data: count3,
            color: 'wheat'
          },
        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <VerticalBarChart
        title={"TNM分期柱形图"}
        chart={data}
      >
      </VerticalBarChart>
    </DashboardLayout>
  );

}

//返回阳性淋巴结
function Lymph() {
  const labels = ['negative', "1~3", ">3"];
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "<=25",
        data: [],
      },
      {
        label: "25-30",
        data: [],
      },
      {
        label: ">30",
        data: [],
      },
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/draw",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const count1 = new Array(3).fill(0);
      const count2 = new Array(3).fill(0);
      const count3 = new Array(3).fill(0);
      response.data.forEach((obj) => {
        if (obj.yxywlbzs != null) {
          const Idx = Math.min(Math.floor(obj.yxywlbzs / 4), 1) + 1;
          count1[Idx] = count1[Idx] + (obj.age <= 25)
          count2[Idx] = count2[Idx] + (obj.age > 25 && obj.age <= 30)
          count3[Idx] = count3[Idx] + (obj.age > 30)
        }
        if (obj.lbjqk == 'negative') {
          const Idx = 0;
          count1[Idx] = count1[Idx] + (obj.age <= 25)
          count2[Idx] = count2[Idx] + (obj.age > 25 && obj.age <= 30)
          count3[Idx] = count3[Idx] + (obj.age > 30)

        }


      });
      // console.log(data);
      setData({
        labels: labels,
        datasets: [
          {
            label: "<=25",
            data: count1,
            color: 'cadetblue'
          },
          {
            label: "25-30",
            data: count2,
            color: 'rose'
          },
          {
            label: ">30",
            data: count3,
            color: 'popcorn'
          },
        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <VerticalBarChart
        title={"阳性淋巴结柱形图"}
        chart={data}
      >
      </VerticalBarChart>
    </DashboardLayout>
  );

}

//返回组织学分级
function Histological() {
  const labels = ['I', 'II', 'III', '其他'];
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "<=25",
        data: [],
      },
      {
        label: "25-30",
        data: [],
      },
      {
        label: ">30",
        data: [],
      },
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/draw",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const count1 = new Array(4).fill(0);
      const count2 = new Array(4).fill(0);
      const count3 = new Array(4).fill(0);
      response.data.forEach((obj) => {
        var tmp = 0;
        if (obj.zzxfj == 'I') {
          tmp = 0;
        }
        else if (obj.zzxfj == 'II') {
          tmp = 1;
        }
        else if (obj.zzxfj == 'III') {
          tmp = 2;
        }
        else {
          tmp = 3;
        }

        const Idx = tmp;
        count1[Idx] = count1[Idx] + (obj.age <= 25)
        count2[Idx] = count2[Idx] + (obj.age > 25 && obj.age <= 30)
        count3[Idx] = count3[Idx] + (obj.age > 30)
      });
      // console.log(data);
      setData({
        labels: labels,
        datasets: [
          {
            label: "<=25",
            data: count1,
            color: 'pink'
          },
          {
            label: "25-30",
            data: count2,
            color: 'error'
          },
          {
            label: ">30",
            data: count3,
            color: 'warning'
          },
        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <VerticalBarChart
        title={"组织学分级柱形图"}
        chart={data}
      >
      </VerticalBarChart>
    </DashboardLayout>
  );

}

//返回ER
function ER() {
  const labels = ["positive", "negative"];
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "<=25",
        data: [],
      },
      {
        label: "25-30",
        data: [],
      },
      {
        label: ">30",
        data: [],
      },
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/draw2",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const count1 = new Array(2).fill(0);
      const count2 = new Array(2).fill(0);
      const count3 = new Array(2).fill(0);
      response.data.forEach((obj) => {

        const Idx = obj.er == 'positive' ? 0 : 1;
        count1[Idx] = count1[Idx] + (obj.age <= 25)
        count2[Idx] = count2[Idx] + (obj.age > 25 && obj.age <= 30)
        count3[Idx] = count3[Idx] + (obj.age > 30)
      });
      // console.log(data);
      setData({
        labels: labels,
        datasets: [
          {
            label: "<=25",
            data: count1,
            color: 'green'
          },
          {
            label: "25-30",
            data: count2,
            color: 'darkgreen'
          },
          {
            label: ">30",
            data: count3,
            color: 'darkblue'
          },
        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <VerticalBarChart
        title={"ER状况柱形图"}
        chart={data}
      >
      </VerticalBarChart>
    </DashboardLayout>
  );

}

//返回PR
function PR() {
  const labels = ["positive", "negative"];
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "<=25",
        data: [],
      },
      {
        label: "25-30",
        data: [],
      },
      {
        label: ">30",
        data: [],
      },
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/draw2",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const count1 = new Array(2).fill(0);
      const count2 = new Array(2).fill(0);
      const count3 = new Array(2).fill(0);
      response.data.forEach((obj) => {

        const Idx = obj.pr == 'positive' ? 0 : 1;
        count1[Idx] = count1[Idx] + (obj.age <= 25)
        count2[Idx] = count2[Idx] + (obj.age > 25 && obj.age <= 30)
        count3[Idx] = count3[Idx] + (obj.age > 30)
      });
      // console.log(data);
      setData({
        labels: labels,
        datasets: [
          {
            label: "<=25",
            data: count1,
            color: 'gold'
          },
          {
            label: "25-30",
            data: count2,
            color: 'olive'
          },
          {
            label: ">30",
            data: count3,
            color: 'bluet'
          },
        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <VerticalBarChart
        title={"PR状况柱形图"}
        chart={data}
      >
      </VerticalBarChart>
    </DashboardLayout>
  );

}

//返回HER2
function HER2() {
  const labels = ["positive", "negative"];
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "<=25",
        data: [],
      },
      {
        label: "25-30",
        data: [],
      },
      {
        label: ">30",
        data: [],
      },
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/draw2",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const count1 = new Array(2).fill(0);
      const count2 = new Array(2).fill(0);
      const count3 = new Array(2).fill(0);
      response.data.forEach((obj) => {

        const Idx = obj.her2jtqk == 'positive' ? 0 : 1;
        count1[Idx] = count1[Idx] + (obj.age <= 25);
        count2[Idx] = count2[Idx] + (obj.age > 25 && obj.age <= 30);
        count3[Idx] = count3[Idx] + (obj.age > 30);
      });
      // console.log(data);
      setData({
        labels: labels,
        datasets: [
          {
            label: "<=25",
            data: count1,
            color: 'info'
          },
          {
            label: "25-30",
            data: count2,
            color: 'purple'
          },
          {
            label: ">30",
            data: count3,
            color: 'primary'
          },
        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <VerticalBarChart
        title={"HER2状况柱形图"}
        chart={data}
      >
      </VerticalBarChart>
    </DashboardLayout>
  );

}

//返回分子分型
function MoleType() {
  const labels = ['HR+HER2-', 'HR+HER2+', 'HR-HER2+', 'TNBC', 'Unknown'];
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "<=25",
        data: [],
      },
      {
        label: "25-30",
        data: [],
      },
      {
        label: ">30",
        data: [],
      },
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/draw2",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const count1 = new Array(5).fill(0);
      const count2 = new Array(5).fill(0);
      const count3 = new Array(5).fill(0);
      response.data.forEach((obj) => {
        var tmp = 0;
        if (obj.fzfx == 'HR+HER2-') {
          tmp = 0;
        }
        else if (obj.fzfx == 'HR+HER2+') {
          tmp = 1;
        }
        else if (obj.fzfx == 'HR-HER2+') {
          tmp = 2;
        }
        else if (obj.fzfx == 'TNBC') {
          tmp = 3;
        }
        else {
          tmp = 4;
        }

        const Idx = tmp;
        count1[Idx] = count1[Idx] + (obj.age <= 25);
        count2[Idx] = count2[Idx] + (obj.age > 25 && obj.age <= 30);
        count3[Idx] = count3[Idx] + (obj.age > 30);
      });
      // console.log(data);
      setData({
        labels: labels,
        datasets: [
          {
            label: "<=25",
            data: count1,
            color: 'orange'
          },
          {
            label: "25-30",
            data: count2,
            color: 'purple'
          },
          {
            label: ">30",
            data: count3,
            color: 'pink'
          },
        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <VerticalBarChart
        title={"分子分型柱形图"}
        chart={data}
      >
      </VerticalBarChart>
    </DashboardLayout>
  );

}


//返回侧别
function Side() {
  const labels = ['左乳', '右乳', '双乳', 'Unknown'];
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "<=25",
        data: [],
      },
      {
        label: "25-30",
        data: [],
      },
      {
        label: ">30",
        data: [],
      },
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/draw2",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const count1 = new Array(4).fill(0);
      const count2 = new Array(4).fill(0);
      const count3 = new Array(4).fill(0);
      response.data.forEach((obj) => {
        var tmp = 0;
        if (obj.zkwz == '左乳') {
          tmp = 0;
        }
        else if (obj.zkwz == '右乳') {
          tmp = 1;
        }
        else if (obj.zkwz == '双乳') {
          tmp = 2;
        }
        else {
          tmp = 3;
        }

        const Idx = tmp;
        count1[Idx] = count1[Idx] + (obj.age <= 25);
        count2[Idx] = count2[Idx] + (obj.age > 25 && obj.age <= 30);
        count3[Idx] = count3[Idx] + (obj.age > 30);
      });
      // console.log(data);
      setData({
        labels: labels,
        datasets: [
          {
            label: "<=25",
            data: count1,
            color: 'india'
          },
          {
            label: "25-30",
            data: count2,
            color: 'block'
          },
          {
            label: ">30",
            data: count3,
            color: 'darkred'
          },
        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <VerticalBarChart
        title={"患病侧别柱形图"}
        chart={data}
      >
      </VerticalBarChart>
    </DashboardLayout>
  );

}

//返回是否双原位癌
function Double() {
  const labels = ['是', '否'];
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "<=25",
        data: [],
      },
      {
        label: "25-30",
        data: [],
      },
      {
        label: ">30",
        data: [],
      },
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/draw2",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const count1 = new Array(2).fill(0);
      const count2 = new Array(2).fill(0);
      const count3 = new Array(2).fill(0);
      response.data.forEach((obj) => {

        const Idx = obj.syfazjtxq == '是' ? 0 : 1;
        count1[Idx] = count1[Idx] + (obj.age <= 25);
        count2[Idx] = count2[Idx] + (obj.age > 25 && obj.age <= 30);
        count3[Idx] = count3[Idx] + (obj.age > 30);
      });
      // console.log(data);
      setData({
        labels: labels,
        datasets: [
          {
            label: "<=25",
            data: count1,
            color: 'info'
          },
          {
            label: "25-30",
            data: count2,
            color: 'blue'
          },
          {
            label: ">30",
            data: count3,
            color: 'bluet'
          },
        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <VerticalBarChart
        title={"是否第二原位癌柱形图"}
        chart={data}
      >
      </VerticalBarChart>
    </DashboardLayout>
  );

}

//返回生存状态
function Alive() {
  const labels = ['Dead', 'Alive', 'Unknown'];
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "<=25",
        data: [],
      },
      {
        label: "25-30",
        data: [],
      },
      {
        label: ">30",
        data: [],
      },
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/draw2",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const count1 = new Array(3).fill(0);
      const count2 = new Array(3).fill(0);
      const count3 = new Array(3).fill(0);
      response.data.forEach((obj) => {
        var tmp = 0;
        if (obj.swyf == '是') {
          tmp = 0;
        }
        else if (obj.swyf == '否') {
          tmp = 1;
        }
        else {
          tmp = 2;
        }

        const Idx = tmp;
        count1[Idx] = count1[Idx] + (obj.age <= 25);
        count2[Idx] = count2[Idx] + (obj.age > 25 && obj.age <= 30);
        count3[Idx] = count3[Idx] + (obj.age > 30);
      });
      // console.log(data);
      setData({
        labels: labels,
        datasets: [
          {
            label: "<=25",
            data: count1,
            color: 'gold'
          },
          {
            label: "25-30",
            data: count2,
            color: 'goldenrod'
          },
          {
            label: ">30",
            data: count3,
            color: 'darkgoldenrod'
          },
        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <VerticalBarChart
        title={"生存状态柱形图"}
        chart={data}
      >
      </VerticalBarChart>
    </DashboardLayout>
  );

}

//返回复发情况
function Recurrence() {
  const labels = ['局部复发', '远处转移', 'No/Unknown'];
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "<=25",
        data: [],
      },
      {
        label: "25-30",
        data: [],
      },
      {
        label: ">30",
        data: [],
      },
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/draw2",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const count1 = new Array(3).fill(0);
      const count2 = new Array(3).fill(0);
      const count3 = new Array(3).fill(0);
      response.data.forEach((obj) => {
        var tmp = 0;
        if (obj.jtffbw == 'Local') {
          tmp = 0;
        }
        else if (obj.jtffbw == 'Distal') {
          tmp = 1;
        }
        else {
          tmp = 2;
        }

        const Idx = tmp;
        count1[Idx] = count1[Idx] + (obj.age <= 25);
        count2[Idx] = count2[Idx] + (obj.age > 25 && obj.age <= 30);
        count3[Idx] = count3[Idx] + (obj.age > 30);
      });
      // console.log(data);
      setData({
        labels: labels,
        datasets: [
          {
            label: "<=25",
            data: count1,
            color: 'lightorange'
          },
          {
            label: "25-30",
            data: count2,
            color: 'lightred'
          },
          {
            label: ">30",
            data: count3,
            color: 'lightpink'
          },
        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <VerticalBarChart
        title={"复发情况柱形图"}
        chart={data}
      >
      </VerticalBarChart>
    </DashboardLayout>
  );

}

//返回年轻患者是否选择化疗
function YoungChem() {
  const labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'];
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "化疗比例",
        data: [],
      },
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/draw",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const moleCounts = new Array(16).fill(0);
      const totalnum = new Array(16).fill(0);
      response.data.forEach((obj) => {
        var d = new Date(obj.ssrq)
        var times = d.getFullYear();
        //console.log("ssrq",typeof(obj.ssrq))
        //console.log(obj.ssrq)
        var tmp = -1;
        var t = -1;
        if (times % 2006 < 16) {
          t = times % 2006;
          if (obj.shhl === '是') {
            tmp = t;
          };
        }
        totalnum[t] += 1;
        const Idx = tmp;
        moleCounts[Idx] = moleCounts[Idx] ? moleCounts[Idx] + 1 : 1;

      });
      //console.log("num",totalnum);
      for (var i = 0; i < moleCounts.length; i++) {
        moleCounts[i] = (moleCounts[i] / totalnum[i]) * 100;

      }
      setData({
        labels: labels,
        datasets: [
          {
            label: "化疗比例",
            data: moleCounts,
            color: 'orange'
          },

        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <DefaultLineChart
        title={"年轻乳腺癌患者选择化疗的变化趋势"}
        chart={data}
      >
      </DefaultLineChart>
    </DashboardLayout>
  );

}



//返回年轻患者是否选择放疗
function YoungRadio() {
  const labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'];
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "放疗比例",
        data: [],
      },
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/draw",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const moleCounts = new Array(16).fill(0);
      const totalnum = new Array(16).fill(0);
      response.data.forEach((obj) => {
        var d = new Date(obj.ssrq)
        var times = d.getFullYear();
        var tmp = -1;
        var t = -1;
        if (times % 2006 < 16) {
          t = times % 2006;
          if (obj.shfl === '是') {
            tmp = t;
          };
        }
        totalnum[t] += 1;
        const Idx = tmp;
        moleCounts[Idx] = moleCounts[Idx] ? moleCounts[Idx] + 1 : 1;

      });
      for (var i = 0; i < moleCounts.length; i++) {
        moleCounts[i] = (moleCounts[i] / totalnum[i]) * 100;

      }
      setData({
        labels: labels,
        datasets: [
          {
            label: "放疗比例",
            data: moleCounts,
            color: 'primary'
          },

        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <DefaultLineChart
        title={"年轻乳腺癌患者选择放疗的变化趋势"}
        chart={data}
      >
      </DefaultLineChart>
    </DashboardLayout>
  );

}


//返回年轻患者是否选择靶向治疗
function YoungTarget() {
  const labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'];
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "靶向比例",
        data: [],
      },
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/draw",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const moleCounts = new Array(16).fill(0);
      const totalnum = new Array(16).fill(0);
      response.data.forEach((obj) => {
        var d = new Date(obj.ssrq)
        var times = d.getFullYear();
        var tmp = -1;
        var t = -1;
        if (times % 2006 < 16) {
          t = times % 2006;
          if (obj.shbxzl === '是') {
            tmp = t;
          };
        }
        totalnum[t] += 1;
        const Idx = tmp;
        moleCounts[Idx] = moleCounts[Idx] ? moleCounts[Idx] + 1 : 1;

      });
      //console.log("num",totalnum);
      for (var i = 0; i < moleCounts.length; i++) {
        moleCounts[i] = (moleCounts[i] / totalnum[i]) * 100;

      }
      setData({
        labels: labels,
        datasets: [
          {
            label: "靶向比例",
            data: moleCounts,
            color: 'pink'
          },

        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <DefaultLineChart
        title={"年轻乳腺癌患者选择靶向治疗的变化趋势"}
        chart={data}
      >
      </DefaultLineChart>
    </DashboardLayout>
  );

}



//返回年轻患者是否选择内分泌治疗
function YoungEndo() {
  const labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'];
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "内分泌比例",
        data: [],
      }
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/draw",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const moleCounts = new Array(16).fill(0);
      const totalnum = new Array(16).fill(0);
      response.data.forEach((obj) => {
        var d = new Date(obj.ssrq)
        var times = d.getFullYear();
        var tmp = -1;
        var t = -1;
        if (times % 2006 < 16) {
          t = times % 2006;
          if (obj.shnfmzl === '是') {
            tmp = t;
          };
        }

        totalnum[t] += 1;
        const moleIdx = tmp;
        moleCounts[moleIdx] = moleCounts[moleIdx] ? moleCounts[moleIdx] + 1 : 1;
      });
      //console.log("num",totalnum);
      for (var i = 0; i < moleCounts.length; i++) {
        moleCounts[i] = (moleCounts[i] / totalnum[i]) * 100;
      }
      setData({
        labels: labels,
        datasets: [
          {
            label: "# 内分泌比例",
            data: moleCounts,
            color: "gold",
          }
        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <DefaultLineChart
        title={"年轻乳腺癌患者选择内分泌治疗的变化趋势"}
        chart={data}
      >
      </DefaultLineChart>
    </DashboardLayout>
  );

}


//返回年轻患者是否选择新辅助治疗
function YoungNeo() {
  const labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'];
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "新辅助治疗比例",
        data: [],
      }
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/draw",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const moleCounts = new Array(16).fill(0);
      const totalnum = new Array(16).fill(0);
      response.data.forEach((obj) => {
        var d = new Date(obj.ssrq)
        var times = d.getFullYear();
        var tmp = -1;
        var t = -1;
        if (times % 2006 < 16) {
          t = times % 2006;
          if (obj.xfzzl === '是') {
            tmp = t;
          };
        }

        totalnum[t] += 1;
        const Idx = tmp;
        moleCounts[Idx] = moleCounts[Idx] ? moleCounts[Idx] + 1 : 1;
      });
      //console.log("num",totalnum);
      for (var i = 0; i < moleCounts.length; i++) {
        moleCounts[i] = (moleCounts[i] / totalnum[i]) * 100;
      }
      setData({
        labels: labels,
        datasets: [
          {
            label: "# 新辅助治疗比例",
            data: moleCounts,
            color: "olive",
          }
        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <DefaultLineChart
        title={"年轻乳腺癌患者选择新辅助治疗的变化趋势"}
        chart={data}
      >
      </DefaultLineChart>
    </DashboardLayout>
  );

}

//返回年轻患者手术方式
function YoungSurgery() {
  const labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'];
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "全切",
        data: [],

      },
      {
        label: "保乳",
        data: [],
      },
      {
        label: "再造",
        data: [],
      }
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/draw",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const bcs = new Array(16).fill(0); //保乳
      const rs = new Array(16).fill(0);//再造
      const mast = new Array(16).fill(0);//全切

      const totalnum = new Array(17).fill(0);
      response.data.forEach((obj) => {
        var d = new Date(obj.ssrq)
        var times = d.getFullYear();
        var t = -1;
        if (times % 2006 < 16) {
          t = times % 2006;

        }

        totalnum[t] += 1;
        const Idx = t;
        mast[Idx] = mast[Idx] + (obj.ssfs === '全切');
        bcs[Idx] = bcs[Idx] + (obj.ssfs === '保乳');
        rs[Idx] = rs[Idx] + (obj.ssfs === '再造');

      });
      for (var i = 0; i < mast.length; i++) {
        mast[i] = (mast[i] / totalnum[i]) * 100;
        bcs[i] = (bcs[i] / totalnum[i]) * 100;
        rs[i] = (rs[i] / totalnum[i]) * 100;
      }
      setData({
        labels: labels,
        datasets: [
          {
            label: "全切",
            data: mast,
            color: "info",

          },
          {
            label: "保乳",
            data: bcs,
            color: "primary",
          },
          {
            label: "再造",
            data: rs,
            color: "success"
          }
        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <DefaultLineChart
        title={"年轻乳腺癌患者手术方式选择变化趋势"}
        chart={data}
      >
      </DefaultLineChart>
    </DashboardLayout>
  );
}

//新辅治疗后的手术接受率
function SurgeryAfterNeo() {
  const labels = ["是", "否"];
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "全切",
        data: [],
      },
      {
        label: "保乳",
        data: [],
      },
      {
        label: "再造",
        data: [],
      },
      {
        label: "Unknown",
        data: [],
      },
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/draw",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const count1 = new Array(2).fill(0);
      const count2 = new Array(2).fill(0);
      const count3 = new Array(2).fill(0);
      const count4 = new Array(2).fill(0);
      const totalnum = new Array(2).fill(0);
      response.data.forEach((obj) => {  // 统计是否新辅助

        const Idx = obj.xfzzl == '是' ? 0 : 1;
        totalnum[Idx] += 1;
        count1[Idx] = count1[Idx] + (obj.ssfs === '全切');
        count2[Idx] = count2[Idx] + (obj.ssfs === '保乳');
        count3[Idx] = count3[Idx] + (obj.ssfs === '再造');
        count4[Idx] = count3[Idx] + (obj.ssfs === 'Unknown');
      });
      for (var i = 0; i < totalnum.length; i++) {
        count1[i] = (count1[i] / totalnum[i]) * 100;
        count2[i] = (count2[i] / totalnum[i]) * 100;
        count3[i] = (count3[i] / totalnum[i]) * 100;
        count4[i] = (count4[i] / totalnum[i]) * 100;
      }
      setData({
        labels: labels,
        datasets: [
          {
            label: "全切",
            data: count1,
            color: 'orange'
          },
          {
            label: "保乳",
            data: count2,
            color: 'green'
          },
          {
            label: "再造",
            data: count3,
            color: 'blue'
          },
          {
            label: "Unknown",
            data: count4,
            color: 'error'
          },
        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <VerticalBarChart
        title={"新辅助治疗后手术接受率"}
        chart={data}
      >
      </VerticalBarChart>
    </DashboardLayout>
  );
}

//新辅治疗疗效评价
function ResponsetoNeo() {
  const labels = ["CR", "PR", "SD/PD"];
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "",
        data: [],
      },

    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/draw",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const count1 = new Array(3).fill(0);
      const totalnum = new Array(2).fill(0);
      response.data.forEach((obj) => {
        var tmp = -1;
        if (obj.xfzzlpj === 'CR') {
          tmp = 0;
        }
        else if (obj.xfzzlpj === 'PR') {
          tmp = 1;
        }
        else {
          tmp = 2;
        }

        const Idx = tmp;
        totalnum[Idx] += 1;
        count1[Idx] = count1[Idx] ? count1[Idx] + 1 : 1;

      });
      for (var i = 0; i < totalnum.length; i++) {
        count1[i] = (count1[i] / totalnum[i]) * 100;
      }
      setData({
        labels: labels,
        datasets: [
          {
            label: "",
            data: count1,
            color: 'orange'
          },
        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <StackedBarChart
        title={"新辅助治疗后手术接受率"}
        chart={data}
      >
      </StackedBarChart>
    </DashboardLayout>
  );
}

//返回小于35岁患者的比例
function Line3540() {
  const labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'];
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "小于35岁患者比例",
        data: [],
      },
      {
        label: "小于40岁患者比例",
        data: [],
      }
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/draw",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const count1 = new Array(16).fill(0);
      const count2 = new Array(16).fill(0);
      const totalnum = new Array(16).fill(0);
      response.data.forEach((obj) => {
        var d = new Date(obj.fbDate)
        var times = d.getFullYear();
        var t = -1;
        if (times % 2006 < 16) {
          t = times % 2006;
        }
        totalnum[t] += 1;
        const Idx = t;
        count1[Idx] = count1[Idx] + (obj.age <= 35);
        count2[Idx] = count2[Idx] + (obj.age <= 35);
      });
      //console.log("num",totalnum);
      for (var i = 0; i < count1.length; i++) {
        count1[i] = (count1[i] / totalnum[i]) * 100;
        count2[i] = (count2[i] / totalnum[i]) * 100;
      }
      setData({
        labels: labels,
        datasets: [
          {
            label: "# 小于35岁患者比例",
            data: count1,
            color: "bluet",
          },
          {
            label: "# 小于40岁患者比例",
            data: count2,
            color: "lightred",
          }
        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <DefaultLineChart
        title={"年龄逐年占比"}
        chart={data}
      >
      </DefaultLineChart>
    </DashboardLayout>
  );

}


//返回小于35、40岁患者的数量
function Bar3540() {
  const labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'];
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "小于35岁患者数量",
        data: [],
      },
      {
        label: "小于40岁患者数量",
        data: [],
      },
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/draw",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const count1 = new Array(16).fill(0);
      const count2 = new Array(16).fill(0);
      response.data.forEach((obj) => {
        var d = new Date(obj.fbDate)
        var times = d.getFullYear();
        var t = -1;
        if (times % 2006 < 16) {
          t = times % 2006;
        }

        const Idx = t;
        count1[Idx] = count1[Idx] + (obj.age <= 35);
        count2[Idx] = count2[Idx] + (obj.age <= 40);
      });

      setData({
        labels: labels,
        datasets: [
          {
            label: "小于35岁患者数量",
            data: count1,
            color: "gold",
          },
          {
            label: "小于40岁患者数量",
            data: count1,
            color: "pink",
          }
        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <VerticalBarChart
        title={"逐年年轻患者数量"}
        chart={data}
      >
      </VerticalBarChart>
    </DashboardLayout>
  );

}

function NewPatient() {
  const labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'];
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "新发患者数量",
        data: [],
      },
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/draw",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const count1 = new Array(16).fill(0);
      response.data.forEach((obj) => {
        var d = new Date(obj.fbDate)
        var times = d.getFullYear();
        //console.log("time:",times%2006)
        var t = -1;
        if (times % 2006 < 16) {
          t = times % 2006;
        }
        const Idx = t;
        count1[Idx] = count1[Idx] ? count1[Idx] + 1 : 1;

      });

      setData({
        labels: labels,
        datasets: [
          {
            label: "新发患者数量",
            data: count1,
            color: "cadetblue",
          },
        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <VerticalBarChart
        title={"每年新发乳腺癌患者数量"}
        chart={data}
      >
      </VerticalBarChart>
    </DashboardLayout>
  );

}

function KMLifelines_OS() {
  const [month, setMonth] = useState('');
  const [risk, setRisk] = useState('');
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "总体生存率(n=3616)",
        data: [],
      }
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/drawlifelines",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const timelines = new Array(100).fill(0);
      const km = new Array(100).fill(0);
      var month60 = '';
      var at_risk = '';
      var i = 0;
      response.data.forEach((obj) => {
        //console.log(obj["km"])
        if (obj["timeline"] <= 120) {

          //console.log(obj['km'])
          timelines[i] = obj['timeline'];
          km[i] = obj['km'];
          i += 1;
          if (obj["timeline"] === 60) {
            month60 = obj['km'] * 100;
          }
        }
        if (obj["timeline"] == 'at_risk') {
          at_risk = obj['km'];
        };

      });

      //console.log(km)
      setMonth("n=60,生存率=" + month60 + '%')
      setRisk("\nat risk: " + at_risk)

      setData({
        labels: timelines,
        datasets: [
          {
            label: "总体生存率(n=3616)",
            data: km,
            color: "info",
          }
        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <KMLineChart
        title={"患者总体生存率"}
        chart={data}
        description={month + risk}
      >
      </KMLineChart>
    </DashboardLayout>
  );


}

function KMLifelines_DFS() {
  const [month, setMonth] = useState('');
  const [risk, setRisk] = useState('');
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "无病生存率(n=3616)",
        data: [],
      }
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/drawlifelines2",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const timelines = new Array(100).fill(0);
      const km = new Array(100).fill(0);
      var i = 0;
      var month60 = '';
      var at_risk = '';
      response.data.forEach((obj) => {
        //console.log(obj)
        if (obj["timeline"] <= 120) {

          //console.log(obj['km'])
          timelines[i] = obj['timeline'];
          km[i] = obj['km'];
          i += 1;
          if (obj["timeline"] === 60) {
            month60 = obj['km'] * 100;
          }
        }
        if (obj["timeline"] == 'at_risk') {
          at_risk = obj['km'];
        };

      });
      //console.log(timelines)
      //console.log(km)
      setMonth("n=60,生存率=" + month60 + '%')
      setRisk("\nat risk: " + at_risk)
      setData({
        labels: timelines,
        datasets: [
          {
            label: "无病生存率(n=3616)",
            data: km,
            color: "green",
          }
        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <KMLineChart
        title={"患者无病生存率"}
        chart={data}
        description={month + risk}
      >
      </KMLineChart>
    </DashboardLayout>
  );
}


function KMLifelines_BHOS() {
  const [month, setMonth] = useState('');
  const [risk, setRisk] = useState('');
  const [cox, setCox] = useState('')
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "病后生育总体生存率(n=91)",
        data: [],
      },
      {
        label: "病后未生育总体生存率(n=3525)",
        data: [],
      }
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/drawlifelines3",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const timelines = new Array(5).fill(0);
      const km = new Array(5).fill(0);
      const km1 = new Array(5).fill(0);
      var month = '';
      var at_risk = '';
      var cph = '';
      var i = 0;
      response.data.forEach((obj) => {
        //console.log("obj:", obj)
        if (obj['timeline'] <= 195) {
          //console.log(obj['timeline_yes'])
          timelines[i] = obj['timeline'];
          km[i] = obj['km_yes'];
          km1[i] = obj['km_no'];
          i += 1;
          if (obj["timeline"] === 60) {
            month = "n=60,病后生育生存率为" + obj['km_yes'] * 100 + "%";
            month += '\nn=60,病后未生育生存率为' + obj['km_no'] * 100 + '%';
          }
        }
        if (obj["timeline"] == 'at_risk1') {
          at_risk = "with:" + obj['km_yes'];
        };
        if (obj["timeline"] == 'at_risk2') {
          at_risk += "\nwithout:" + obj['km_yes'];
        };
        if (obj['timeline'] == 'cox') {
          cph = obj['km_yes'];
        }
      });
      setMonth(month)
      setRisk("\nat risk: " + at_risk)
      setCox("\n" + cph);
      setData({
        labels: timelines,
        datasets: [
          {
            label: "病后生育总体生存率(n=91)",
            data: km,
            color: "wheat",
          },
          {
            label: "病后未生育总体生存率(n=3525)",
            data: km1,
            color: "orange",
          }
        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <KMLineChart
        title={"病后患者生育与否总体生存率对比"}
        chart={data}
        description={month + risk + cox}
      >
      </KMLineChart>
    </DashboardLayout>
  );


}



function KMLifelines_BHDFS() {
  const [month, setMonth] = useState('');
  const [risk, setRisk] = useState('');
  const [cox, setCox] = useState('')
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "病后生育无病生存率(n=91)",
        data: [],
      },
      {
        label: "病后未生育无病生存率(n=3525)",
        data: [],
      }
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/drawlifelines4",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const timelines = new Array(5).fill(0);
      const km = new Array(5).fill(0);
      const km1 = new Array(5).fill(0);
      var month = '';
      var at_risk = '';
      var cph = '';
      var i = 0;
      response.data.forEach((obj) => {
        //console.log("obj:", obj)
        if (obj['timeline'] <= 195) {
          timelines[i] = obj['timeline'];
          km[i] = obj['km'];
          km1[i] = obj['km1'];
          i += 1;
          if (obj["timeline"] === 60) {
            month = "n=60,病后生育无病生存率为" + obj['km'] * 100 + "%";
            month += '\nn=60,病后未生育无病生存率为' + obj['km1'] * 100 + '%';
          }
        }
        if (obj["timeline"] == 'at_risk1') {
          at_risk = "with:" + obj['km'];
        };
        if (obj["timeline"] == 'at_risk2') {
          at_risk += "\nwithout:" + obj['km'];
        };
        if (obj['timeline'] == 'cox') {
          cph = obj['km'];
        }
      });
      //console.log("time:",timelines)
      setMonth(month)
      setRisk("\nat risk: " + at_risk)
      setCox("\n" + cph);
      setData({
        labels: timelines,
        datasets: [
          {
            label: "病后生育无病生存率(n=91)",
            data: km,
            color: "block",
          },
          {
            label: "病后未生育无病生存率(n=3525)",
            data: km1,
            color: "success",
          }
        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <KMLineChart
        title={"病后患者生育与否无病生存率对比"}
        chart={data}
        description={month + risk + cox}
      >
      </KMLineChart>
    </DashboardLayout>
  );


}



function KMLifelines_hasbornOS() {
  const [month, setMonth] = useState('');
  const [risk, setRisk] = useState('');
  const [cox, setCox] = useState('')
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "有生育史总体生存率(n=2737)",
        data: [],
      },
      {
        label: "无生育史患者总体生存率(n=819)",
        data: [],
      }
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/drawlifelines5",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const timelines = new Array(5).fill(0);
      const km1 = new Array(5).fill(0);
      const km2 = new Array(5).fill(0);//另存对齐timeline后的km数据（未生育）
      var month = '';
      var at_risk = '';
      var cph = '';
      var i = 0;
      response.data.forEach((obj) => {
        //console.log("obj:", obj)
        if (obj['timeline'] <= 120) {
          timelines[i] = obj['timeline'];
          km1[i] = obj['km_yes'];
          km2[i] = obj['km_no'];
          i += 1;
          if (obj["timeline"] === 60) {
            month = "n=60,有生育史生存率为" + obj['km_yes'] * 100 + "%";
            month += '\nn=60,没有生育史生存率为' + obj['km_no'] * 100 + '%';
          }
        }
        if (obj["timeline"] == 'at_risk1') {
          at_risk = "with:" + obj['km_yes'];
        };
        if (obj["timeline"] == 'at_risk2') {
          at_risk += "\nwithout:" + obj['km_yes'];
        };
        if (obj['timeline'] == 'cox') {
          cph = obj['km_yes'];
        }
      });
      //console.log("time:",timelines)
      setMonth(month)
      setRisk("\nat risk: " + at_risk)
      setCox("\n" + cph);
      setData({
        labels: timelines,
        datasets: [
          {
            label: "有生育史总体生存率(n=2737)",
            data: km1,
            color: "warning",
          },
          {
            label: "无生育史患者总体生存率(n=819)",
            data: km2,
            color: "error",
          }
        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <KMLineChart
        title={"有无生育史患者总体生存率对比"}
        chart={data}
        description={month + risk + cox}
      >
      </KMLineChart>
    </DashboardLayout>
  );


}


function KMLifelines_hasbornDFS() {
  const [month, setMonth] = useState('');
  const [risk, setRisk] = useState('');
  const [cox, setCox] = useState('')
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "有生育史无病生存率(n=2737)",
        data: [],
      },
      {
        label: "无生育史患者无病生存率(n=819)",
        data: [],
      }
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/drawlifelines8",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const timelines = new Array(5).fill(0);
      const km1 = new Array(5).fill(0);
      const km2 = new Array(5).fill(0);//另存对齐timeline后的km数据（未生育）
      var month = '';
      var at_risk = '';
      var cph = '';
      var i = 0;
      response.data.forEach((obj) => {
        //console.log("obj:", obj)
        if (obj['timeline'] <= 120) {
          timelines[i] = obj['timeline'];
          km1[i] = obj['km'];
          km2[i] = obj['km1'];
          i += 1;
          if (obj["timeline"] === 60) {
            month = "n=60,有生育史生存率为" + obj['km'] * 100 + "%";
            month += '\nn=60,没有生育史生存率为' + obj['km1'] * 100 + '%';
          }
        }
        if (obj["timeline"] == 'at_risk1') {
          at_risk = "with:" + obj['km'];
        };
        if (obj["timeline"] == 'at_risk2') {
          at_risk += "\nwithout:" + obj['km'];
        };
        if (obj['timeline'] == 'cox') {
          cph = obj['km'];
        }
      });
      //console.log("time:",timelines)
      setMonth(month)
      setRisk("\nat risk: " + at_risk)
      setCox("\n" + cph);
      setData({
        labels: timelines,
        datasets: [
          {
            label: "有生育史无病生存率(n=2737)",
            data: km1,
            color: "green",
          },
          {
            label: "无生育史患者无病生存率(n=819)",
            data: km2,
            color: "gold",
          }
        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <KMLineChart
        title={"有无生育史患者无病生存率对比"}
        chart={data}
        description={month + risk + cox}
      >
      </KMLineChart>
    </DashboardLayout>
  );


}

function KMLifelines_MoleOS() {
  const [month, setMonth] = useState('');
  const [risk, setRisk] = useState('');
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "HR+HER2+(n=388)",
        data: [],
      },
      {
        label: "HR+HER2-(n=1859)",
        data: [],
      },
      {
        label: "HR-HER2+(n=319)",
        data: [],
      },
      {
        label: "TNBC(n=689)",
        data: [],
      }
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/drawlifelines6",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const timelines = new Array(30).fill(0);
      const km1 = new Array(50).fill(0);
      const km2 = new Array(50).fill(0);
      const km3 = new Array(50).fill(0);
      const km4 = new Array(50).fill(0);
      var month = '';
      var at_risk = '';
      var i = 0;
      response.data.forEach((obj) => {
        //console.log(obj["km"])
        if (obj["timeline"] <= 80) {
          //console.log(obj['km'])
          timelines[i] = obj["timeline"];
          km1[i] = obj['km1'];
          km2[i] = obj['km2'];
          km3[i] = obj['km3'];
          km4[i] = obj['km4'];
          i += 1;
        };
        if (obj["timeline"] === 60) {
          month = "n=60,HR+HER2+生存率为" + obj['km1'] * 100 + "%";
          month += '\nn=60,HR+HER2-生存率为' + obj['km2'] * 100 + '%';
          month += '\nn=60,HR-HER2+生存率为' + obj['km3'] * 100 + '%';
          month += '\nn=60,TNBC生存率为' + obj['km4'] * 100 + '%';
        }
        if (obj["timeline"] == 'at_risk1') {
          at_risk = "HR+HER2+:" + obj['km1'];
        };
        if (obj["timeline"] == 'at_risk2') {
          at_risk += "\nHR+HER2-:" + obj['km1'];
        };
        if (obj["timeline"] == 'at_risk3') {
          at_risk += "\nHR-HER2+:" + obj['km1'];
        };
        if (obj["timeline"] == 'at_risk4') {
          at_risk += "\nTNBC:" + obj['km1'];
        };

      });

      //console.log(km)
      setMonth(month)
      setRisk("\nat risk: " + at_risk)
      setData({
        labels: timelines,
        datasets: [
          {
            label: "HR+HER2+(n=388)",
            data: km1,
            color: "cadetblue",
          },
          {
            label: "HR+HER2-(n=1859)",
            data: km2,
            color: "olivedrab",
          },
          {
            label: "HR-HER2+(n=319)",
            data: km3,
            color: "lightsalmon",
          },
          {
            label: "TNBC(n=689)",
            data: km4,
            color: "darkgoldenrod",

          }
        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <KMLineChart
        title={"不同分子分型患者总体生存率对比"}
        chart={data}
        description={month + risk}
      >
      </KMLineChart>
    </DashboardLayout>
  );


}

function KMLifelines_OpOS() {
  const [month, setMonth] = useState('');
  const [risk, setRisk] = useState('');
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Mast(n=2279)",
        data: [],
      },
      {
        label: "B.C.S.(n=782)",
        data: [],
      },
      {
        label: "R.S.(n=463)",
        data: [],
      },
    ],
  });

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/drawlifelines7",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      const timelines = new Array(50).fill(0);
      const km1 = new Array(50).fill(0);
      const km2 = new Array(50).fill(0);
      const km3 = new Array(50).fill(0);
      var month = '';
      var at_risk = '';
      var i = 0;
      response.data.forEach((obj) => {
        //console.log(obj["km"])
        if (obj["timeline"] <= 80) {
          //console.log(obj['km'])
          timelines[i] = obj["timeline"];
          km1[i] = obj['km1'];
          km2[i] = obj['km2'];
          km3[i] = obj['km3'];
          i += 1;
        };
        if (obj["timeline"] === 60) {
          month = "n=60,手术方式为全切，生存率为" + obj['km1'] * 100 + "%";
          month += '\nn=60,手术方式为保乳，生存率为' + obj['km2'] * 100 + '%';
          month += '\nn=60,手术方式为再造，生存率为' + obj['km3'] * 100 + '%';
        }
        if (obj["timeline"] == 'at_risk1') {
          at_risk = "全切:" + obj['km1'];
        };
        if (obj["timeline"] == 'at_risk2') {
          at_risk += "\n保乳:" + obj['km1'];
        };
        if (obj["timeline"] == 'at_risk3') {
          at_risk += "\n再造:" + obj['km1'];
        };

      });

      //console.log(km)
      setMonth(month)
      setRisk("\nat risk: " + at_risk)
      setData({
        labels: timelines,
        datasets: [
          {
            label: "Mast(n=2279)",
            data: km1,
            color: "pink",
          },
          {
            label: "B.C.S.(n=782)",
            data: km2,
            color: "purple",
          },
          {
            label: "R.S.(n=463)",
            data: km3,
            color: "blue",
          },
        ],
      });
    });
  }, []);

  return (
    <DashboardLayout>

      <KMLineChart
        title={"不同手术方式患者总体生存率对比"}
        chart={data}
        description={month + risk}
      >
      </KMLineChart>
    </DashboardLayout>
  );


}
export default function SimpleContainer() {

  return (
    <React.Fragment>
      <DashboardNavbar />
      <CssBaseline />
      <Container maxWidth="sm">

        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
              <PieChartTableView />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Family />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Procreation />
            </Grid>
          </Grid>
        </SoftBox>

        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
              <Line3540 />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Bar3540 />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <NewPatient />
            </Grid>
          </Grid>
        </SoftBox>


        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
              <Gestation />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Parturition />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Abortion />
            </Grid>
          </Grid>
        </SoftBox>

        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
              <SurgeryType />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Chemotherapy />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Radiotherapy />
            </Grid>
          </Grid>
        </SoftBox>

        <SoftBox mb={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
              <Neoadjuvant />
            </Grid>
            <Grid item xs={12} sm={6} lg={8}>
              < Pathology />
            </Grid>
          </Grid>
        </SoftBox>


        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
              <T />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <N />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <M />
            </Grid>
          </Grid>
        </SoftBox>

        <SoftBox mb={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
              <Lymph />
            </Grid>
            <Grid item xs={12} sm={6} lg={8}>
              <TNM />
            </Grid>
          </Grid>
        </SoftBox>

        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
              <Histological />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <ER />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <PR />
            </Grid>
          </Grid>
        </SoftBox>

        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
              <HER2 />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <MoleType />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Side />
            </Grid>
          </Grid>
        </SoftBox>



        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
              <Double />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Alive />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Recurrence />
            </Grid>
          </Grid>
        </SoftBox>

        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
              < YoungChem />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <YoungRadio />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <YoungTarget />
            </Grid>
          </Grid>
        </SoftBox>

        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
              <YoungEndo />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <YoungNeo />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <YoungSurgery />
            </Grid>
          </Grid>
        </SoftBox>


        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
              <SurgeryAfterNeo />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <KMLifelines_OS />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <KMLifelines_DFS />
            </Grid>
          </Grid>
        </SoftBox>

        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
              <KMLifelines_MoleOS />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <KMLifelines_BHOS />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <KMLifelines_BHDFS />
            </Grid>
          </Grid>
        </SoftBox>

        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
              <KMLifelines_hasbornOS />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
             <KMLifelines_hasbornDFS/>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <KMLifelines_OpOS />
            </Grid>
          </Grid>
        </SoftBox>




























      </Container>
    </React.Fragment>
  );
}



// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing(2),
//     margin: '50px',
//     maxWidth: '80%',
//   },
//   image: {
//     width: '80%',
//     height: '80%',
//   },
//   img: {
//     margin: 'auto',
//     display: 'block',
//     maxWidth: '100%',
//     maxHeight: '100%',
//   },
// }));

// export default function ComplexGrid() {
//   const classes = useStyles();

//   return (
//     <DashboardLayout>

//       <DashboardNavbar />
//       <div className={classes.root}>
//         <Paper className={classes.paper}>
//           <Grid container spacing={2}>
//             <Grid item>
//               <ButtonBase>
//                 图表描述
//               </ButtonBase>
//             </Grid>
//             <Grid item xs={12} sm container>
//               <Grid item xs container direction="column" spacing={2}>
//                 <Grid item xs>
//                   <Typography gutterBottom variant="subtitle1">
//                     <PieChartTableView className={classes.img} />
//                   </Typography>

//                 </Grid>

//               </Grid>
//             </Grid>
//           </Grid>
//         </Paper>
//       </div>

//       <div className={classes.root}>
//         <Paper className={classes.paper}>
//           <Grid container spacing={2}>
//             <Grid item>
//               <Container maxWidth="sm">
//                 图表描述
//               </Container>
//             </Grid>
//             <Grid item xs={12} sm container>
//               <Grid item xs container direction="column" spacing={2}>
//                 <Grid item xs>
//                   <Typography gutterBottom variant="subtitle1">
//                     <Age className={classes.img} />
//                   </Typography>

//                 </Grid>

//               </Grid>
//             </Grid>
//           </Grid>
//         </Paper>
//       </div>

//     </DashboardLayout>
//   );
// }



//自适应布局
// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     margin: '20px',
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   },
// }));

// export default function AutoGrid() {
//   const classes = useStyles();

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <div className={classes.root}>
//         <Grid container spacing={3}>

//           <Grid item 病人年龄扇形图>
//             <Paper className={classes.paper}>
//               <PieChartTableView />
//             </Paper>
//           </Grid>
//           <Grid item 中位确诊年龄>
//             <Paper className={classes.paper}>
//               <Age />
//             </Paper>
//           </Grid>
//         </Grid>

//         <Grid container spacing={3}>
//           <Grid item 家族史>
//             <Paper className={classes.paper}>
//               <Family />
//             </Paper>
//           </Grid>

//         </Grid>


//         <Grid container spacing={3}>
//           <Grid item 生育>
//             <Paper className={classes.paper}>
//               <Procreation />
//             </Paper>
//           </Grid>

//           <Grid item 妊娠>
//             <Paper className={classes.paper}>
//               <Gestation />
//             </Paper>
//           </Grid>
//           <Grid item 生产>
//             <Paper className={classes.paper}>
//               <Parturition />
//             </Paper>
//           </Grid>
//           <Grid item 流产>
//             <Paper className={classes.paper}>
//               <Abortion />
//             </Paper>
//           </Grid>
//           <Grid item 病理类型>
//             <Paper className={classes.paper}>
//               < Pathology />
//             </Paper>
//           </Grid>
//           <Grid item 年轻患者是否化疗>
//             <Paper className={classes.paper}>
//               < YoungChem />
//             </Paper>
//           </Grid>
//         </Grid>
//       </div>
//     </DashboardLayout>
//   );
// }



// export default function TotalCharts() {
//   return (
//     <div>
//       <PieChartTableView />
//       <Age />
//       <Family />
//       <Procreation />
//       <Gestation />
//       <Parturition />
//       <Abortion />
//       < Pathology />
//       <SurgeryType />
//       <Chemotherapy />
//       <Radiotherapy />
//       <Neoadjuvant />
//       <T />
//       <N />
//       <M />
//       <TNM />
//       <Lymph />
//       <Histological />
//       <ER />
//       <PR />
//       <HER2 />
//       <MoleType />
//       <Side />
//       <Double />
//       <Alive />
//       <Recurrence />
//     </div>
//   );
// }




