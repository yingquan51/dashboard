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


const PathologyChartView = () => {
  const titles = ["病理类型", "T分期", "N分期", "M分期", "TNM分期", "组织学分级", '阳性淋巴结数', 'ER', 'PR', 'HER-2', '分子分型', '肿块位置']
  const labels = {
    blxjtms: ["化生性癌", "乳头状癌", "粘液癌","小叶原位癌",  "导管原位癌", "浸润性癌", "浸润微乳头状癌", "浸润小叶癌", "浸润导管小叶癌", "浸润导管粘液癌", "浸润导管微乳头状癌", "恶性叶状肿瘤", "乳腺佩吉特", "乳房佩吉特和浸润导管癌", "乳房佩吉特病和导管内癌", "实性浸润性乳头状癌", "微浸润性腺癌", "其他"],
    t: ["T0/Tis", "T1", "T2", "T3", "T4", '不详'],
    n: ["N0", "N1", "N2", "N3", '不详'],
    m: ["M0", "M1", '不详'],
    tnm: ['0', 'IA', 'IIA', 'IIB', 'IIIA', 'IIIB', 'IIIC', 'IV','不详'],
    zzxfj: ['I', 'II', 'III', '其他'],
    yxywlbzs: ['0', "1~3", ">3"],
    er: ['阳性', '阴性', '不详'],
    pr: ['阳性', '阴性', '不详'],
    her2: ['阳性', '阴性', '不详'],
    fzfx: ['Luminal型', 'HR-HER2+', 'HR+HER2+', 'TNBC', '不详'],
    zkwz: ['左乳', '右乳', '双乳', '不详'],
  }
  const idxFunction = {
    blxjtms: (v) => {
      let tmp = 0;
      if (v == 'in_situ_Lobular') {
        tmp = 3;
      }
      else if (v == 'in_situ_DCIS') {
        tmp = 4;
      }
      else if (v == 'in_situ_Paget') {
        tmp = 12;
      }
      else if (v == 'in_situ_Intraductal') {
        tmp = 5;
      }
      else if (v == 'invasive_Lobular') {
        tmp = 7;
      }
      else if (v == 'invasive_Duct') {
        tmp = 5;
      }
      else if (v == 'invasive_Mucinous') {
        tmp = 2;
      }
      else if (v == 'invasive_IMPC') {
        tmp = 6;
      }
      else {
        tmp = 17;
      }
      return tmp
    },
    t: (v) => {
      let tmp = 0
      if (v == 'T0/Tis') {
        tmp = 0;
      }
      else if (v == 'T1') {
        tmp = 1;
      }
      else if (v == 'T2') {
        tmp = 2;
      }
      else if (v == 'T3') {
        tmp = 3;
      }
      else if (v == 'T4') {
        tmp = 4;
      }
      else {
        tmp = 5;
      }
      return (tmp)
    },
    n: (v) => {
      let tmp = 0;
      if (v== 'N0') {
        tmp = 0;
      }
      else if (v == 'N1') {
        tmp = 1;
      }
      else if (v == 'N2') {
        tmp = 2;
      }
      else if (v == 'N3'){
        tmp = 3;
      }else {
        tmp = 4
      }
      return tmp
    },
    m: (v) => {
      let tmp = 0;
      if (v== 'M0') {
        tmp = 0;
      }
      else if (v == 'M1') {
        tmp = 1;
      }
      else {
        tmp = 2;
      }
      return tmp
    },
    tnm: (v) => {
      let tmp = 0;
        if (v == '0') {
          tmp = 0;
        }
        else if (v == 'IA') {
          tmp = 1;
        }
        else if (v == 'IIA') {
          tmp = 2;
        }
        else if (v == 'IIB') {
          tmp = 3;
        }
        else if (v == 'IIIA') {
          tmp = 4;
        }
        else if (v == 'IIIB') {
          tmp = 5;
        }
        else if (v == 'IIIC') {
          tmp = 6;
        }
        else if (v == 'IV'){
          tmp = 7;
        }else {
          tmp = 8;
        }
        return tmp
    },
    zzxfj: (v)=>{
      let tmp = 0;
      if (v == 'I') {
        tmp = 0;
      }
      else if (v == 'II') {
        tmp = 1;
      }
      else if (v == 'III') {
        tmp = 2;
      }
      else {
        tmp = 3;
      }
      return tmp
    },
    yxywlbzs: (v)=>{
      let tmp = 0
      if (v != null){
        tmp = Math.min(Math.floor(v / 4), 1) + 1
      }
      return tmp
    },
    er: (v)=>v == 'positive' ? 0 : 1,
    pr:(v)=>v == 'positive' ? 0 : 1,
    her2:(v)=>{
      let tmp = 0
      if(v == '阳性'){
        tmp = 0
      }else if(v == '阴性'){
        tmp = 1
      }else{
        tmp = 2
      }
      return tmp
    },
    fzfx:(v)=>{
      let tmp = 0;
      if (v == 'Luminal 型') {
        tmp = 0;
      }
      else if (v == 'HER-2 阳性（HR阴性）') {
        tmp = 1;
      }
      else if (v == 'HER-2 阳性（HR阳性）') {
        tmp = 2;
      }
      else if (v == 'TNBC') {
        tmp = 3;
      }
      else {
        tmp = 4;
      }
      return tmp
    },
    zkwz:(v)=>{
      let tmp = 0;
      if (v == '左乳') {
        tmp = 0;
      }
      else if (v == '右乳') {
        tmp = 1;
      }
      else if (v == '双乳') {
        tmp = 2;
      }
      else {
        tmp = 3;
      }
      return tmp
    }

  }
  const widths = [12,5,4,3,8,4,4,4,4,3,5,4] //每个图的宽度
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
  )))

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    let _data = Object.keys(labels).map((v) => (
      {
        labels: labels[v],
        datasets: [
          {
            label: "<=25",
            data: [],
            color: 'yellow',
          },
          {
            label: "25-30",
            data: [],
            color: 'dark',
          },
          {
            label: ">30",
            data: [],
            color: 'green',
          },
        ],
      }
    ))
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/pathology",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      // 统计是否有家族史
      console.log(response.data)
      let totalnum = 0;
      // 统计妊娠次数, 生产次数和流产次数
      let keys = Object.keys(labels)
      for (let i = 0; i < keys.length; i++) {
        let item = keys[i]
        let attr = labels[item]
        let count1 = new Array(labels[item].length).fill(0);
        let count2 = new Array(labels[item].length).fill(0);
        let count3 = new Array(labels[item].length).fill(0);
        totalnum = 0;
        response.data.forEach((obj) => {
          totalnum += 1;
          let Idx = idxFunction[item](obj[item])
          count1[Idx] = count1[Idx] + (obj.age <= 25)
          count2[Idx] = count2[Idx] + (obj.age > 25 && obj.age <= 30)
          count3[Idx] = count3[Idx] + (obj.age > 30)
        })
        _data[i].datasets = [
          {
            label: "<=25",
            data: count1,
            color: 'yellow',
          },
          {
            label: "25-30",
            data: count2,
            color: 'dark',
          },
          {
            label: ">30",
            data: count3,
            color: 'green',
          },
        ]
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
            <Grid item xs={8} sm={widths[i]} key={i}>
              <SoftBox mb={0}>
                {VerticalBarChart({ title: titles[i], chart: v, height: '19rem' })}
              </SoftBox>
            </Grid>
          ))
        }
      </Grid>
    </DashboardLayout>
  );
}

export default PathologyChartView