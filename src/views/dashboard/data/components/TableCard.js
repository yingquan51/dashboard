import { useEffect, useState } from "react";
import { useAsyncDebounce, useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";
import SoftTypography from "../../../../components/SoftTypography";
import SoftBox from "../../../../components/SoftBox";
import Card from "@mui/material/Card";
import TableContainer from "@mui/material/TableContainer";
import SoftSelect from "../../../../components/SoftSelect";
import SoftInput from "../../../../components/SoftInput";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import DataTableHeadCell from "../../../../examples/Tables/DataTable/DataTableHeadCell";
import TableBody from "@mui/material/TableBody";
import DataTableBodyCell from "../../../../examples/Tables/DataTable/DataTableBodyCell";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import SoftButton from "../../../../components/SoftButton";
import { Icon } from "@mui/material";
import ImportExcelButton from "./ImportExcelButton";
import PatientDetailTablesView from "../PatientDetailTablesView";

import { useNavigate } from 'react-router-dom';


/**
 *
 * @param columns 列名
 * @param data 数据(所有)
 * @param total 数据数量
 * @returns {JSX.Element}
 * @constructor
 */
export default function TableCard(tableName, columns, data) {
  
  const total = data.length;
  const navigate = useNavigate();
  // 分页相关
  const [curPage, setCurPage] = useState(1);

  const entriesPerPage = { defaultValue: 10, entries: [5, 10, 15, 20, 25] };
  const isSorted = true;
  const noEndBorder = false;

  const tableInstance = useTable(
    { columns: columns, data: data, initialState: { pageIndex: 0, pageSize: 10 } },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    setGlobalFilter,
    pageCount,
    gotoPage,
    setPageSize,
    state: { globalFilter, pageSize },
  } = tableInstance;

  const entriesStart = (curPage - 1) * pageSize + 1;
  const entriesEnd = (curPage) * pageSize > total ? total : (curPage) * pageSize;

  const handleChange = (event, value) => {
    console.log("goto:", value);
    gotoPage(value - 1);  // react-table的分页从0开始，mui的分页从1开始
    setCurPage(value);
  };

  const handleDetailPage = (bh,hx) => {
    console.log('jump');
    //console.log(hx)
    //window.location.href = "/data/patientDetailTables"
    //V5之前是history.push，V6是navigate.push，V7之后是navigate()
    navigate('/data/patientDetailTables', { state: { bhzyid: bh, hxzyid: hx } });

  };

  const setEntriesPerPage = ({ value }) => {
    console.log("set per page :", value);
    setPageSize(value);
  };

  //  local search
  const [search, setSearch] = useState(globalFilter);
  const onSearchChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 100);

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
    <Card>
      <TableContainer sx={{ boxShadow: "none" }}>
        <Grid container justifyContent="center" mt={2} >
          <SoftTypography variant="h3" fontWeight="bold">
            {tableName}
          </SoftTypography>
        </Grid>
        <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          {<SoftBox display="flex" alignItems="center">
            <SoftSelect
              defaultValue={{ value: entriesPerPage.defaultValue, label: entriesPerPage.defaultValue }}
              options={entriesPerPage.entries.map((entry) => ({ value: entry, label: entry }))}
              onChange={setEntriesPerPage}
              size="small"
            />
            <SoftTypography variant="caption" color="secondary">
              &nbsp;&nbsp;每页数量
            </SoftTypography>
          </SoftBox>}
          <SoftBox width="12rem" ml="auto">
            <SoftInput
              placeholder="搜索..."
              value={search}
              onChange={({ currentTarget }) => {
                setSearch(search);
                onSearchChange(currentTarget.value);
              }}
            />
          </SoftBox>
          {/*{ImportExcelButton()}*/}
        </SoftBox>


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
                <TableRow key={key} {...row.getRowProps()} onDoubleClick={() => {
                  handleDetailPage(row.cells[3]['value'], row.cells[4]['value'])
                }}>
                  {row.cells.map((cell, key) => (
                    <DataTableBodyCell
                      key={key}
                      noBorder={noEndBorder && rows.length - 1 === key}
                      align={cell.column.align ? cell.column.align : "left"}

                      {...cell.getCellProps()}
                    >
                      {/*console.log(row.cells[3]['value'])*/}
                      {/*console.log(row.cells[4]['value'])*/}
                      {cell.render("Cell")}
                    </DataTableBodyCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {<SoftBox
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          p={3}
        >
          <SoftBox mb={{ xs: 3, sm: 0 }}>
            <SoftTypography variant="button" color="secondary" fontWeight="regular">
              展示第 {entriesStart} 到 {entriesEnd} 条数据（共 {total} 条）
            </SoftTypography>
          </SoftBox>
          <Pagination
            count={pageCount}
            color="secondary"
            circular="true"
            page={curPage}
            onChange={handleChange}
            showFirstButton={true}
            showLastButton={true}
          />
        </SoftBox>}
      </TableContainer>
    </Card>
  );
}