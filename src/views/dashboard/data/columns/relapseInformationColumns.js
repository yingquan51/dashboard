/* eslint-disable react/prop-types */
import { getIdCell, getDefaultCell} from "./getCell";

const relapseInformationColumns = [
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
    Header: "首次复发部位",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "首次复发日期",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "首次复发确诊手段",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "首次复发后治疗",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "复发后治疗效果评价",
    accessor: "",
    Cell: getDefaultCell,
  },
];

export default relapseInformationColumns;