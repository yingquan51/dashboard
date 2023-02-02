/* eslint-disable react/prop-types */
import { getIdCell, getDefaultCell} from "./getCell";

const patientColumns = [
  {
    Header: "病案号",
    accessor: "id",
    Cell: getIdCell,
  },
  {
    Header: "姓名",
    accessor: "name",
    Cell: getDefaultCell,
  },
  {
    Header: "电话",
    accessor: "phone",
    Cell: getDefaultCell,
  },
  {
    Header: "发病时年龄",
    accessor: "age",
    Cell: getDefaultCell,
  },
  {
    Header: "发现日期",
    accessor: "fbDate",
    Cell: getDefaultCell,
  },
  {
    Header: "入院日期",
    accessor: "ryDate",
    Cell: getDefaultCell,
  },
  {
    Header: "出院日期",
    accessor: "cyDate",
    Cell: getDefaultCell,
  },
  {
    Header: "死亡与否",
    accessor: "death",
    Cell: getDefaultCell,
  },
  {
    Header: "死亡时间",
    accessor: "deathtime",
    Cell: getDefaultCell,
  },
];

export default patientColumns;