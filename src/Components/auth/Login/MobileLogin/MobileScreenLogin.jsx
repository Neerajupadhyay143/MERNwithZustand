import React, { useEffect, useState } from 'react'
import { ScreensToggle, ToggleTheme } from '../../../../store/useStore'
import { Dark, DarkBtn, DarkOutlineBtn, Light, LightBtn, LightOutlineBtn } from '../../../Global-Theme/GlobalTheme';
import google from "../../../common-components/Common-assets/images/google.png"
import MobileEmailScreen from '../MobileEmailScreen/MobileEmailScreen';
import ResetPassword from '../ResetPasswordScreen/ResetPassword';
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../../Firebase-auth/firebase-config";
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
function MobileScreenLogin() {

    const { themes } = ToggleTheme();
    const { loginScreen, screen, emailScreen, } = ScreensToggle();
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        try {
            signInWithPopup(auth, provider).then((res) => {
                const user = res.user;
                console.log("Google Sign-in Success", user);
                enqueueSnackbar("Logged in successfully!", { variant: 'success' });
                navigate('/dashboard');
            }).catch((error) => {
                console.error("Google Sign-in Error", error);
                enqueueSnackbar("Login Failed!", { variant: 'error' });
            })

        } catch (error) {
            console.log("error comes to login in the dashboard", error);

        }
    }

    return (
        <div style={{
            background: themes == "Dark" ? Dark.mainBackground : Light.mainBackground,
        }} className='d-flex flex-column justify-content-center align-items-center vh-100 p-4 '>
            <div className=' d-flex flex-column justify-content-between float-start h-100 mt-4 w-100 '>
                <div className='text-center d-flex flex-column gap-5 w-100'>
                    {screen === "login " || "email" ? <> <h3 style={{ color: themes === "Dark" ? Dark.txtColor : Light.txtColor, fontWeight: 500 }}>Login into account</h3></> : <> <h3 style={{ color: themes === "Dark" ? Dark.txtColor : Light.txtColor, fontWeight: 500 }}>Reset Password</h3></>}


                    {screen === "login" &&
                        <div className='d-flex flex-column align-items-center gap-3'>
                            <div style={{ color: themes === "Dark" ? Dark.txtColor : Light.txtColor, fontWeight: 500, fontSize: '1.2em', fontFamily: "sans-serif" }} className=''>
                                <p> Welcome back !</p>
                                <p>Let's continue learning</p>
                            </div>

                            <div className='d-flex flex-column  justify-content-center gap-4 w-100'>
                                <button
                                    onClick={() => emailScreen()}
                                    className='p-3  rounded-4 w-100 '
                                    style={{

                                        background: themes == "Dark" ? DarkBtn.backgroundcolor : LightBtn.backgroundcolor,
                                        border: themes == "Dark" ? DarkBtn.border : LightBtn.border,
                                        fontSize: themes == "Dark" ? DarkBtn.fontsize : LightBtn.fontsize,
                                    }}>
                                    Continue with email
                                </button>
                                <span style={{
                                    color: themes === "Dark" ? Dark.subTxt : Light.subTxt,
                                    fontWeight: 500,
                                }} className=' fs-6'>or</span>
                            </div>
                            <div className='w-100'>
                                <button
                                    onClick={() => handleGoogleLogin()}
                                    className='d-flex flex-row justify-content-center align-items-center gap-3 p-3 rounded-4 w-100'
                                    style={{
                                        background: themes == "Dark" ? DarkOutlineBtn.backgroundcolor : LightOutlineBtn.backgroundcolor,
                                        border: themes == "Dark" ? DarkOutlineBtn.border : LightOutlineBtn.border,
                                        fontSize: themes == "Dark" ? DarkBtn.fontsize : LightOutlineBtn.fontsize,
                                        color: themes == "Dark" ? DarkOutlineBtn.txtColor : LightOutlineBtn.color,

                                    }}>
                                    <img src={google} alt="" width={30} height={30} />
                                    Continue with Google
                                </button>
                            </div>
                        </div>}
                    {screen === "email" && <>
                        <MobileEmailScreen />
                    </>}
                    {screen === "resetpassword" && <>
                        <ResetPassword />
                    </>}
                </div>





            </div>
            <footer
                style={{
                    color: themes === "Dark" ? "gray" : Light.txtColor,
                }}
                className=' text-center lh-lg fs-6  '>
                <p>By using DevPlaygrouond , you agree to the <strong>Trems</strong> and <strong>Privacy Policy</strong> </p>
            </footer>
        </div >

    )
}

export default MobileScreenLogin
