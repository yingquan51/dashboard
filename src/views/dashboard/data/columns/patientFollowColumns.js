/* eslint-disable react/prop-types */
import getCell from "./getCell";

const patientFollowColumns = [
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
    Header: "DFS",
    accessor: "",
    Cell: getCell,
  },
  {
    Header: "二次复发",
    accessor: "",
    Cell: getCell,
  },
  {
    Header: "三次复发",
    accessor: "",
    Cell: getCell,
  },
  {
    Header: "OS",
    accessor: "",
    Cell: getCell,
  },
  {
    Header: "末次复查时间",
    accessor: "",
    Cell: getCell,
  },
  {
    Header: "治疗后生育情况",
    accessor: "",
    Cell: getCell,
  },
  {
    Header: "双原发癌症",
    accessor: "",
    Cell: getCell,
  },
  {
    Header: "最后随访时间",
    accessor: "",
    Cell: getCell,
  },
  {
    Header: "随访备注",
    accessor: "",
    Cell: getCell,
  },
];

export default patientFollowColumns;