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

function KMLifelines_OS() {
  const [month, setMonth] = useState('');
  const [risk, setRisk] = useState('');
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "总体OS(n=3616)",
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
            label: "总体OS(n=3616)",
            data: km,
            color: "info",
          }
        ],
      });
    });
  }, []);

  return (
    <KMLineChart
      title={"患者总体OS"}
      chart={data}
      description={month + risk}
    >
    </KMLineChart>
  );


}

function KMLifelines_DFS() {
  const [month, setMonth] = useState('');
  const [risk, setRisk] = useState('');
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "DFS(n=3616)",
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

    <KMLineChart
      title={"患者总体DFS"}
      chart={data}
      description={month + risk}
    >
    </KMLineChart>
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
        label: "病后生育OS(n=91)",
        data: [],
      },
      {
        label: "病后未生育OS(n=3525)",
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
            label: "病后生育OS(n=91)",
            data: km,
            color: "wheat",
          },
          {
            label: "病后未生育OS(n=3525)",
            data: km1,
            color: "orange",
          }
        ],
      });
    });
  }, []);

  return (
    <KMLineChart
      title={"病后患者生育与否OS对比"}
      chart={data}
      description={month + risk + cox}
    >
    </KMLineChart>
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
        label: "病后生育DFS(n=91)",
        data: [],
      },
      {
        label: "病后未生育DFS(n=3525)",
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
            label: "病后生育DFS(n=91)",
            data: km,
            color: "block",
          },
          {
            label: "病后未生育DFS(n=3525)",
            data: km1,
            color: "success",
          }
        ],
      });
    });
  }, []);

  return (
    <KMLineChart
      title={"病后患者生育与否DFS对比"}
      chart={data}
      description={month + risk + cox}
    >
    </KMLineChart>
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
        label: "有生育史OS(n=2737)",
        data: [],
      },
      {
        label: "无生育史患者OS(n=819)",
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
    <KMLineChart
      title={"有无生育史患者总体生存率对比"}
      chart={data}
      description={month + risk + cox}
    >
    </KMLineChart>
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
        label: "有生育史DFS(n=2737)",
        data: [],
      },
      {
        label: "无生育史患者DFS(n=819)",
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
            label: "有生育史DFS(n=2737)",
            data: km1,
            color: "green",
          },
          {
            label: "无生育史患者DFS(n=819)",
            data: km2,
            color: "gold",
          }
        ],
      });
    });
  }, []);

  return (
    <KMLineChart
      title={"有无生育史患者DFS对比"}
      chart={data}
      description={month + risk + cox}
    >
    </KMLineChart>
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
    <KMLineChart
      title={"不同分子分型患者OS对比"}
      chart={data}
      description={month + risk}
    >
    </KMLineChart>
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
    <KMLineChart
      title={"不同手术方式患者OS对比"}
      chart={data}
      description={month + risk}
    >
    </KMLineChart>
  );
}

const KMLifelines = [KMLifelines_OS, KMLifelines_DFS, KMLifelines_BHOS, KMLifelines_BHDFS,
  KMLifelines_hasbornOS, KMLifelines_hasbornDFS, KMLifelines_MoleOS, KMLifelines_OpOS]

const SurvivalChartView = () => {
  const titles = ['死亡与否', '复发情况', '是否双原位癌']
  const labels = {
    'swyf': ['是', '否', '不详'],
    'syfazjtxq': ['局部复发', '远处转移', '无/不详'],
    'jtffbw': ['是', '否', '不详']
  }
  const [data, setData] = useState(Object.keys(labels).map((v) => (
    {
      labels: labels[v],
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
    }
  )));

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/draw2",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      let _data = [];
      for (let item of Object.keys(labels)) {
        let count1 = new Array(3).fill(0);
        let count2 = new Array(3).fill(0);
        let count3 = new Array(3).fill(0);
        response.data.forEach((obj) => {
          let Idx = 2;
          if (obj[item] === '是' || obj[item] === '局部复发') {
            Idx = 0
          } else if (obj[item] === '是' || obj[item] === '远处转移') {
            Idx = 1
          } else {
            Idx = 2
          }
          count1[Idx] = count1[Idx] + (obj.age <= 25);
          count2[Idx] = count2[Idx] + (obj.age > 25 && obj.age <= 30);
          count3[Idx] = count3[Idx] + (obj.age > 30);
        });
        _data.push({
          labels: labels[item],
          datasets: [
            {
              label: "<=25",
              data: count1,
              color: 'yellow'
            },
            {
              label: "25-30",
              data: count2,
              color: 'dark'
            },
            {
              label: ">30",
              data: count3,
              color: 'green'
            },
          ],
        })
      }
      setData(_data)
    });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={1}>
        {
          data.map((v, i) => (
            <Grid item xs={8} sm={4} key={i}>
              <SoftBox mb={0}>
                {VerticalBarChart({ title: titles[i], chart: v, height: '19rem' })}
              </SoftBox>
            </Grid>
          ))
        }
        {
          //生存分析
          KMLifelines.map((v, i) => (
            <Grid item xs={3} sm={6} key={i}>
              <SoftBox mb={0}>
                {v()}
              </SoftBox>
            </Grid>
          ))
        }
      </Grid>
    </DashboardLayout>
  );
}

export default SurvivalChartView