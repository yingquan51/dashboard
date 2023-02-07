import { useMemo, useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import CollapseTables from "./components/CollapseTables";
import { allSheetNames } from "./columns/allTables";
import axios from "axios";
import { patientColumns } from "./columns/patientColumnCells";
import FormTable from "./components/FormTable";

function PatientDetailTablesView() {
  const [data, setData] = useState();
  const [patientId, setPatientId] = useState(1);
  const [formTables, setFormTables] = useState(Array(allSheetNames.length).fill("hello world!"));

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
      const { data } = response.data;
      setData(data);

      patientColumns.map((v, i) =>
        tableData[i] = {
          column: v.name,
          row: data["patient_info"][v.field],
        },
      );
      console.log(tableData);
      formTables[0] = FormTable(patientFormTableArgs);
      console.log(formTables);
    });
  }, []);

  const tableData = [];

  const patientFormTableArgs = {
    name: "患者基本信息",
    message: "patient",
    data: tableData,
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox my={3}>
        {
          CollapseTables(
            allSheetNames,
            formTables)
        }
      </SoftBox>
    </DashboardLayout>
  );
}

export default PatientDetailTablesView;
