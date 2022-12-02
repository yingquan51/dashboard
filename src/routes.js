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
    name: "UserManage",
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
    name: "DataManage",
    key: "data",
    icon: <Document size="12px" />,
    collapse: [
      {
        name: "DataTable",
        key: "table",
        route: "/data/table"
      },
      {
        name: "DataReview",
        key: "review",
        route: "/data/review"
      },
      {
        name: "DataUpload",
        key: "upload",
        route: "/data/upload"
      }
    ]
  }
];

export default routes;
