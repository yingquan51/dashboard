import { usePagination, useSortBy, useTable } from "react-table";
import Card from "@mui/material/Card";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import SoftBox from "../../../../components/SoftBox";
import TableRow from "@mui/material/TableRow";
import DataTableHeadCell from "../../../../examples/Tables/DataTable/DataTableHeadCell";
import TableBody from "@mui/material/TableBody";
import DataTableBodyCell from "../../../../examples/Tables/DataTable/DataTableBodyCell";

/**
 *
 * @param columns 列名
 * @param data 数据
 * @returns {JSX.Element}
 * @constructor
 */
export default function SimpleTableCard(columns, data) {
  const isSorted = true;
  const noEndBorder = false;
  const table = useTable({ columns: columns, data: data }
    , useSortBy, usePagination);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
  } = table;
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
