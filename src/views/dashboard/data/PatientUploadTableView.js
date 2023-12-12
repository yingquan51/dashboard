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
import { useNavigate } from "react-router-dom";

const handleSubmit = (api,navigate) =>
  async (v) => {
    console.log(v);
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "POST",
      url: "/patient/" + api,
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
      params: v,
      //data: v,



    }).then(response => {
      console.log(response);
      //console.log(typeof(response.status))
      if (response.status === 200) {
        Swal.fire("上传成功", "", "success");  // 
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("tokenExpiredTime", new Date().getTime() + response.data.expire * 60 * 1000);
        console.log(localStorage.getItem("tokenExpiredTime"));
        navigate("/data/patientUploadTable");
        // navigate("/data/table");
        //window.location.reload();
        
      }
      else {
        Swal.fire("上传失败", "请检查所填信息是否正确并重新填写 ", "warning");
      }
    });
  };






const getContent = (tableData,navigate) => {
  const { name, api, fields, columns, validations, functions, params } = tableData.uploadParams;
  const initialValues = {}, validationsObj = {};
  fields.map((v, i) => {
    initialValues[v] = "";
    validationsObj[v] = validations[i];
  });
  initialValues["bhzyid"] = "";
  initialValues["hxzyid"] = "";
  validationsObj["bhzyid"] = Yup.number().positive("住院号是正数").integer("请输入数字");
  validationsObj["hxzyid"] = Yup.number().positive("住院号是正数").integer("请输入数字");
  const validationSchema = Yup.object(validationsObj);

  return (
    <SoftBox py={3}>
      <Grid container justifyContent="center" sx={{ height: "100%" }}>
        <Grid item xs={12} lg={8}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit(api,navigate)}
          >
            {({ values, errors, touched, isSubmitting }) => (
              <Form autoComplete="off">
                <Card sx={{ height: "100%" }}>
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
                              getFormField(values, errors, touched, 0, "滨海住院号", "bhzyid", "eg. 123", (v) => false)
                            }
                            {
                              getFormField(values, errors, touched, 0, "河西住院号", "hxzyid", "eg. 123", (v) => false)
                            }
                            {
                              fields.map((v, i) => {
                                // console.log(v);
                                // console.log(functions[i]);
                                // console.log(params[i]);
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
  const [contents, setContents] = useState([]);
  useEffect(() => {
    const newContents = [];
    allSheetNames.forEach((sheetName) => {
      const sheet = allTables[sheetName];
      const tableNames = Object.keys(sheet);
      const content = [];
      tableNames.forEach((tableName, index) => {
        const tableData = sheet[tableName];
        content.push(
          <ListItemButton sx={{ pl: 4 }} key={index}>
            {getContent(tableData,navigate)}
          </ListItemButton>,
        );
      });
      newContents.push(<List component="div" disablePadding>{content}</List>);
    });
    setContents(newContents);
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {
        CollapseTables(
          "上传病人信息",
          allSheetNames,
          contents)
      }
    </DashboardLayout>
  );
}

export default PatientUploadTableView;