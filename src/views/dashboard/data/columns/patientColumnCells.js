/* eslint-disable react/prop-types */
import { getColumnCells } from "./util";
import { allTables, allSheetNames } from "./allTables"


const sheet = allTables[allSheetNames[0]]
const table = sheet[Object.keys(sheet)[0]];
const patientColumns = table.columns;
const patientColumnCells = getColumnCells(patientColumns);
console.log(patientColumnCells);

export {
  patientColumns,
  patientColumnCells,
}