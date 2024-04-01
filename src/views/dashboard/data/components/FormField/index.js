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
import Switch from "@mui/material/Switch";
import SoftSelect from "components/SoftSelect";
import MenuItem from "@mui/material/MenuItem";
import SoftButton from "components/SoftButton";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Calendar from "../../../../../examples/Calendar";
import { CalendarPicker, DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Button, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from 'dayjs';
import { useEffect, useState } from "react";
import { RecentActorsOutlined } from "@mui/icons-material";
import { Form, Formik } from "formik";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Chip from '@mui/material/Chip';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import * as Yup from "yup";
import { useDropzone } from 'react-dropzone';
import colors from "assets/theme/base/colors";
import UploadFileIcon from '@mui/icons-material/UploadFile';

function FormField({ label, name, ...rest }) {
  const [field, meta, helpers] = useField(name)
  const [inputValue, setInputValue] = useState(field.value)
  const { disabled, inherited, value, values, reliFunc } = rest  // value表示当前输入框的值，values表示当前表的所有值
  const handleonChange = (event) => {
    helpers.setValue(event.target.value) // 输入框改变时触发helper.setValue
    setInputValue(event.target.value)  //修改输入框里的值
  }
  useEffect(() => {
    if (disabled && !inherited) {
      helpers.setValue("") // 当被设置为不可填且没有外部数据继承时，输入框里的内容要清空
      setInputValue("")
    }
    else {
      if (inherited) {
        console.log("继承自外部数据！")
        helpers.setValue(value)  // 当继承自外部数据时赋值
        setInputValue(value)
      } else {
        helpers.setValue("")   // 没有外部数据继承时设置为空
        setInputValue("")
      }
    }
  }, [reliFunc(values), disabled, inherited])
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
      <Field {...rest} name={name} as={SoftInput} value={inputValue} onChange={handleonChange} />
      <SoftBox mt={0.75}>
        <SoftTypography component="div" variant="caption" color="error">
          <ErrorMessage name={name} />
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

function PhotoFormField({ label, name, ...rest }) {
  const [field, meta, helpers] = useField(name)

  const handleDelete = (value) => () => {
    helpers.setValue(field.value.filter((file) => file.name !== value))
  };
  const thumbs = field.value.map((file, index) => (
    <div key={index}>
      <SoftTypography component="div" variant="caption" color="success" mb={1}>
        <Chip
          size="small"
          key={index}
          label={file.name}
          deleteIcon={<DeleteOutlinedIcon fontSize="medium" />}
          onDelete={handleDelete(file.name)}>
        </Chip>
        <br/>
        <img src={file.preview} alt={file.name} style={{ width: "auto", height: "80px", marginTop: '5px'}} />
      </SoftTypography>
    </div>
  ));
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      helpers.setValue([...field.value,
      ...acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
      ]);
      console.log(field.value)
    }
  });
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
      <div {...getRootProps()} style={{ backgroundColor: colors.grey[200], border: `1.5px dashed ${colors.grey[500]}`, borderRadius: '7px', height: 32 }}>
        <input {...getInputProps()} />
        <SoftBox mt={0.8} ml={1} lineHeight={0} display="inline-block">
          <SoftTypography
            component="label"
            variant="caption"
            fontWeight="bold"
            textTransform="capitalize"
            color="text"
            verticalAlign="text-bottom"
          >
            {"拖拽照片到此处或点击浏览..."}
          </SoftTypography>
        </SoftBox>
      </div>
      <SoftBox mt={0.75}>
        <SoftTypography component="div" variant="caption" color="error">
          <ErrorMessage name={name} />
        </SoftTypography>
        <div>{thumbs}</div>
      </SoftBox>
    </SoftBox>
  )
}

function SelectFormField({ label, name, items, ...rest }) {
  const [field, meta, helpers] = useField(name)  //用useField读取field
  const { disabled, values, reliFunc, value, inherited } = rest
  const [selectedOption, setSelectedOption] = useState("")  // 选项栏初始值为空
  const handleonChange = (event) => {
    helpers.setValue(event.value) // 选项改变时触发helper.setValue
    setSelectedOption(disabled ? "" : items.find(item => item.value === field.value))  //修改选项栏里的值
  }
  useEffect(() => {
    if (disabled && !inherited) {
      helpers.setValue("")
      setSelectedOption("")  // 当被设置为不可填且没有外部数据继承时，输入框里的内容要清空
    } else {
      if (inherited) {
        helpers.setValue(value)
        let _item = items.find(item => item === value)
        setSelectedOption({ value: _item, label: _item })  // 当选项值继承自外部数据时赋值
      }
      else {
        helpers.setValue("")
        setSelectedOption("")  // 当选项值没有外部数据继承时设置为空
      }
    }
  }, [reliFunc(values), disabled, inherited]) // 当依赖项reliFunc(values)变化时，本项的所有选项都设置为空
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
        isDisabled={disabled}
        style={{ zIndex: 2000 }}
        options={items.map((v) => ({ value: v, label: v }))}  //三个都是给component的参数
        onChange={handleonChange} >
      </Field>
      <SoftBox mt={0.75}>
        <SoftTypography component="div" variant="caption" color="error">
          <ErrorMessage name={name} />
        </SoftTypography>
      </SoftBox>
    </Box>
  );
}

function MultiSelectFormField({ label, name, items, ...rest }) {
  const [field, meta, helpers] = useField(name)  //用useField读取field
  const [selectedOption, setSelectedOption] = useState("")  // 选项栏初始值为空
  const handleonChange = (event) => {
    console.log(event)
    helpers.setValue(event.map((item) => item.label).join(",")) // 选项改变时触发helper.setValue
    console.log(field.value)
    setSelectedOption(disabled ? "" : items.find(item => field.value.includes(item.value)))  //修改选项栏里的值
  }
  const { disabled } = rest
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
        isDisabled={disabled}
        isMulti={true}
        options={items.map((v) => ({ value: v, label: v }))}  //三个都是给component的参数
        onChange={handleonChange} >
      </Field>
      {/* <div>{JSON.stringify(field.value)}</div> */}
      <SoftBox mt={0.75}>
        <SoftTypography component="div" variant="caption" color="error">
          <ErrorMessage name={name} />
        </SoftTypography>
      </SoftBox>
    </Box>
  );
}

function DateFormField({ label, name, ...rest }) {
  const [field, meta, helpers] = useField(name)  //用useField读取field
  const [useDay, setUseDay] = useState(false)
  const [date, setDate] = useState(Dayjs);
  const { disabled } = rest;
  useEffect(() => {
    if (disabled) {
      helpers.setValue("") // 当被设置为不可填且没有外部数据继承时，输入框里的内容要清空
      setDate("")
    }
  }, [disabled]) // 当依赖项reliFunc(values)变化时，本项的所有选项都设置为空
  return (
    <Box mb={1.5}>
      <SoftBox mt={0} ml={0.5} mb={0.5} lineHeight={0} display="inline-block">
        <SoftTypography
          component="label"
          variant="caption"
          fontWeight="bold"
          textTransform="capitalize"
        >
          {label}
        </SoftTypography>
        {" "}
        <Tooltip title={"精确到日期"} placement="top">
          <Switch value={useDay} onChange={() => { setUseDay(!useDay) }} disabled={disabled} />
        </Tooltip>
      </SoftBox><br />
      <SoftBox mb={0} display="inline-block">
        <LocalizationProvider dateAdapter={AdapterDayjs} value={date}>
          <DatePicker
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
              helpers.setValue(newValue.format(useDay ? "YYYY-MM-DD" : "YYYY-MM"));
            }}
            renderInput={(params) => {
              rest.values[name] = disabled ? "" : params.inputProps.value;
              return <Field {...rest} name={name} component={TextField} {...params} value={field.value} sx={"100%"} fullWidth />;
            }}
            views={useDay ? ['year', 'month', 'day'] : ['year', 'month']}
            format={useDay ? "YYYY-MM-D" : "YYYY-MM"}
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

const getFormField = (values, errors, touched, index, label, name, placeholder, disabled, inherited = false) => (
  <Grid item xs={12} sm={6} key={index}>
    <FormField
      type={"text"}
      label={label}
      name={name}
      value={disabled(values) ? "" : values[name]}
      placeholder={placeholder}
      error={errors[name] && touched[name]}
      success={values[name].length > 0 && !errors[name]}
      disabled={disabled(values)}
      inherited={inherited}
      values={values}
      reliFunc={(v) => false}
    />
  </Grid>
);

const getPhotoFormField = (values, errors, touched, index, label, name, placeholder, disabled, inherited = false) => (
  <Grid item xs={12} sm={6} key={index}>
    <PhotoFormField
      type={"file"}
      label={label}
      name={name}
      value={disabled(values) ? "" : values[name]}
      placeholder={placeholder}
      error={errors[name] && touched[name]}
      success={values[name] !== null && !errors[name]}
      disabled={disabled(values)}
      inherited={inherited}
      values={values}
      reliFunc={(v) => false}
    />
  </Grid>
);

const getFormFieldInherited = (values, errors, touched, index, label, name, getValues, disabled, inherited = true) => (  // value值通过其它value值计算获得
  <Grid item xs={12} sm={6} key={index}>
    <FormField
      type={"text"}
      label={label}
      name={name}
      value={getValues(values)}
      error={errors[name] && touched[name]}
      success={values[name].length > 0 && !errors[name]}
      disabled={disabled(values)}
      inherited={true}
      values={values}
      reliFunc={getValues}
    />
  </Grid>
);


const getSelectFormField = (values, errors, touched, index, label, name, getItems, disabled, inherited = false) => (
  <Grid item xs={12} sm={6} key={index}>
    <SelectFormField
      type={"text"}
      label={label}
      name={name}
      items={getItems(values)}  //getItems is params[0]
      value={values[name]}
      values={values}
      error={errors[name] && touched[name]}
      success={values[name].length > 0 && !errors[name] ? "true" : undefined}
      disabled={disabled(values)}  // disabled is params[1]
      reliFunc={(v) => false}
      inherited={inherited}
      sx={disabled(values) ? { backgroundColor: "#e9ecef!important" } : {}}
    />
  </Grid>
);

const getSelectFormFieldRely = (values, errors, touched, index, label, name, getItems, reliFunc, disabled) => { //当依赖值发生变化时修改选项的内容
  return (
    <Grid item xs={12} sm={6} key={index}>
      <SelectFormField
        type={"text"}
        label={label}
        name={name}
        items={getItems(values)}  //getItems is params[0]
        value={values[name]}
        values={values}
        error={errors[name] && touched[name]}
        success={values[name].length > 0 && !errors[name] ? "true" : undefined}
        disabled={disabled(values)}  // disabled is params[1]
        sx={disabled(values) ? { backgroundColor: "#e9ecef!important" } : {}}
        reliFunc={reliFunc}
      />
    </Grid>
  );
}

const getMultiSelectFormField = (values, errors, touched, index, label, name, getItems, disabled) => {
  return (
    <Grid item xs={12} sm={6} key={index}>
      <MultiSelectFormField
        type={"text"}
        label={label}
        name={name}
        items={getItems(values)}  //getItems is params[0]
        value={values[name]}
        error={errors[name] && touched[name]}
        success={values[name].length > 0 && !errors[name] ? "true" : undefined}
        disabled={disabled(values)}  // disabled is params[1]
        sx={disabled(values) ? { backgroundColor: "#e9ecef!important" } : {}}
      />
    </Grid>
  )
}

const getDateFormField = (values, errors, touched, index, label, name, disabled) => (
  <Grid item xs={12} sm={6} key={index}>
    <DateFormField
      type={"text"}
      label={label}
      name={name}
      value={values[name]}
      error={errors[name] && touched[name]}
      success={values[name].length > 0 && !errors[name] ? "true" : undefined}
      values={values}
      disabled={disabled(values)}
      sx={disabled(values) ? { backgroundColor: "#e9ecef!important" } : {}}
    />
  </Grid>
);

const getDetailsFormField = (values, errors, touched, index, label, name, details, disabled) => (
  <Grid item xs={12} sm={6} key={index}>
    <DetailsFormField
      type={"text"}
      label={label}
      name={name}
      value={values[name]}
      error={errors[name] && touched[name]}
      success={values[name].length > 0 && !errors[name] ? "true" : undefined}
      values={values}
      details={details}
      disabled={disabled(values)}
    />
  </Grid>
);

function DetailsFormField({ label, name, details, ...rest }) {  // 在一个输入框里面加入details
  const [field, meta, helpers] = useField(name)  // 用useField读取field
  const [open, setOpen] = useState(false)  // 用弹窗来展示details的内容
  const [records, setRecords] = useState([])  // 用records记录每个详情的索引
  const [Inherited, setInherited] = useState(false) // 点击chip时，输入框中会出现details，此时inherit=true
  const [currIndex, setCurrIndex] = useState("") // 点击chip时，记录此时chip的index在record中的位置
  const { index, names, columns, validations, functions, params } = details;
  const initialValues = {}, validationsObj = {}
  names.map((v, i) => {
    initialValues[v] = "";
    validationsObj[v] = validations[i];
  });
  const validationSchema = Yup.object(validationsObj);  // details框中的验证参数
  const [inputValue, setInputValue] = useState(initialValues)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChipClick = (v) => {
    let idx = v.target.innerText
    setInherited(true)  // 设置details里的内容受到外部内容控制
    setInputValue(field.value.find((item) => item[index] === idx))
    setCurrIndex(records.indexOf(idx))  // 记录正在更改的details在records中的index
    setOpen(true)
  };

  const handleDelete = (value) => () => {
    helpers.setValue(field.value.filter((item) => item[index] !== value))
    setRecords(records.filter((item) => item !== value));
  };

  const handleClose = () => {
    setOpen(false);
    setInherited(false)  // 设置details里的内容不受外部内容控制
  };
  const handleSave = (v) => {
    if (Inherited) { // 当内容受控时，更改的内容会覆盖原来的内容，否则在数组后面追加内容
      let _rec = records
      if (records.includes(v[index]) && _rec[currIndex] !== v[index]) {
        console.log("索引不唯一")  // 当修改后的index在records里面，但不是正在修改的currIndex，那就说明索引不唯一
      } else {
        let _val = field.value
        _val[currIndex] = v
        helpers.setValue(_val) // 更改内容
        _rec[currIndex] = v[index]
        setRecords(_rec)  //更改records索引
        setCurrIndex("")  // currIndex设置为空
      }
    } else {
      if (records.includes(v[index])) {  // 需要先判断index的唯一性
        console.log("索引不唯一")
      } else {
        if (field.value === "") { //初始值是空字符串，需要变成数组
          helpers.setValue([v]) // 记录详情内容
        } else {
          helpers.setValue([...field.value, v])
        }
        setRecords([...records, v[index]])  // 记录详情索引
      }
    }
    setOpen(false);
    setInherited(false)  // 设置details里的内容不受外部内容控制
  };
  return (
    <Box mb={1.5}>
      <SoftBox mt={0} ml={0.5} mb={0.5} lineHeight={0} display="inline-block">
        <SoftTypography
          component="label"
          variant="caption"
          fontWeight="bold"
          textTransform="capitalize"
        >
          {label}
        </SoftTypography>
      </SoftBox><br />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {records.map((value) => (
          <Chip key={value}
            label={value}
            onClick={handleChipClick}
            deleteIcon={<DeleteOutlinedIcon fontSize="medium" />}
            onDelete={handleDelete(value)} />
        ))}
        <SoftButton
          onClick={handleClickOpen}
          variant="gradient"
          color="light"
        >
          {"添加条目"}
        </SoftButton>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        sx={{ overflow: "visible" }}
        fullWidth
      >
        <DialogTitle>{`${label}的详细信息`}</DialogTitle>
        <DialogContent>
          <Formik initialValues={inputValue} onSubmit={handleSave} validationSchema={validationSchema}>
            {({ values, errors, touched, isSubmitting }) => {
              return (
                <Form autoComplete="off">
                  <Grid container spacing={1}>
                    {
                      names.map((v, i) => {
                        return functions[i](values, errors, touched, i, columns[i], names[i], ...params[i], Inherited);
                      })
                    }
                  </Grid>
                  <DialogActions>
                    <SoftButton
                      onClick={handleClose}
                      disabled={isSubmitting}
                      variant="gradient"
                      color="light"
                    >
                      {"取消"}
                    </SoftButton>
                    <SoftButton
                      disabled={isSubmitting}
                      type="submit"
                      variant="gradient"
                      color="dark"
                    >
                      {"保存"}
                    </SoftButton>
                  </DialogActions>
                </Form>
              )
            }
            }
          </Formik>
        </DialogContent>
      </Dialog>
      <SoftBox mt={0.75}>
        <SoftTypography component="div" variant="caption" color="error">
          <ErrorMessage name={name} />
        </SoftTypography>
      </SoftBox>
      {/* <div>{JSON.stringify(field.value)}</div>
      <div>{JSON.stringify(inputValue)}</div>
      <div>{records}</div>
      <div>{currIndex}</div> */}
    </Box>
  );
}

// typechecking props for FormField
FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

PhotoFormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

SelectFormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

MultiSelectFormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

DateFormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

DetailsFormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  details: PropTypes.object.isRequired,
}



export {
  FormField,
  SelectFormField,
  DateFormField,
  MultiSelectFormField,
  DetailsFormField,
  getFormField,
  getFormFieldInherited,
  getSelectFormField,
  getSelectFormFieldRely,
  getMultiSelectFormField,
  getDateFormField,
  getDetailsFormField,
  getPhotoFormField,
}
