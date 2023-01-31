/* eslint-disable react/prop-types */
import getCell from "./getCell";

const patientColumns = [
  {
    Header: "病案号",
    accessor: "id",
    Cell: getCell,
  },
  {
    Header: "姓名",
    accessor: "name",
    Cell: getCell,
  },
  {
    Header: "电话",
    accessor: "phone",
    Cell: getCell,
  },
  {
    Header: "发病时年龄",
    accessor: "age",
    Cell: getCell,
  },
  {
    Header: "发现日期",
    accessor: "fbDate",
    Cell: getCell,
  },
  {
    Header: "入院日期",
    accessor: "ryDate",
    Cell: getCell,
  },
  {
    Header: "出院日期",
    accessor: "cyDate",
    Cell: getCell,
  },
  {
    Header: "死亡与否",
    accessor: "death",
    Cell: getCell,
  },
  {
    Header: "死亡时间",
    accessor: "deathtime",
    Cell: getCell,
  },
];

export default patientColumns;