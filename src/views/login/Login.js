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
// Images
import curved9 from "assets/images/curved-images/curved9.jpg";
import { useNavigate } from 'react-router-dom';

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const navigate = useNavigate();
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSignin = async () => {
    //console.log(userName, passWord);
    if(userName == "nkul"){
        await Swal.fire("", "Login Success", "success");
        localStorage.setItem("token","nkul");
        navigate("/home");
        window.location.reload()
        
    }else{
        Swal.fire("", "No such User or Wrong passWord", "warning");
    }
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
              <SoftInput type="text" placeholder="UserName" value={userName} onChange={(e)=>{setUserName(e.target.value)}}/>
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="password" placeholder="PassWord" onChange={(e)=>{setPassWord(e.target.value)}}/>
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
              <SoftButton variant="gradient" color="info" fullWidth onClick={handleSignin}>
                sign in
              </SoftButton>
            </SoftBox>
            <SoftBox mt={1} mb={3}>
              <SoftButton
                component={Link}
                to="/login"
                variant="gradient"
                color="dark"
                fullWidth
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
