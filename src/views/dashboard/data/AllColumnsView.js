import SoftBox from "../../../components/SoftBox";
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import TableCard from "./components/TableCard";
import { getIdCell, getDefaultCell } from "./columns/util";
import { allColumns } from "./columns/allColumns";
import SoftTypography from "../../../components/SoftTypography";
import { allTableNames } from "./columns/allTables";

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
    Header: "Field",
    accessor: "field",
    Cell: getDefaultCell,
  },
  // {
  //   Header: "备注",
  //   accessor: "message",
  //   Cell: getDefaultCell,
  // },
];


function AllColumnsView() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {
        data.map((v, i) => {
          return (
            <SoftBox my={3} key={i}>
              { TableCard(allTableNames[i] || "", columns, v, v.length) }
            </SoftBox>
          );
        })
      }

    </DashboardLayout>
  );
}

export default AllColumnsView;