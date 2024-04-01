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


const PopulationChartView = () => {
    const years = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022']
    const titles = ["病人年龄扇形图", "年龄逐年占比", "逐年年轻患者数量", '每年新发乳腺癌患者数量']
    const charts = [PieChart, DefaultLineChart, VerticalBarChart, VerticalBarChart]
    const [data, setData] = useState([{
        labels: ["0-25", "26-30", "31-35", "36-40", "41-65", ">65", "unknown"],
        datasets: {
          label: "# of Votes",
          data: [],
        },
      },{
        labels: years,
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
      },{
        labels: years,
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
      },
      {
        labels: years,
        datasets: [
          {
            label: "新发患者数量",
            data: [],
          },
        ],
      },
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
            // 统计是否有家族史
            let ageCounts = new Array(11).fill(0);
            let totalnum = 0;
            response.data.forEach((obj) => {  // 统计年龄分布
              let ageIdx = Math.min(Math.floor(obj.age), 10);  
              let age = Math.floor(obj.age)
              if(age > 0 && age <= 25){
                ageIdx = 0
              }else if(age>25 && age<=30){
                ageIdx = 1
              }else if(age>30 && age<=35) {
                ageIdx = 2
              }else if(age>35 && age<=40){
                ageIdx = 3
              }else if(age>40 && age<=65){
                ageIdx = 4
              }else if(age>40 && age>65){
                ageIdx = 5
              } else{
                ageIdx = 6
              }
              ageCounts[ageIdx] = ageCounts[ageIdx] ? ageCounts[ageIdx] + 1 : 1;
            });

            // 统计年龄逐年占比
            let count1 = new Array(16).fill(0);
            let count2 = new Array(16).fill(0);
            totalnum = new Array(16).fill(0);
            response.data.forEach((obj) => {
                let d = new Date(obj.fbDate)
                let times = d.getFullYear();
                let t = -1;
                if (times % 2006 < 16) {
                t = times % 2006;
                }
                totalnum[t] += 1;
                let Idx = t;
                count1[Idx] = count1[Idx] + (obj.age <= 35);
                count2[Idx] = count2[Idx] + (obj.age <= 40);
            });
            for (let i = 0; i < count1.length; i++) {
                count1[i] = (count1[i] / totalnum[i]) * 100;
                count2[i] = (count2[i] / totalnum[i]) * 100;
            }

            let _data = [{
                labels: ["0-25", "26-30", "31-35", "36-40", "41-65", ">65", "unknown"],
                datasets: {
                    label: "# of Votes",
                    data: ageCounts,
                    backgroundColors: ['olivedrab','yellow', 'green','darkred','darkblue','wheat', 'grey']
                },
            }, {
                labels: years,
                datasets: [
                  {
                    label: "小于35岁患者比例",
                    data: count1,
                    color: "bluet",
                  },
                  {
                    label: "小于40岁患者比例",
                    data: count2,
                    color: "lightred",
                  }
                ],
              }, ]

            //逐年年轻患者数量
            count1 = new Array(16).fill(0);
            count2 = new Array(16).fill(0);
            response.data.forEach((obj) => {
            let d = new Date(obj.fbDate)
            let times = d.getFullYear();
            let t = -1;
            if (times % 2006 < 16) {
                t = times % 2006;
            }
    
            let Idx = t;
            count1[Idx] = count1[Idx] + (obj.age <= 35);
            count2[Idx] = count2[Idx] + (obj.age <= 40);
            });
            _data.push({
                labels: years,
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
              })

            //新发患者数量
            count1 = new Array(16).fill(0);
            response.data.forEach((obj) => {
            let d = new Date(obj.fbDate)
            let times = d.getFullYear();
            //console.log("time:",times%2006)
            let t = -1;
            if (times % 2006 < 16) {
                t = times % 2006;
            }
            let Idx = t;
            count1[Idx] = count1[Idx] ? count1[Idx] + 1 : 1;
            });
            _data.push({
                labels: years,
                datasets: [
                  {
                    label: "新发患者数量",
                    data: count1,
                    color: "cadetblue",
                  },
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
                    data.map((v,i) => (
                        <Grid item xs={8} sm={6} key={i}>
                        <SoftBox mb={0}>
                            {charts[i]({title: titles[i], chart: v, height: 225})}
                        </SoftBox>
                        </Grid>
                    ))
                }

            </Grid>
        </DashboardLayout>
    );
}

export default PopulationChartView