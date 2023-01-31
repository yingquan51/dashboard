/* eslint-disable react/prop-types */
import getCell from "./getCell";

const patientReappearColumns = [
  {
    Header: "编号",
    accessor: "",
    Cell: getCell,
  },
  {
    Header: "病案号",
    accessor: "",
    Cell: getCell,
  },
  {
    Header: "复发日期",
    accessor: "",
    Cell: getCell,
  },
  {
    Header: "复发位置编号",
    accessor: "",
    Cell: getCell,
  },
];

export default patientReappearColumns;