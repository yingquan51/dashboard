import DataTable from "../../../examples/Tables/DataTable";
import sysPlaceColumns from "./columns/sysPlaceColumns";
import sysTreatmentColumns from "./columns/sysTreatmentColumns";
import SalesTable from "../../../examples/Tables/SalesTable";
import Card from "@mui/material/Card";
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import SoftBox from "../../../components/SoftBox";
import TableCard from "./components/TableCard";
import CollapseTables from "./components/CollapseTables";

const table = {
  columns: sysTreatmentColumns,
  rows: [[1, 1, 1], [2, 2, 2], [3, 3, 3]],
};

export default function Test() {

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox my={3}>
        <Card>
          { CollapseTables([1, 2], [[1, 1], [2, 2]]) }
        </Card>
      </SoftBox>
    </DashboardLayout>
  );
}