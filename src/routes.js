// Soft UI Dashboard PRO React layouts
import Kanban from "layouts/applications/kanban";
import Wizard from "layouts/applications/wizard";
import DataTables from "layouts/applications/data-tables";

// Soft UI Dashboard PRO React icons
import SettingsIcon from "examples/Icons/Settings";
import Document from "examples/Icons/Document";

const routes = [
  { type: "title", title: "Pages", key: "title-pages" },
  // {
  //   type: "collapse",
  //   name: "用户管理",
  //   key: "user",
  //   icon: <SettingsIcon size="12px" />,
  //   collapse: [
  //     {
  //       name: "User",
  //       key: "User",
  //       route: "/user/user"
  //     },
  //     {
  //       name: "Logs",
  //       key: "logs",
  //       route: "/user/logs"
  //     },
  //     {
  //       name: "Profile",
  //       key: "profile",
  //       route: "/user/profile"
  //     }
  //   ],
  // },
  {
    type: "collapse",
    name: "数据管理",
    key: "data",
    icon: <Document size="12px" />,
    collapse: [
      {
        name: "列名字段含义",
        key: "allColumns",
        route: "/data/allColumns"
      },
      {
        name: "病人数据概览",
        key: "table",
        route: "/data/patientTable"
      },
      {
        name: "病人详细资料",
        key: "patientDetailTables",
        route: "/data/patientDetailTables"
      },
      {
        name: "病人数据录入",
        key: "patientUploadTable",
        route: "/data/patientUploadTable"
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
  }
];

export default routes;
