import { useMemo, useEffect, useState } from "react";
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce, useSortBy } from "react-table";

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
import Pagination from '@mui/material/Pagination';

// Data
import dataTableData from "./dataTableData";

function DataTableView() {

  const columns = useMemo(() => dataTableData.columns, [dataTableData]);
  const data = useMemo(() => dataTableData.rows, [dataTableData]);

  // 分页相关
  const [curPage, setCurPage] = useState(1);
  const [PageSize, setPageSize] = useState(10);

  const totalEntries  = 100;
  const entriesStart  = (curPage - 1) * PageSize + 1;
  const entriesEnd = (curPage) * PageSize > totalEntries ? totalEntries : (curPage) * PageSize;
  
  const handleChange = (event, value) => {
    console.log('goto:', value)
    setCurPage(value);
  };


  const entriesPerPage = { defaultValue: 10, entries: [5, 10, 15, 20, 25] };
  const isSorted =  true;
  const noEndBorder =  false;

  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize:PageSize} },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    setGlobalFilter,
    state: { globalFilter},
  } = tableInstance;


  const setEntriesPerPage = ({ value }) => {
    console.log('set per page :', value);
    setPageSize(value);
  }

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


  const [menu, setMenu] = useState(null);
  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);
  const renderMenu = (
    <Menu
      anchorEl={menu}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={Boolean(menu)}
      onClose={closeMenu}
      keepMounted
    >
      <MenuItem onClick={closeMenu}>Status: Paid</MenuItem>
      <MenuItem onClick={closeMenu}>Status: Refunded</MenuItem>
      <MenuItem onClick={closeMenu}>Status: Canceled</MenuItem>
      <Divider sx={{ margin: "0.5rem 0" }} />
      <MenuItem onClick={closeMenu}>
        <SoftTypography variant="button" color="error" fontWeight="regular">
          Remove Filter
        </SoftTypography>
      </MenuItem>
    </Menu>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox my={3}>
        <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <SoftButton variant="gradient" color="info">
            new data
          </SoftButton>
          <SoftBox display="flex">
            <SoftButton variant={menu ? "contained" : "outlined"} color="dark" onClick={openMenu}>
              filters&nbsp;
              <Icon>keyboard_arrow_down</Icon>
            </SoftButton>
            {renderMenu}
            <SoftBox ml={1}>
              <SoftButton variant="outlined" color="dark">
                <Icon>description</Icon>
                &nbsp;export csv
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </SoftBox>
        <Card>
        <TableContainer sx={{ boxShadow: "none" }}>
        <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            { <SoftBox display="flex" alignItems="center">
              <SoftSelect
                defaultValue={{ value: entriesPerPage.defaultValue, label: entriesPerPage.defaultValue }}
                options={entriesPerPage.entries.map((entry) => ({ value: entry, label: entry }))}
                onChange={setEntriesPerPage}
                size="small"
              />
              <SoftTypography variant="caption" color="secondary">
                &nbsp;&nbsp;entries per page
              </SoftTypography>
            </SoftBox>}
            <SoftBox width="12rem" ml="auto">
              <SoftInput
                placeholder="Search..."
                value={search}
                onChange={({ currentTarget }) => {
                  setSearch(search);
                  onSearchChange(currentTarget.value);
                }}
              />
            </SoftBox>
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

      { <SoftBox
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        p={3}
      >
          <SoftBox mb={{ xs: 3, sm: 0 }}>
            <SoftTypography variant="button" color="secondary" fontWeight="regular">
              Showing {entriesStart} to {entriesEnd} of {totalEntries} entries
            </SoftTypography>
          </SoftBox>
          <Pagination  count={100}  color="secondary" circular="true" page={curPage} onChange={handleChange} />
      </SoftBox>}
    </TableContainer>
        </Card>
      </SoftBox>
    </DashboardLayout>
  );
}

export default DataTableView;
