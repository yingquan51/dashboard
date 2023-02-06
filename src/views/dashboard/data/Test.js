import Card from "@mui/material/Card";
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import SoftBox from "../../../components/SoftBox";
import CollapseTables from "./components/CollapseTables";


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