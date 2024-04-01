import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import SoftBox from "../../../components/SoftBox";
import Grid from "@mui/material/Grid";
import { Form, Formik } from "formik";
import Card from "@mui/material/Card";
import SoftButton from "../../../components/SoftButton";
import * as Yup from "yup";
import SoftTypography from "../../../components/SoftTypography";
import CollapseTables from "./components/CollapseTables";
import { allSheetNames, allTables, getFormField } from "./columns/allTables";
import { useEffect, useState } from "react";
import axios from "axios";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { object } from "prop-types";

const handleSubmit = (api, navigate) =>
  async (v) => {
    console.log(v);
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    if(api === "photo"){  //上传文件
      const formData = new FormData();
      v['name'] = []
      for(let item of v['photo']){
        formData.append(item.name, item)
        v['name'].push(item.name)
      }
      v['name'] = v['name'].join(",")
      console.log(v['name'])
      axios({
        method: "POST",
        url: "/patient/" + api,
        headers: {
          "x-session-token": localStorage.getItem("token"),
          'Content-Type': 'multipart/form-data',
        },
        params: v,
        data: formData,
      }).then(response => {
        console.log(response);
        //console.log(typeof(response.status))
        if (response.data.status === 200) {
          Swal.fire("上传成功", response.data.message, "success");  // 
          //localStorage.setItem("token", response.data.token);
          localStorage.setItem("tokenExpiredTime", new Date().getTime() + response.data.expire * 60 * 1000);  // 更新token持续时间
          console.log(localStorage.getItem("tokenExpiredTime"));
          navigate("/upload/patientUploadTable");
          // navigate("/data/table");
          //window.location.reload();
  
        }
        else {
          Swal.fire("上传失败", "请检查所填信息是否正确并重新填写 ", "warning");
          localStorage.setItem("tokenExpiredTime", new Date().getTime() + response.data.expire * 60 * 1000);  // 更新token持续时间
        }
      });
    }else{
      let _v =  JSON.parse(JSON.stringify(v))
      Object.keys(_v).forEach(key => {
        if(typeof _v[key] === "object"){
          _v[key] = JSON.stringify(_v[key])
        }
      });
      axios({  // 上传参数
        method: "POST",
        url: "/patient/" + api,
        headers: {
          "x-session-token": localStorage.getItem("token"),
        },
        params: _v,
        //data: v,
  
      }).then(response => {
        console.log(response);
        //console.log(typeof(response.status))
        if (response.data.status === 200) {
          Swal.fire("上传成功", response.data.message, "success");  // 
          //localStorage.setItem("token", response.data.token);
          localStorage.setItem("tokenExpiredTime", new Date().getTime() + response.data.expire * 60 * 1000);  // 更新token持续时间
          console.log(localStorage.getItem("tokenExpiredTime"));
          navigate("/upload/patientUploadTable");
          // navigate("/data/table");
          //window.location.reload();
  
        }
        else {
          Swal.fire("上传失败", "请检查所填信息是否正确并重新填写 ", "warning");
          localStorage.setItem("tokenExpiredTime", new Date().getTime() + response.data.expire * 60 * 1000);  // 更新token持续时间
        }
      });
    }
  };






const getContent = (tableData, navigate) => {
  const { name, api, fields, columns, validations, functions, params } = tableData.uploadParams;
  const initialValues = {}, validationsObj = {};
  fields.map((v, i) => {
    if(v==="photo"){
      initialValues[v] = [];
    } else{
      initialValues[v] = "";
    }
    validationsObj[v] = validations[i];
  });
  initialValues["bhzyid"] = "";
  initialValues["hxzyid"] = "";
  validationsObj["bhzyid"] = Yup.number().positive("住院号是正数").integer("请输入数字");
  validationsObj["hxzyid"] = Yup.number().positive("住院号是正数").integer("请输入数字");
  const validationSchema = Yup.object(validationsObj);

  return (
    <SoftBox py={3} ml={-1} >
      <Grid container justifyContent="center" sx={{ height: "100%", overflow: 'visible'  }}>
        <Grid item xs={8} lg={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit(api, navigate)}
          >
            {({ values, errors, touched, isSubmitting }) => (
              <Form autoComplete="off">
                <Card sx={{ height: "100%", overflow: 'visible' }}>
                  <SoftBox p={2}>
                    <SoftBox>
                      <SoftBox>
                        <SoftBox lineHeight={0}>
                          <SoftTypography variant="h5" fontWeight="bold">
                            {name}
                          </SoftTypography>
                        </SoftBox>
                        <SoftBox mt={1.625}>
                          <Grid container spacing={1}>
                            {
                              getFormField(values, errors, touched, 0, "住院号", "bhzyid", "例如：123", (v) => false)
                            }
                            {/*
                              getFormField(values, errors, touched, 0, "河西住院号", "hxzyid", "例如：123", (v) => false)
                          */}
                            {
                              fields.map((v, i) => {
                                //console.log(v);
                                return functions[i](values, errors, touched, i, columns[i], fields[i], ...params[i]);
                              })
                            }
                          </Grid>
                        </SoftBox>
                      </SoftBox>
                      <SoftBox mt={2} width="100%" display="flex" justifyContent="space-between">
                        <SoftButton
                          disabled={isSubmitting}
                          type="submit"
                          variant="gradient"
                          color="dark"
                        >
                          {"上传"}
                        </SoftButton>
                      </SoftBox>
                    </SoftBox>
                  </SoftBox>
                </Card>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </SoftBox>);
};

function PatientUploadTableView() {
  const navigate = useNavigate();
  const location = useLocation();
  const [contents, setContents] = useState([]);
  const [idx, setIdx] = useState(-1)
  useEffect(() => {
    const newContents = [];
    allSheetNames.forEach((sheetName) => {
      const sheet = allTables[sheetName];
      const tableNames = Object.keys(sheet);
      const content = [];
      const {hash, pathname} = location // hash用来接受具体要跳转到哪个表格
      if(hash){
        setIdx(Number(hash.split("#")[1])) // idx用来给CollapseTables传参数
      }
      tableNames.forEach((tableName, index) => {
        const tableData = sheet[tableName];
        content.push(
          <ListItemButton sx={{ pl: 4 }} key={index}>
            {getContent(tableData, navigate)}
          </ListItemButton>,
        );
      });
      newContents.push(<List component="div" disablePadding>{content}</List>);
    });
    setContents(newContents);
  }, [location]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {
        CollapseTables(
          "病人信息录入",
          allSheetNames,
          contents,
          idx)
      }
    </DashboardLayout>
  );
}

export default PatientUploadTableView;