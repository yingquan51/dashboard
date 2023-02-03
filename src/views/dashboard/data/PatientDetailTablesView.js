import { useMemo, useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import CollapseTables from "./components/CollapseTables";

const sheetNames = [
  "一、患者基本信息",
  "二、妇科相关信息",
  "三、个人史、既往史、家族史",
  "四、患者临床特征",
  "五、手术及病理信息",
  "六、术后辅助治疗",
  "七、复发和随访信息",
  "八、其他数据信息",
];

function PatientDetailTablesView() {

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox my={3}>
        {CollapseTables(sheetNames, Array(sheetNames.length).fill("hello world!"))}
      </SoftBox>
    </DashboardLayout>
  );
}

export default PatientDetailTablesView;
