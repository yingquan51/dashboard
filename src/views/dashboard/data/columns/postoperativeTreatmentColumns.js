/* eslint-disable react/prop-types */
import { getIdCell, getDefaultCell} from "./getCell";

const postoperativeTreatmentColumns = [
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
    Header: "治疗措施编号",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "治疗时间",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "治疗备注",
    accessor: "",
    Cell: getDefaultCell,
  },
];

export default postoperativeTreatmentColumns;