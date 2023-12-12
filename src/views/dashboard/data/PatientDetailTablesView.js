import { useMemo, useEffect, useState, memo } from "react";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import CollapseTables from "./components/CollapseTables";
import { allSheetNames, allTables } from "./columns/allTables";
import axios from "axios";
import FormTableCard from "./components/FormTableCard";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import SoftInput from "../../../components/SoftInput";
import SoftButton from "../../../components/SoftButton";

//导出病人信息为Excel
import ExportJsonExcel from "js-export-excel"

//跨页面传参
import { useLocation } from 'react-router-dom'






function PatientDetailTablesView() {
  const state = useLocation()
  //console.log("state", state.state.hxzyid)
  //console.log("state", state.state);
  // const bh = state.state.bhzyid;
  // const hx = state.state.hxzyid;
  var bh = 1;
  var hx = 1;
  if (state.state !== null) {
    bh = state.state.bhzyid;
    hx = state.state.hxzyid;
    
  };
  
  const [data, setData] = useState([]);
  const [patientId, setPatientId] = useState(1006);
  const [patientBhZyId, setPatientBhZyId] = bh ? useState(bh) : useState(1);
  const [patientHxZyId, setPatientHxZyId] = hx ? useState(hx) : useState(1);
  const [contents, setContents] = useState([]);

  //提交后，获取住院号，提交给后端
  const handleSubmit = (values) => {

    setPatientBhZyId(values.patientBhZyId);
    setPatientHxZyId(values.patientHxZyId);
  };




  const handleExportCurrentExcel = () => { //后端返回的data数组
    var num = 0;
    let option = {};
    option.fileName = '病人详细信息';
    const content = [];
    allSheetNames.forEach((sheetName) => {
      const sheet = allTables[sheetName];
      const tableNames = Object.keys(sheet);


      tableNames.forEach((tableName, index) => {
        const name = sheet[tableName]["name"];//表名
        const fields = sheet[tableName]["fields"];//各表列名(英文缩写)
        const columns = sheet[tableName]["columns"];//各表列名(中文)

        const tableData = [];
        let curTableData = (data || [])[name];  // 当前表格数据，可能包含多张表格的数据，所以接下来需要遍历
        if (!Array.isArray(curTableData)) {
          curTableData = [curTableData];
        }
        curTableData.map((v, i) => {
          for (let i = 0; i < Math.min(fields.length, columns.length); i++) {
            tableData[i] = {
              column: columns[i],
              row: (v || [])[fields[i]] || "",
            };
          }
        });


        if (data[name] !== null) {
          // option.datas = [
          //   {
          //     sheetData: curTableData,
          //     sheetName: '病人详细信息',
          //     sheetFilter: fields,
          //     sheetHeader: columns,
          //     columnWidths: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
          //   },
          // ];

          content.push(
            {
              sheetData: curTableData,
              sheetName: String(num),
              sheetFilter: fields,
              sheetHeader: columns,
              columnWidths: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
            }
          );
          //console.log("num:", num);
          num += 1;

        }

      });

    });
    option.datas = content;
    var toExcel = new ExportJsonExcel(option); //new
    toExcel.saveExcel(); //保存

  }

  const parseData = (data) => {
    const newContents = [];
    allSheetNames.forEach((sheetName) => {
      const sheet = allTables[sheetName];
      const tableNames = Object.keys(sheet);
      const content = [];
      tableNames.forEach((tableName, index) => {
        const name = sheet[tableName]["name"];
        const fields = sheet[tableName]["fields"];
        const columns = sheet[tableName]["columns"];
        const tableData = [];
        let curTableData = (data || [])[name];  // 当前表格数据，可能包含多张表格的数据，所以接下来需要遍历
        if (!Array.isArray(curTableData)) {
          curTableData = [curTableData];
        }
        curTableData.map((v, i) => {
          for (let i = 0; i < Math.min(fields.length, columns.length); i++) {
            tableData[i] = {
              column: columns[i],
              row: (v || [])[fields[i]] || "",
            };
          }
          //console.log("data:", curTableData)
          content.push(
            <ListItemButton sx={{ pl: 4 }} key={index + " " + i}>
              {FormTableCard({ name: tableName, message: name, data: tableData })}
              {/*console.log("各表数据",tableData)*/}
            </ListItemButton>,
          );
        });
      });
      newContents.push(<List component="div" disablePadding>{content}</List>);
      setContents(newContents);
    });
  };

  useEffect(() => {
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/patient/bhzyinfo",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
      params: {
        "bhzyid": patientBhZyId,
      },
    }).then(response => {
      console.log(response);
      const { data } = response.data ? response.data : {};
      setData(data);
      parseData(data);
    });
  }, [patientBhZyId]);

  useEffect(() => {
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/patient/hxzyinfo",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
      params: {
        "hxzyid": patientHxZyId,
      },
    }).then(response => {
      console.log(response);
      const { data } = response.data ? response.data : {};
      setData(data);
      parseData(data);
    });
  }, [patientHxZyId]);

  useEffect(() => {
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/patient/info",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
      params: {
        "id": patientId,
      },
    }).then(response => {
      console.log(response);
      const { data } = response.data ? response.data : {};
      setData(data);
      parseData(data);
    });
  }, []);
  //{ console.log("内容：", data) }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Formik
        initialValues={{ patientBhZyId: 1, patientHxZyId: 1 }}
        validationSchema={Yup.object({
          patientBhZyId: Yup.number().positive("住院号是正数").integer("请输入数字"),
          patientHxZyId: Yup.number().positive("住院号是正数").integer("请输入数字"),
        })
        }
        onSubmit={handleSubmit}
      >
        <Form>
          <Grid
            container
            columns={{ xs: 12, sm: 12 }}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            width="50%"
           
          >
            <Grid item xs={4} sm={4} m={3}>
              <label htmlFor="patientBhZyId">输入病人滨海住院号：</label>
              <Field id="patientBhZyId" name="patientBhZyId" as={SoftInput} />
              <SoftButton
                type="submit"
                variant="gradient"
              >Submit</SoftButton>
            </Grid>
            <Grid item xs={4} sm={4} m={3}>
              <label htmlFor="patientBhZyId">输入病人河西住院号：</label>
              <Field id="patientHxZyId" name="patientHxZyId" as={SoftInput} />
              {/*<ErrorMessage name="patientBhZyId" />*/}
              <SoftButton
                type="submit"
                variant="gradient"
              >Submit</SoftButton>
            </Grid>
            <Grid item xs={4} sm={4} ml={2}>
              <label >导出病人信息：</label>
              <SoftButton onClick={handleExportCurrentExcel}
                type="button"
                variant="gradient"
              >导出</SoftButton>

            </Grid>
          </Grid>
        </Form>
      </Formik>
      <SoftBox my={3}>
        {
          CollapseTables(
            "病人详情信息",
            allSheetNames,
            contents)

        }
      </SoftBox>
    </DashboardLayout>
  );
}

export default PatientDetailTablesView;
