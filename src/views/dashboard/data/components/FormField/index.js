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

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// formik components
import { ErrorMessage, Field, useField } from "formik";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import Select from "@mui/material/Select";
import SoftSelect from "components/SoftSelect";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Calendar from "../../../../../examples/Calendar";
import { CalendarPicker, DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from 'dayjs';
import { useState } from "react";
import { RecentActorsOutlined } from "@mui/icons-material";

function FormField({ label, name, ...rest }) {
  return (
    <SoftBox mb={1.5}>
      <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
        <SoftTypography
          component="label"
          variant="caption"
          fontWeight="bold"
          textTransform="capitalize"
        >
          {label}
        </SoftTypography>
      </SoftBox>
      <Field {...rest} name={name} as={SoftInput} />
      <SoftBox mt={0.75}>
        <SoftTypography component="div" variant="caption" color="error">
          <ErrorMessage name={name} />
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

function SelectFormField({ label, name, items,  ...rest }) {
  const [field, meta, helpers] = useField(name)  //用useField读取field，
  const handleonChange = (event) => {
    helpers.setValue(event.label) // 选项改变时触发helper.setValue
    console.log(field.value)
  }
  const selectedOption = items.find(item => item.value === field.value)  // 选项值从field.value里读取
  return (
    <Box mb={1.5}>
      <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
        <SoftTypography
          component="label"
          variant="caption"
          fontWeight="bold"
          textTransform="capitalize"
        >
          {label}
        </SoftTypography>
      </SoftBox>

      <Field {...rest} name={name} component={SoftSelect}   //component是自定义组件
        value={selectedOption}
        options={items.map((v) => ({ value: v, label: v }))}  //三个都是给component的参数
        onChange={handleonChange} >
      </Field>
      <div>{field.value}</div>
      <SoftBox mt={0.75}>
        <SoftTypography component="div" variant="caption" color="error">
          <ErrorMessage name={name} />
        </SoftTypography>
      </SoftBox>
    </Box>
  );
}

function DateFormField({ label, name, ...rest }) {
  const [date, setDate] = useState(Dayjs);
  const { disabled } = rest;
  return (
    <Box mb={1.5}>
      <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
        <SoftTypography
          component="label"
          variant="caption"
          fontWeight="bold"
          textTransform="capitalize"
        >
          {label}
        </SoftTypography>
      </SoftBox>
      <SoftBox>
        <LocalizationProvider dateAdapter={AdapterDayjs} value={date}>
          <DatePicker
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
            }}
            renderInput={(params) => {
              rest.values[name] = disabled ? "" : params.inputProps.value;
              return <Field {...rest} name={name} as={TextField} {...params} sx={{ width: "100%!important" }} />;
            }}
            inputFormat={"YYYY-MM-DD"}
            disabled={disabled}
          />
        </LocalizationProvider>
      </SoftBox>
      <SoftBox mt={0.75}>
        <SoftTypography component="div" variant="caption" color="error">
          <ErrorMessage name={name} />
        </SoftTypography>
      </SoftBox>
    </Box>
  );
}

// typechecking props for FormField
FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

SelectFormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

DateFormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export {
  FormField,
  SelectFormField,
  DateFormField
}
