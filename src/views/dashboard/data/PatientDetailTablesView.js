import { useMemo, useEffect, useState } from "react";
import axios from "axios";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Data
import patientPathologicalColumns from "./columns/patientPathologicalColumns";
import assistCureColumns from "./columns/assistCureColumns";
import patientFollowColumns from "./columns/patientFollowColumns";
import relapseInformationColumns from "./columns/relapseInformationColumns";
import patientReappearColumns from "./columns/patientReappearColumns";
import sysPlaceColumns from "./columns/sysPlaceColumns";
import surgicalInformationColumns from "./columns/surgicalInformationColumns";
import postoperativeTreatmentColumns from "./columns/postoperativeTreatmentColumns";
import sysTreatmentColumns from "./columns/sysTreatmentColumns";
import SimpleTableCard from "./components/SimpleTableCard";

function PatientDetailTablesView() {
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox my={3}>
        {SimpleTableCard(patientPathologicalColumns, [], [])}&nbsp;
        {SimpleTableCard(assistCureColumns, [])}&nbsp;
        {SimpleTableCard(patientFollowColumns, [])}&nbsp;
        {SimpleTableCard(relapseInformationColumns, [])}&nbsp;
        {SimpleTableCard(patientReappearColumns, [])}&nbsp;
        {SimpleTableCard(sysPlaceColumns, [])}&nbsp;
        {SimpleTableCard(surgicalInformationColumns, [])}&nbsp;
        {SimpleTableCard(postoperativeTreatmentColumns, [])}&nbsp;
        {SimpleTableCard(sysTreatmentColumns, [])}&nbsp;
      </SoftBox>
    </DashboardLayout>
  );
}

export default PatientDetailTablesView;
