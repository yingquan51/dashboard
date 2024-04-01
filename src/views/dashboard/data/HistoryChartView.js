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


const HistoryChartView = () => {
    const titles = ["家族史扇形图", "生育史扇形图", "妊娠次数柱形图", "生产次数柱形图","流产次数柱形图"]
    const charts = [PieChart, PieChart, VerticalBarChart, VerticalBarChart, VerticalBarChart]
    const [data, setData] = useState([{
        labels: ["是", "否"],
        datasets: {
          label: "# of Votes",
          data: [],
        },
      },{
        labels: ["是", "否"],
        datasets: {
          label: "# of Votes",
          data: [],
        },
      },{
        labels: ["0", "1", "2", "3", "≥4"],
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
      },{
        labels: ["0", "1", "2", "3", "≥4"],
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
      },{
        labels: ["0", "1", "2", "3", "≥4"],
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
      },])

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
            const familyCounts = new Array(2).fill(0);
            let totalnum = 0;

            response.data.forEach((obj) => {
                totalnum += 1;
                let familyIdx = obj.family == '是' ? 0 : 1;
                familyCounts[familyIdx] = familyCounts[familyIdx] ? familyCounts[familyIdx] + 1 : 1;
            });
            for (var i = 0; i < familyCounts.length; i++) {
                familyCounts[i] = (familyCounts[i] / totalnum) * 100;
            }
            // 统计是否生育
            const proCounts = new Array(2).fill(0);
            totalnum = 0;
            response.data.forEach((obj) => {
                totalnum += 1;
                let proIdx = obj.sy == '是' ? 0 : 1;
                proCounts[proIdx] = proCounts[proIdx] ? proCounts[proIdx] + 1 : 1;
            });
            for (var i = 0; i < proCounts.length; i++) {
                proCounts[i] = (proCounts[i] / totalnum) * 100;
            }

            let _data = [{
                labels: ["是", "否"],
                datasets: {
                    label: "# of Votes",
                    data: familyCounts,
                },
            }, {
                labels: ["是", "否"],
                datasets: {
                    label: "# of Votes",
                    data: proCounts,
                },
            }]

            // 统计妊娠次数, 生产次数和流产次数
            for (let item of ['hycs', 'zyc', 'lczcs']){
                let count1 = new Array(5).fill(0);
                let count2 = new Array(5).fill(0);
                let count3 = new Array(5).fill(0);
                totalnum = 0;
                response.data.forEach((obj) => {  
                    totalnum += 1;
                    let gesIdx = Math.min(Math.floor(obj[item] / 1), 4);
                    count1[gesIdx] = count1[gesIdx] + (obj.age <= 25)
                    count2[gesIdx] = count2[gesIdx] + (obj.age > 25 && obj.age <= 30)
                    count3[gesIdx] = count3[gesIdx] + (obj.age > 30)
                })
                _data.push({
                    labels: ["0", "1", "2", "3", "≥4"],
                    datasets: [
                        {
                            label: "<=25",
                            data: count1,
                            color: 'yellow'
                        },
                        {
                            label: "25-30",
                            data: count2,
                            color: '#9c9370'
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
                    data.map((v,i) => (
                        <Grid item xs={8} sm={4} key={i}>
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

export default HistoryChartView