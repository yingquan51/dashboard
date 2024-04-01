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
import Box from "@mui/material/Box";
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SoftButton from "components/SoftButton";

const Details = (props) => {
  const { value } = props  // index是chip上的标签，value是详情Dialog里面的值
  const [open, setOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('')
  const [dialogData, setDialogData] = useState({index:'',keys:[], values:[]})
  const handleChipClick = (idx) => () => {
    setDialogTitle(idx)
    setDialogData(value.find((item) => item.index === idx))
    setOpen(true)
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {value.map((v) => (
          <Chip key={v['index']}
            label={v['index']}
            onClick={handleChipClick(v['index'])}
          />
        ))}
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        sx={{ overflow: "visible" }}
        fullWidth
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
        <Grid container spacing={1}>
                  {
                    dialogData.keys.map((v, i) =>
                      <Grid item xs={12} sm={6} key={i}>
                        <SoftBox mb={1.5}>
                          <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                            <SoftTypography
                              component="label"
                              variant="caption"
                              fontWeight="bold"
                              textTransform="capitalize"
                            >
                              {v}
                            </SoftTypography>
                          </SoftBox>
                          <SoftBox>
                          <SoftInput value={dialogData.values[i]} />

                          </SoftBox>
                        </SoftBox>
                      </Grid>,
                    )
                  }
                </Grid> 
          <DialogActions>
            <SoftButton
              onClick={handleClose}
              variant="gradient"
              color="light"
            >
              {"关闭"}
            </SoftButton>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  )
}
Details.propTypes = {
  index: PropTypes.string,
  value: PropTypes.array,
};



const Component = (props) => {
  const { component, value } = props
  if (component === "SoftInput") {
    return <SoftInput value={value} />
  } else if (component === "Details") {
    return <Details value={value} />
  }
}
Component.propTypes = {
  component: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
};


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
                            <Component component={v.component} value={v.row} />

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
