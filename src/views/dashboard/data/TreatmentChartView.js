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


const TreatmentChartView = () => {
  const years = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022']
  const yn = ['是', '否', '不详']
  const trendLabels = ['化疗比例', '放疗比例','靶向比例',"内分泌比例","新辅助比例"]
  const widths = [4,4,4,4,4,4,6,6,6,6,6,6]
  const titles = ["是否化疗", "是否放疗", "是否新辅治疗", "是否内分泌治疗","是否靶向治疗","手术方式",
  "年轻乳腺癌患者选择化疗的变化趋势", "年轻乳腺癌患者选择放疗的变化趋势", "年轻乳腺癌患者选择靶向治疗的变化趋势", "年轻乳腺癌患者选择内分泌治疗的变化趋势", "年轻乳腺癌患者选择新辅助治疗的变化趋势", "年轻乳腺癌患者手术方式选择变化趋势"]
  const charts = [...Array(6).fill(null).map(()=> VerticalBarChart), ...Array(6).fill(null).map(()=> DefaultLineChart)]
  const [data, setData] = useState([...Array(5).fill(null).map(()=>({
    labels: yn,
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
  })),
  {
    labels: ["全切","保乳","再造","不详"],
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
  },
  ...trendLabels.map((v)=>({
    labels: years,
    datasets: [
      {
        label: v,
        data: [],
      },
    ],
  })),
  {
    labels: years,
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
  }
  ])

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/diagram/data/draw",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      let _data = []
      // 统计是否化疗、放疗、新辅
      for (let item of ['shhl', 'shfl', 'xfzzl', 'shnfmzl', 'shbxzl']) {
        let count1 = new Array(2).fill(0);
        let count2 = new Array(2).fill(0);
        let count3 = new Array(2).fill(0);
        response.data.forEach((obj) => {

          let Idx = obj[item] === '是' ? 0 : 1;
          count1[Idx] = count1[Idx] + (obj.age <= 25)
          count2[Idx] = count2[Idx] + (obj.age > 25 && obj.age <= 30)
          count3[Idx] = count3[Idx] + (obj.age > 30)
        });
        _data.push({
          labels: yn,
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

      // 手术方式
      let count1 = new Array(3).fill(0);
      let count2 = new Array(3).fill(0);
      let count3 = new Array(3).fill(0);
      response.data.forEach((obj) => {  // 统计手术方式
        let tmp = 0;
        if (obj.ssfs == '全切') {
          tmp = 0;
        }
        else if (obj.ssfs == '保乳') {
          tmp = 1;
        }
        else if (obj.ssfs == '再造'){
          tmp = 2;
        } else{
          tmp = 3
        }
        let Idx = tmp;
        count1[Idx] = count1[Idx] + (obj.age <= 25)
        count2[Idx] = count2[Idx] + (obj.age > 25 && obj.age <= 30)
        count3[Idx] = count3[Idx] + (obj.age > 30)
      });
      _data.push(
        {
          labels: ["全切","保乳","再造","不详"],
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
        }
      )

      // 变化趋势
      let trendsArr = ['shhl', 'shfl', 'shbxzl','shnfmzl', 'xfzzl']
      for (let i=0; i<trendsArr.length; i++){
        let item = trendsArr[i]
        let moleCounts = new Array(16).fill(0);
        let totalnum = new Array(16).fill(0);
        response.data.forEach((obj) => {
          let d = new Date(obj.ssrq)
          let times = d.getFullYear();
          let tmp = -1;
          let t = -1;
          if (times % 2006 < 16) {
            t = times % 2006;
            if (obj[item] === '是') {
              tmp = t;
            };
          }
          totalnum[t] += 1;
          let Idx = tmp;
          moleCounts[Idx] = moleCounts[Idx] ? moleCounts[Idx] + 1 : 1;
  
        });
        //console.log("num",totalnum);
        for (let i = 0; i < moleCounts.length; i++) {
          moleCounts[i] = (moleCounts[i] / totalnum[i]) * 100;
        }

        _data.push({
          labels: years,
          datasets: [
            {
              label: trendLabels[i],
              data: moleCounts,
              color: 'green'
            },
  
          ],
        })
      }

      let bcs = new Array(16).fill(0); //保乳
      let rs = new Array(16).fill(0);//再造
      let mast = new Array(16).fill(0);//全切

      let totalnum = new Array(17).fill(0);
      response.data.forEach((obj) => {
        let d = new Date(obj.ssrq)
        let times = d.getFullYear();
        let t = -1;
        if (times % 2006 < 16) {
          t = times % 2006;

        }

        totalnum[t] += 1;
        let Idx = t;
        mast[Idx] = mast[Idx] + (obj.ssfs === '全切');
        bcs[Idx] = bcs[Idx] + (obj.ssfs === '保乳');
        rs[Idx] = rs[Idx] + (obj.ssfs === '再造');

      });
      for (let i = 0; i < mast.length; i++) {
        mast[i] = (mast[i] / totalnum[i]) * 100;
        bcs[i] = (bcs[i] / totalnum[i]) * 100;
        rs[i] = (rs[i] / totalnum[i]) * 100;
      }
      _data.push({
        labels: years,
        datasets: [
          {
            label: "全切",
            data: mast,
            color: "yellow",

          },
          {
            label: "保乳",
            data: bcs,
            color: "dark",
          },
          {
            label: "再造",
            data: rs,
            color: "green"
          }
        ],
      })

      setData(_data)
    });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={1}>
        {
          data.map((v, i) => (
            <Grid item xs={3} sm={widths[i]} key={i}>
              <SoftBox mb={0}>
                {charts[i]({ title: titles[i], chart: v, height: '19rem' })}
              </SoftBox>
            </Grid>
          ))
        }

      </Grid>
    </DashboardLayout>
  );
}

export default TreatmentChartView