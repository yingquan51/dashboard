/* eslint-disable react/prop-types */
import { getIdCell, getDefaultCell} from "./getCell";

const patientPathologicalColumns = [
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
    Header: "病前是否生育",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "G",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "P",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "自然/辅助生育",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "确诊时是否为哺乳期",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "病前是否哺乳",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "哺乳侧别",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "病理学分期",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "组织学分级",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "病理类型",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "化疗反应",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "保乳手术断端情况",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "淋巴结情况",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "腋窝淋巴结总数",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "阳性腋窝淋巴结数",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "ER",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "PR",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "HER2",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "Ki67",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "P53",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "淋巴血管侵犯与否",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "淋巴管癌栓",
    accessor: "",
    Cell: getDefaultCell,
  },
];

export default patientPathologicalColumns;