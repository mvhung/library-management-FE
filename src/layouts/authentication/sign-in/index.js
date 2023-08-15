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
import axios from 'axios';
import { useState } from 'react';

// react-router-dom components
import { Link } from 'react-router-dom';

// @mui material components
import Switch from '@mui/material/Switch';

// Soft UI Dashboard React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import SoftInput from 'components/SoftInput';
import SoftButton from 'components/SoftButton';
import AuthService from 'services/auth.service';
import { useNavigate } from 'react-router-dom';
// Authentication layout components
import CoverLayout from 'layouts/authentication/components/CoverLayout';
// import {}
// Images
import curved9 from 'assets/images/curved-images/curved-6.jpg';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const [rememberMe, setRememberMe] = useState(true);

    const handleSetRememberMe = () => setRememberMe(!rememberMe);

    const handleSubmit = (event) => {
        AuthService.login(email, password).then(
            () => {
                navigate('/home');
                // window.location.reload();
            },
            (error) => {
                const resMessage =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();

                // setLoading(false);
                setMessage(resMessage);
            },
        );
        // let data = {
        //     username: 'maihung',
        //     role: 'Admin',
        // };
        // localStorage.setItem('user', JSON.stringify(data));
    };

    return (
        <CoverLayout title="Welcome back" description="Enter your email and password to sign in" image={curved9}>
            <SoftBox component="form" role="form">
                <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                            Email
                        </SoftTypography>
                    </SoftBox>
                    <SoftInput
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </SoftBox>
                <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                            Password
                        </SoftTypography>
                    </SoftBox>
                    <SoftInput
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </SoftBox>
                <SoftBox display="flex" alignItems="center">
                    <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                    <SoftTypography
                        variant="button"
                        fontWeight="regular"
                        onClick={handleSetRememberMe}
                        sx={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                        &nbsp;&nbsp;Remember me
                    </SoftTypography>
                </SoftBox>
                {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </div>
                )}
                <SoftBox mt={4} mb={1}>
                    <SoftButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
                        sign in
                    </SoftButton>
                </SoftBox>
                <SoftBox mt={3} textAlign="center">
                    <SoftTypography variant="button" color="text" fontWeight="regular">
                        Don&apos;t have an account?{' '}
                        <SoftTypography
                            component={Link}
                            to="/authentication/sign-up"
                            variant="button"
                            color="info"
                            fontWeight="medium"
                            textGradient
                        >
                            Sign up
                        </SoftTypography>
                    </SoftTypography>
                </SoftBox>
            </SoftBox>
        </CoverLayout>
    );
}

export default SignIn;
