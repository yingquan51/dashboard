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
import patientColumns from "./columns/patientColumns";

function DataTableView() {
  // const data = useMemo(() => dataTableData.rows, [dataTableData]);

  // 分页相关
  const [curPage, setCurPage] = useState(1);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const entriesPerPage = { defaultValue: 10, entries: [5, 10, 15, 20, 25] };
  const isSorted = true;
  const noEndBorder = false;

  const tableInstance = useTable(
    { columns: patientColumns, data, initialState: { pageIndex: 0, pageSize: 10 } },
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

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    //console.log(admin, password);
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/api/info/get",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      console.log(response);
      const { data, total } = response.data;
      setData(data);
      setTotal(total);
    });
  }, []);

  const handleChange = (event, value) => {
    console.log("goto:", value);
    gotoPage(value - 1);  // react-table的分页从0开始，mui的分页从1开始
    setCurPage(value);
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
        {/*<SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>*/}
        {/*  <SoftButton variant="gradient" color="info">*/}
        {/*    new table*/}
        {/*  </SoftButton>*/}
        {/*  <SoftBox display="flex">*/}
        {/*    <SoftButton variant={menu ? "contained" : "outlined"} color="dark" onClick={openMenu}>*/}
        {/*      filters&nbsp;*/}
        {/*      <Icon>keyboard_arrow_down</Icon>*/}
        {/*    </SoftButton>*/}
        {/*    {renderMenu}*/}
        {/*    <SoftBox ml={1}>*/}
        {/*      <SoftButton variant="outlined" color="dark">*/}
        {/*        <Icon>description</Icon>*/}
        {/*        &nbsp;export csv*/}
        {/*      </SoftButton>*/}
        {/*    </SoftBox>*/}
        {/*  </SoftBox>*/}
        {/*</SoftBox>*/}
        <Card>
          <TableContainer sx={{ boxShadow: "none" }}>
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
      </SoftBox>
    </DashboardLayout>
  );
}

export default DataTableView;
