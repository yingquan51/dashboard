import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import FormTable from "./components/FormTable";

export default function Test() {
  const tableExample = {
    name: "table",
    message: "hello",
    data: [
      { column: "hello", row: "hello" },
      { column: "hello", row: "hello" },
      { column: "hello", row: "hello" },
      { column: "hello", row: "hello" },
    ],
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      { FormTable(tableExample) }
    </DashboardLayout>
  );
}