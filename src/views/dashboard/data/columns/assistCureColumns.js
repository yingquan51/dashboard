/* eslint-disable react/prop-types */
import { getIdCell, getDefaultCell} from "./getCell";

const assistCureColumns = [
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
    Header: "术前影像肿瘤大小(T)",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "术前影像腋下淋巴结(N)",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "远处转移与否(M)",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "转移部位",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "TNM分期",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "穿刺ER",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "穿刺Her2",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "穿刺Ki67",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "穿刺P53",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "术前是否行新辅助治疗",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "新辅助治疗方案及周期",
    accessor: "",
    Cell: getDefaultCell,
  },
  {
    Header: "新辅助治疗疗效评价",
    accessor: "",
    Cell: getDefaultCell,
  },
];

export default assistCureColumns;