/* eslint-disable react/prop-types */
import getCell from "./getCell";

const sysTreatmentColumns = [
  {
    Header: "编号",
    accessor: "",
    Cell: getCell,
  },
  {
    Header: "治疗措施名字",
    accessor: "",
    Cell: getCell,
  },
  {
    Header: "治疗措施备注",
    accessor: "",
    Cell: getCell,
  },
];

export default sysTreatmentColumns;