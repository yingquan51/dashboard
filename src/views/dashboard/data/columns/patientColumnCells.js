/* eslint-disable react/prop-types */
import { getColumnCells } from "./util";
import allColumns from "./allColumns";
import { allTables } from "./allTables"

const sheetName = allTables[Object.keys(allTables)[0]];
const tableIndex = sheetName[Object.keys(sheetName)[0]];

const patientColumns = allColumns.slice(tableIndex[0]-1, tableIndex[1]-1);
const patientColumnCells = getColumnCells(patientColumns);

export {
  patientColumns,
  patientColumnCells,
}