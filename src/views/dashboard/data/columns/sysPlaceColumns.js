/* eslint-disable react/prop-types */
import { getIdCell, getDefaultCell} from "./getCell";

const sysPlaceColumns = [
  {
    Header: "编号",
    accessor: "",
    Cell: getIdCell,
  },
  {
    Header: "位置名字",
    accessor: "",
    Cell: getDefaultCell,
  },
];

export default sysPlaceColumns;