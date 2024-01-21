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

import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import WeatherCard from "examples/Cards/WeatherCard";
import DefaultCounterCard from "examples/Cards/CounterCards/DefaultCounterCard";
import ReportsDoughnutChart from "examples/Charts/DoughnutCharts/ReportsDoughnutChart";
import ThinBarChart from "examples/Charts/BarCharts/ThinBarChart";
import ControllerCard from "examples/Cards/ControllerCard";
import PlaceholderCard from "examples/Cards/PlaceholderCard";


// Home dashboard components
import Cameras from "./Cameras";
import TemperatureSlider from "./TemperatureSlider";



// Data
import reportsDoughnutChartData from "./data/reportsDoughnutChartData";
import thinBarChartData from "./data/thinBarChartData";
import controllerCardIcons from "./data/controllerCardIcons";

// Images
import iconSunCloud from "assets/images/small-logos/icon-sun-cloud.png";

function Home() {
  const [temperature, setTemperature] = useState(21);
  const {
    humidityIconLight,
    temperatureIconLight,
    airConditionerIconLight,
    lightsIconLight,
    wifiIconLight,
    humidityIconDark,
    airConditionerIconDark,
    lightsIconDark,
    wifiIconDark,
  } = controllerCardIcons;

  // Controller cards states
  const [humidityState, setHumidityState] = useState(false);
  const [temperatureState, setTemperatureState] = useState(true);
  const [airConditionerState, setAirConditionerState] = useState(false);
  const [lightsStata, setLightsStata] = useState(false);
  const [wifiState, setWifiState] = useState(true);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox pt={8} width="80%" >
          <Grid container spacing={1}>
            <Grid item xs={12} xl={15}>
              <Cameras />
            </Grid>
          </Grid>
      </SoftBox>
      <SoftBox my={6} width="100%">
        <Divider />
      </SoftBox>
     
      
    </DashboardLayout>
  );
}

export default Home;
