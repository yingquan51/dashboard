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
    axios.defaults.baseURL = "http://127.0.0.1:5000";
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
        if (rememberMe) {
          localStorage.setItem("admin", admin);
          localStorage.setItem("password", password);
        }
        navigate("/home");
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
      description="Use these email and password to login or create new account for free."
      image={curved9}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Sign in
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
                &nbsp;&nbsp;Remember me
              </SoftTypography>
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="info" fullWidth onClick={handleSignIn}>
                sign in
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
                sign up
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
