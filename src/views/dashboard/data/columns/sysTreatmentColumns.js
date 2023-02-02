/* eslint-disable react/prop-types */
import { getIdCell, getDefaultCell} from "./getCell";

const sysTreatmentColumns = [
  {
    Header: "编号",
    accessor: "",
    Cell: getIdCell,
  },
  {
    Header: "治疗措施名字",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "治疗措施备注",
    accessor: "",
    Cell: getDefaultCell,
  },
];

export default sysTreatmentColumns;