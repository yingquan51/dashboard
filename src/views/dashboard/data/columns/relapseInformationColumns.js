/* eslint-disable react/prop-types */
import getCell from "./getCell";

const relapseInformationColumns = [
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
    Header: "首次复发部位",
    accessor: "",
    Cell: getCell,
  },
  {
    Header: "首次复发日期",
    accessor: "",
    Cell: getCell,
  },
  {
    Header: "首次复发确诊手段",
    accessor: "",
    Cell: getCell,
  },
  {
    Header: "首次复发后治疗",
    accessor: "",
    Cell: getCell,
  },
  {
    Header: "复发后治疗效果评价",
    accessor: "",
    Cell: getCell,
  },
];

export default relapseInformationColumns;