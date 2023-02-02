/* eslint-disable react/prop-types */
import { getIdCell, getDefaultCell} from "./getCell";

const patientFollowColumns = [
  {
    Header: "编号",
    accessor: "",
    Cell: getIdCell,
  },
  {
    Header: "病案号",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "DFS",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "二次复发",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "三次复发",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "OS",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "末次复查时间",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "治疗后生育情况",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "双原发癌症",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "最后随访时间",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "随访备注",
    accessor: "",
    Cell: getDefaultCell,
  },
];

export default patientFollowColumns;