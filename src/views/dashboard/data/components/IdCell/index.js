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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";


// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import IconButton from '@mui/material/IconButton';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

function IdCell({ id, clickFunc}) {
  return (
    <SoftBox display="flex" alignItems="center">
      <IconButton aria-label="fingerprint" color="secondary"  onClick ={(value)=>{clickFunc(value)}}>
        <AssignmentIndIcon />
      </IconButton>
      <SoftBox ml={1}>
        <SoftTypography variant="caption" fontWeight="medium" color="text">
          {id}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}


// Typechecking props for the IdCell
IdCell.propTypes = {
  id: PropTypes.string.isRequired,
  clickFunc: PropTypes.func
};

export default IdCell;
