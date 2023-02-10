// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// NewUser page components
import Card from "@mui/material/Card";
import { useState } from "react";
import SoftInput from "../../../../components/SoftInput";

function FormTableCard(table) {
  return (
    <SoftBox py={3}>
      <Grid container justifyContent="center" sx={{ height: "100%" }}>
        <Card sx={{ height: "100%" }}>
          <SoftBox p={2}>
            <SoftBox>
              <SoftBox lineHeight={0}>
                <SoftTypography variant="h5" fontWeight="bold">
                  {table.name}
                </SoftTypography>
                <SoftTypography variant="button" fontWeight="regular" color="text">
                  {table.message}
                </SoftTypography>
              </SoftBox>
              <SoftBox mt={1.625}>
                <Grid container spacing={1}>
                  {
                    table.data.map((v, i) =>
                      <Grid item xs={12} sm={6} key={i}>
                        <SoftBox mb={1.5}>
                          <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                            <SoftTypography
                              component="label"
                              variant="caption"
                              fontWeight="bold"
                              textTransform="capitalize"
                            >
                              {v.column}
                            </SoftTypography>
                          </SoftBox>
                          <SoftBox>
                            {/*<SoftTypography variant="body2">*/}
                            {/*  {v.row}*/}
                            {/*</SoftTypography>*/}
                            <SoftInput value={v.row}/>
                          </SoftBox>
                        </SoftBox>
                      </Grid>,
                    )
                  }
                </Grid>
              </SoftBox>
            </SoftBox>
          </SoftBox>
        </Card>
      </Grid>
    </SoftBox>
  );
}

export default FormTableCard;
