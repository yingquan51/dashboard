import PieChart from "../../../examples/Charts/PieChart";
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";

import colors from "assets/theme/base/colors";

const { gradients, dark } = colors;

const data = {
  labels: ["1", "2", "3", "4", "5", "6"],
  datasets: {
    label: "# of Votes",
    data: [12, 19, 3, 5, 2, 3],
    backgroundColors: [
      "primary",
      "secondary",
      "success",
      "warning",
      "error",
      "info",
    ],
  },
};

function PieChartTableView() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <PieChart
        title={"病人年龄扇形图"}
        chart={data}
      >
      </PieChart>
    </DashboardLayout>
  );
}

export default PieChartTableView;