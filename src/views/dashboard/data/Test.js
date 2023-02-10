import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import FormTableCard from "./components/FormTableCard";

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
      { FormTableCard(tableExample) }
    </DashboardLayout>
  );
}