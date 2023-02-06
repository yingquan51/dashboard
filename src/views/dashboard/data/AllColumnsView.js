import SoftBox from "../../../components/SoftBox";
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import TableCard from "./components/TableCard";
import { getIdCell, getDefaultCell } from "./columns/util";
import allColumns from "./columns/allColumns";

const data = allColumns;

const columns = [
  {
    Header: "序号",
    accessor: "id",
    Cell: getIdCell,
  },
  {
    Header: "字段",
    accessor: "name",
    Cell: getDefaultCell,
  },
  {
    Header: "备注",
    accessor: "message",
    Cell: getDefaultCell,
  },
];


function AllColumnsView() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox my={3}>
        {TableCard(columns, data, data.length)}
      </SoftBox>
    </DashboardLayout>
  );
}

export default AllColumnsView;