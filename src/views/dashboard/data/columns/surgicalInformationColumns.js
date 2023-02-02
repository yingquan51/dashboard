/* eslint-disable react/prop-types */
import { getIdCell, getDefaultCell} from "./getCell";

const surgicalInformationColumns = [
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
    Header: "手术日期",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "手术方式",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "腋窝淋巴结清扫方式",
    accessor: "",
    Cell: getDefaultCell,
  },
];

export default surgicalInformationColumns;