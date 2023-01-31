/* eslint-disable react/prop-types */
import getCell from "./getCell";

const postoperativeTreatmentColumns = [
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
    Header: "治疗措施编号",
    accessor: "",
    Cell: getCell,
  },
  {
    Header: "治疗时间",
    accessor: "",
    Cell: getCell,
  },
  {
    Header: "治疗备注",
    accessor: "",
    Cell: getCell,
  },
];

export default postoperativeTreatmentColumns;