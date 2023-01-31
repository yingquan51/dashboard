/* eslint-disable react/prop-types */
import getCell from "./getCell";

const surgicalInformationColumns = [
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
    Header: "手术日期",
    accessor: "",
    Cell: getCell,
  },
  {
    Header: "手术方式",
    accessor: "",
    Cell: getCell,
  },
  {
    Header: "腋窝淋巴结清扫方式",
    accessor: "",
    Cell: getCell,
  },
];

export default surgicalInformationColumns;