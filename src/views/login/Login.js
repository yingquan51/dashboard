import {useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "./BasicLayout";
import Swal from "sweetalert2";
import axios from "axios";
// Images
import curved9 from "assets/images/curved-images/curved9.jpg";
import { useNavigate } from 'react-router-dom';

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [admin, setAdmin] = useState(localStorage.getItem("admin") ? localStorage.getItem("admin") : "");
  const [password, setPassword] = useState(localStorage.getItem("password") ? localStorage.getItem("password") : "");
  const navigate = useNavigate();
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSignIn = async () => {
    //console.log(admin, password);
    axios.defaults.baseURL = process.env.REACT_APP_ApiUrl;
    axios({
      method: "GET",
      url: "/api/login",
      params: {
        "admin": admin,
        "password": password
      }
    }).then(response=>{
      // console.log(response.data)
      if (response.data.status && response.data.status === "正常") {
        Swal.fire("Sign In Success", "", "success");  // "await" not allowed
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("tokenExpiredTime", new Date().getTime() + response.data.expire * 60 * 1000);
        console.log(localStorage.getItem("tokenExpiredTime"));
        if (rememberMe) {
          localStorage.setItem("admin", admin);
          localStorage.setItem("password", password);
        }
        navigate("/home");
        // navigate("/data/table");
        window.location.reload();
      }
      else{
        Swal.fire("Sign In Fail", "No such User or Wrong password", "warning");
      }
    })
  }

  const handleSignUp = () => {
    navigate("/register");
    window.location.reload()
  }

  return (
    <BasicLayout
      title="Welcome!"
      description="欢迎使用后台系统，使用账号和密码进行登录"
      image={curved9}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            登录
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
        </SoftBox>
        <SoftBox p={3}>
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              <SoftInput type="text" placeholder="Account ID" value={admin} onChange={(e)=>{setAdmin(e.target.value)}}/>
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="password" placeholder="PassWord" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            </SoftBox>
            <SoftBox display="flex" alignItems="center">
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;记住密码
              </SoftTypography>
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="info" fullWidth onClick={handleSignIn}>
                登录
              </SoftButton>
            </SoftBox>
            <SoftBox mt={1} mb={3}>
              <SoftButton
                component={Link}
                to="/register"
                variant="gradient"
                color="dark"
                fullWidth
                onClick={handleSignUp}
              >
                注册
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
