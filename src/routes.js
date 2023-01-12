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
    name: "用户管理",
    key: "user",
    icon: <SettingsIcon size="12px" />,
    collapse: [
      {
        name: "User",
        key: "User",
        route: "/user/user"
      },
      {
        name: "Logs",
        key: "logs",
        route: "/user/logs"
      },
      {
        name: "Profile",
        key: "profile",
        route: "/user/profile"
      }
    ],
  },
  {
    type: "collapse",
    name: "数据管理",
    key: "data",
    icon: <Document size="12px" />,
    collapse: [
      {
        name: "病人信息",
        key: "table",
        route: "/data/table"
      },
      {
        name: "病人年龄分布",
        key: "pieChartTable",
        route: "/data/pieChartTable"
      },
      {
        name: "DataReview",
        key: "review",
        route: "/data/review"
      },
      {
        name: "上传数据",
        key: "upload",
        route: "/data/upload"
      }
    ]
  }
];

export default routes;
