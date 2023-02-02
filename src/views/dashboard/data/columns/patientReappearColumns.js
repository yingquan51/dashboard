/* eslint-disable react/prop-types */
import { getIdCell, getDefaultCell} from "./getCell";

const patientReappearColumns = [
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
    Header: "复发日期",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "复发位置编号",
    accessor: "",
    Cell: getDefaultCell,
  },
];

export default patientReappearColumns;