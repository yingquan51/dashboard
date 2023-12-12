import SoftBox from "../../../components/SoftBox";
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import TableCard from "./components/TableCard";
import { getIdCell, getDefaultCell } from "./columns/util";
import { allSheetNames, allTables, sampleStoreInfo, sampleUseInfo } from "./columns/allTables";
import { useEffect, useState } from "react";

const columns = [
  {
    Header: "序号",
    accessor: "id",
    Cell: getIdCell,
  },
  {
    Header: "字段",
    accessor: "name",
    Cell: getDefaultCell,
  },
  {
    Header: "Field",
    accessor: "field",
    Cell: getDefaultCell,
  },
  // {
  //   Header: "备注",
  //   accessor: "message",
  //   Cell: getDefaultCell,
  // },
];

const getRows = (fields, names, messages) => {
  let rows = [], count = 1;
  for (let i = 0; i < names.length; i++) {
    rows[i] = {
      id: count++,
      name: names[i],
      field: i >= fields.length ? "" : fields[i],
      // message: messages[i],
    };
  }
  return rows;
};

function AllColumnsView() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {
        allSheetNames.map((sheetName) => {
          const sheet = allTables[sheetName];
          const tableNames = Object.keys(sheet);
          return tableNames.map((tableName, index) => {
            const rows = getRows(sheet[tableName]["fields"], sheet[tableName]["columns"], []);
            return (
              <SoftBox my={3} key={index}>
                {TableCard(tableName || "", columns, rows)}
              </SoftBox>
            );
          });
        })
      }
    </DashboardLayout>
  )
    ;
}

export default AllColumnsView;