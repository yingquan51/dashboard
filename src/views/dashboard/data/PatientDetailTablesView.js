import { useMemo, useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import CollapseTables from "./components/CollapseTables";
import { allSheetNames, allTables } from "./columns/allTables";
import axios from "axios";
import FormTableCard from "./components/FormTableCard";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";

function PatientDetailTablesView() {
  const [data, setData] = useState([]);
  const [patientId, setPatientId] = useState(5);
  const [patientZyId, setPatientZyId] = useState(657);
  const [contents, setContents] = useState([]);

  useEffect(() => {
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/patient/zyinfo",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
      params: {
        "zyid": patientZyId,
      },
    }).then(response => {
      console.log(response);
      const { data } = response.data;
      setData(data);

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
            curTableData = [curTableData]
          }

          curTableData.map((v, i) => {
            for (let i = 0; i < Math.min(fields.length, columns.length); i++) {
              tableData[i] = {
                column: columns[i],
                row: (v || [])[fields[i]] || "",
              };
            }
            content.push(
              <ListItemButton sx={{ pl: 4 }} key={index}>
                {FormTableCard({ name: tableName, message: name, data: tableData })}
              </ListItemButton>,
            );
          });


        });
        contents.push(<List component="div" disablePadding>{content}</List>);
      });
    });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox my={3}>
        {
          CollapseTables(
            allSheetNames,
            contents)
        }
      </SoftBox>
    </DashboardLayout>
  );
}

export default PatientDetailTablesView;
