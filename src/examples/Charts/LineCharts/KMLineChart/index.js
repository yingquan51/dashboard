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

import { useMemo } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import { Line } from "react-chartjs-2";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// KMLineChart configurations
import configs from "examples/Charts/LineCharts/KMLineChart/configs";

// Soft UI Dashboard PRO React base styles
import colors from "assets/theme/base/colors";

function KMLineChart({ title, description, height, chart }) {
  const chartDatasets = chart.datasets
    ? chart.datasets.map((dataset) => ({
      ...dataset,
      tension: 0.4,
      borderWidth: 3,
      pointRadius: 0,
      pointBackgroundColor: colors[dataset.color]
        ? colors[dataset.color || "dark"].main
        : colors.dark.main,
      borderColor: colors[dataset.color]
        ? colors[dataset.color || "dark"].main
        : colors.dark.main,
      maxBarThickness: 6,
    }))
    : [];

  const { data, options } = configs(chart.labels || [], chartDatasets);

  const renderChart = (
    <SoftBox p={2}>
      {title || description ? (
        <SoftBox px={description ? 1 : 0} pt={description ? 1 : 0}>
          {title && (
            <SoftBox mb={1}>
              <SoftTypography variant="h5">{title}</SoftTypography>
            </SoftBox>
          )}
        </SoftBox>
      ) : null}
      {useMemo(
        () => (
          <SoftBox height={height}>
            <Line data={data} options={options} />
          </SoftBox>
        ),
        [chart, height]
      )}
      <SoftBox mb={2} style={{ whiteSpace: 'pre-line' }}>
        <SoftTypography component="div" variant="button" fontWeight="regular" color="text">
          {description}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );

  return title || description ? <Card>{renderChart}</Card> : renderChart;
}

// Setting default values for the props of KMLineChart
KMLineChart.defaultProps = {
  title: "",
  description: "",
  height: "19.125rem",
};

// Typechecking props for the KMLineChart
KMLineChart.propTypes = {
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  chart: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default KMLineChart;
