import { useMemo, useEffect, useState } from "react";
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce, useSortBy } from "react-table";
import axios from "axios";

import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import SoftSelect from "components/SoftSelect";
import SoftInput from "components/SoftInput";
import DataTableHeadCell from "examples/Tables/DataTable/DataTableHeadCell";
import DataTableBodyCell from "examples/Tables/DataTable/DataTableBodyCell";
import Pagination from "@mui/material/Pagination";

// Data
import patientPathologicalColumns from "./columns/patientPathologicalColumns";
import assistCureColumns from "./columns/assistCureColumns";
import patientFollowColumns from "./columns/patientFollowColumns";
import relapseInformationColumns from "./columns/relapseInformationColumns";
import patientReappearColumns from "./columns/patientReappearColumns";
import sysPlaceColumns from "./columns/sysPlaceColumns";
import surgicalInformationColumns from "./columns/surgicalInformationColumns";
import postoperativeTreatmentColumns from "./columns/postoperativeTreatmentColumns";
import sysTreatmentColumns from "./columns/sysTreatmentColumns";

function PatientDetailTablesView() {
  // const data = useMemo(() => dataTableData.rows, [dataTableData]);
  const [data, setData] = useState([]);
  const isSorted = true;
  const noEndBorder = false;

  const getTableCard = (columns) => {
    const table = useTable({ columns: columns, data }
      , useSortBy, usePagination);
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      rows,
      page,
    } = table;
    return (<Card>
      <TableContainer sx={{ boxShadow: "none" }}>
        <Table {...getTableProps()}>
          <SoftBox component="thead">
            {headerGroups.map((headerGroup, key) => (
              <TableRow key={key} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, key) => (
                  <DataTableHeadCell
                    key={key}
                    {...column.getHeaderProps(isSorted && column.getSortByToggleProps())}
                    width={column.width ? column.width : "auto"}
                    align={column.align ? column.align : "left"}
                    sorted={setSortedValue(column)}
                  >
                    {column.render("Header")}
                  </DataTableHeadCell>
                ))}
              </TableRow>
            ))}
          </SoftBox>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, key) => {
              prepareRow(row);
              return (
                <TableRow key={key} {...row.getRowProps()}>
                  {row.cells.map((cell, key) => (
                    <DataTableBodyCell
                      key={key}
                      noBorder={noEndBorder && rows.length - 1 === key}
                      align={cell.column.align ? cell.column.align : "left"}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </DataTableBodyCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>);
  };

  // sort
  const setSortedValue = (column) => {
    let sortedValue;
    if (isSorted && column.isSorted) {
      sortedValue = column.isSortedDesc ? "desc" : "asce";
    } else if (isSorted) {
      sortedValue = "none";
    } else {
      sortedValue = false;
    }
    return sortedValue;
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox my={3}>
        {getTableCard(patientPathologicalColumns)}&nbsp;
        {getTableCard(assistCureColumns)}&nbsp;
        {getTableCard(patientFollowColumns)}&nbsp;
        {getTableCard(relapseInformationColumns)}&nbsp;
        {getTableCard(patientReappearColumns)}&nbsp;
        {getTableCard(sysPlaceColumns)}&nbsp;
        {getTableCard(surgicalInformationColumns)}&nbsp;
        {getTableCard(postoperativeTreatmentColumns)}&nbsp;
        {getTableCard(sysTreatmentColumns)}&nbsp;
      </SoftBox>
    </DashboardLayout>
  );
}

export default PatientDetailTablesView;
