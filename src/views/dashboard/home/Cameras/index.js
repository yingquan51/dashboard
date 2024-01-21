/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.0
=========================================================

* Product Page: https://material-ui.com/store/items/soft-ui-pro-dashboard/
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard PRO React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Soft UI Dashboard PRO React example components
import CameraView from "../CameraView";

// Images
import hospital from "assets/images/hospital.jpg"
import nankai from "assets/images/NKU.jpg"
import cs from "assets/images/Computer Science.png"

function Cameras() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [openMenu, setOpenMenu] = useState(null);
  const [camera, setCamera] = useState(0);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.md
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetCamera = (event, newCamera) => setCamera(newCamera);
  const handleOpenMenu = ({ currentTarget }) => setOpenMenu(currentTarget);
  const handleCloseMenu = () => setOpenMenu(null);

  

  return (
    <Card style={{
      position: 'absolute',
      width: "80%",
      top: '120px',
      left:'100px'
}}>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <SoftTypography variant="h6">Switch</SoftTypography>
        <SoftBox display="flex" justifyContent="space-between" alignItems="center" width="80%">
          <SoftBox width="90%">
            <AppBar position="static">
              <Tabs orientation={tabsOrientation} value={camera} onChange={handleSetCamera}>
                <Tab label="Hospital" />
                <Tab label="Nankai University" />
                {/* <Tab label="BioCenter" /> */}
              </Tabs>
            </AppBar>
          </SoftBox>
        </SoftBox>
      </SoftBox>
      <SoftBox p={2} mt={1} width="100%" height="36.25rem">
        <CameraView image={hospital}  value={camera} index={0} />
        <CameraView image={nankai} value={camera} index={1} />
        {/* <CameraView image={cs}  value={camera} index={2} /> */}
      </SoftBox>
    </Card>
  );
}

export default Cameras;
