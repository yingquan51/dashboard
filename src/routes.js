// Soft UI Dashboard PRO React layouts
import Kanban from "layouts/applications/kanban";
import Wizard from "layouts/applications/wizard";
import DataTables from "layouts/applications/data-tables";

// Soft UI Dashboard PRO React icons
import SettingsIcon from "examples/Icons/Settings";
import Document from "examples/Icons/Document";

const routes = [
  { type: "title", title: "Pages", key: "title-pages" },
  {
    type: "collapse",
    name: "病人数据查询",
    key: "data",
    icon: <Document size="12px" />,
    collapse: [
      {
        name: "列名字段含义",
        key: "allColumns",
        route: "/data/allColumns"
      },
      {
        name: "数据概览",
        key: "patientTable",
        route: "/data/patientTable"
      },
      {
        name: "详细资料",
        key: "patientDetailTables",
        route: "/data/patientDetailTables"
      },
      {
        name: "数据可视化",
        key: "pieChartTable",
        route: "/data/pieChartTable"
      },
      {
        name: "样本库",
        key: "sampleTable",
        route: "/data/sampleTable"
      },
    ]
  },
  {
    type: "collapse",
    name: "病人数据录入",
    key: "upload",
    icon: <Document size="12px" color="white" />,
    collapse:[
      {
        name: "患者基本信息",
        key: "patientUploadTable#0",
        route: "/upload/patientUploadTable#0"
      },
      {
        name: "妇科相关信息",
        key: "patientUploadTable#1",
        route: "/upload/patientUploadTable#1"
      },
      {
        name: "患者历史信息",
        key: "patientUploadTable#2",
        route: "/upload/patientUploadTable#2"
      },
      {
        name: "患者临床特征",
        key: "patientUploadTable#3",
        route: "/upload/patientUploadTable#3"
      },
      {
        name: "新辅治疗信息",
        key: "patientUploadTable#4",
        route: "/upload/patientUploadTable#4"
      },
      {
        name: "手术及术后大病理",
        key: "patientUploadTable#5",
        route: "/upload/patientUploadTable#5"
      },
      {
        name: "术后辅助治疗",
        key: "patientUploadTable#6",
        route: "/upload/patientUploadTable#6"
      },
      {
        name: "复发和随访",
        key: "patientUploadTable#7",
        route: "/upload/patientUploadTable#7"
      },
      {
        name: "基因检测",
        key: "patientUploadTable#8",
        route: "/upload/patientUploadTable#8"
      },
      {
        name: "外相",
        key: "patientUploadTable#9",
        route: "/upload/patientUploadTable#9"
      },
      {
        name: "样本库",
        key: "patientUploadTable#10",
        route: "/upload/patientUploadTable#10"
      },
    ],
  },
  {
    type: "collapse",
    name: "数据统计可视化",
    key: "visualization",
    icon: <Document size="12px" />,
    collapse: [
      {
        name: "人口学统计",
        key: "population",
        route: "/visualization/population",
      },
      {
        name: "疾病史统计",
        key: "history",
        route: "/visualization/history",
      },
      {
        name: "病理学统计",
        key: "pathology",
        route: '/visualization/pathology',
      },
      {
        name: "治疗方式统计",
        key: "treatment",
        route: '/visualization/treatment',
      },
      {
        name: "生存分析",
        key: "survival",
        route: '/visualization/survival',
      }
    ],
  }
];

export default routes;
