import { useMemo, useEffect, useState } from "react";
import axios from "axios";

import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Data
import { patientColumnCells } from "./columns/patientColumnCells";
import TableCard from "./components/TableCard";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import SoftTypography from "../../../components/SoftTypography";

function DataTableView() {
  // const data = useMemo(() => dataTableData.rows, [dataTableData]);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {  // 页面第一次加载时，向后端请求数据
    //console.log(admin, password);
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/api/info/get",
      headers: {
        "x-session-token": localStorage.getItem("token"),
      },
    }).then(response => {
      console.log(response);
      const { data, total } = response.data;
      setData(data);
      setTotal(total);
    });
  }, []);

  const [menu, setMenu] = useState(null);
  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);
  const renderMenu = (
    <Menu
      anchorEl={menu}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={Boolean(menu)}
      onClose={closeMenu}
      keepMounted
    >
      <MenuItem onClick={closeMenu}>Status: Paid</MenuItem>
      <MenuItem onClick={closeMenu}>Status: Refunded</MenuItem>
      <MenuItem onClick={closeMenu}>Status: Canceled</MenuItem>
      <Divider sx={{ margin: "0.5rem 0" }} />
      <MenuItem onClick={closeMenu}>
        <SoftTypography variant="button" color="error" fontWeight="regular">
          Remove Filter
        </SoftTypography>
      </MenuItem>
    </Menu>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox my={3}>
        {/*<SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>*/}
        {/*  <SoftButton variant="gradient" color="info">*/}
        {/*    new table*/}
        {/*  </SoftButton>*/}
        {/*  <SoftBox display="flex">*/}
        {/*    <SoftButton variant={menu ? "contained" : "outlined"} color="dark" onClick={openMenu}>*/}
        {/*      filters&nbsp;*/}
        {/*      <Icon>keyboard_arrow_down</Icon>*/}
        {/*    </SoftButton>*/}
        {/*    {renderMenu}*/}
        {/*    <SoftBox ml={1}>*/}
        {/*      <SoftButton variant="outlined" color="dark">*/}
        {/*        <Icon>description</Icon>*/}
        {/*        &nbsp;export csv*/}
        {/*      </SoftButton>*/}
        {/*    </SoftBox>*/}
        {/*  </SoftBox>*/}
        {/*</SoftBox>*/}
        { TableCard(patientColumnCells, data, total) }
      </SoftBox>
    </DashboardLayout>
  );
}

export default DataTableView;
