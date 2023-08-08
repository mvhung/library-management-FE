/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";
import axios from "axios";
// react-router-dom components
import { Link, useFormAction } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";



function SignUp() {

  // const data = {
  //   "firstName":"mai",
  //   "lastName":"hung",
  //   "email":"maihung12@gmail.com",
  //   "password":"hahaa",
  //   "fullName":"mai hung"
  // }

  
  
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (event) => {

    axios.post('http://localhost:8080/api/v1/auth/register', {
      "name":username,
      "email":email,
      "password":password,
    })
    .then((response) => {
      console.log(response.data);
    }, (error) => {
      console.log(error);
    });
  }

  return (
    <BasicLayout
      title="Welcome!"
      description="Use these awesome forms to login or create new account in your project for free."
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={1}  textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Register with
          </SoftTypography>
        </SoftBox>
        {/* <SoftBox mb={2}>
          <Socials />
        </SoftBox>
        <Separator /> */}
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form" >
            <SoftBox mb={2}>
              <SoftInput placeholder="Username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="email" placeholder="Email"  value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="password" placeholder="Password"  value={password} onChange={(e)=>{setPassword(e.target.value)}} />
            </SoftBox>
            
            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="dark" type="button" onClick={(e)=>handleSubmit(e)} fullWidth>
                sign up
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
