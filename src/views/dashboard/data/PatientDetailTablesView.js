import { useMemo, useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import CollapseTables from "./components/CollapseTables";
import { allSheetNames } from "./columns/allTables"

function PatientDetailTablesView() {
  console.log(allSheetNames);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox my={3}>
        {CollapseTables(allSheetNames, Array(allSheetNames.length).fill("hello world!"))}
      </SoftBox>
    </DashboardLayout>
  );
}

export default PatientDetailTablesView;
