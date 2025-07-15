import React, { useState } from 'react'
import { ScreensToggle, ToggleTheme } from '../../../../store/useStore';
import * as motion from "motion/react-client"
import { Dark, DarkBtn, DarkInput, Light, LightBtn, LightInput } from '../../../Global-Theme/GlobalTheme';
import { fetchSignInMethodsForEmail, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../../Firebase-auth/firebase-config';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
function ResetPassword() {
    const { screen, loginScreen, resetpasswordScreen } = ScreensToggle();
    const { themes } = ToggleTheme();
    const [email, setEmail] = useState();
    const [loading, setLoading] = useState(false);


    function GradientCircularProgress() {
        return (
            <React.Fragment>
                <svg width={0} height={0}>
                    <defs>
                        <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#e01cd5" />
                            <stop offset="100%" stopColor="#1CB5E0" />
                        </linearGradient>
                    </defs>
                </svg>
                <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
            </React.Fragment>
        );
    }

    const handleResetPassword = async () => {
        if (!email) {
            enqueueSnackbar('Please enter your email', { variant: 'warning' });
            return;
        }
        
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            enqueueSnackbar('Please enter a valid email address', { variant: 'error' });
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email).then(() => {
                enqueueSnackbar('Password reset email sent!', { variant: 'success' });
                setTimeout(() => {
                    setLoading(true);
                }, 1000)
                setTimeout(() => {
                    loginScreen();
                }, 2500);
            }).catch((error) => {

                console.error("Reset error:", error);
                enqueueSnackbar('Failed to send reset email', { variant: 'error' });
            })
        } catch (error) {
            console.error("Error occur Rest password : ", error)
        }

    }


    return (
        <div>
            <motion.div
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 80,
                    damping: 12,
                }}
                style={{
                    background: themes === "Dark" ? "none" : Light.mainBackground,
                }}
                className="w-100"
            >
                {loading && (
                    <span className='progress-loader blurred-box '>
                        <GradientCircularProgress />
                    </span>
                )}

                <div className="form-data align-items-start ">
                    <label style={{ color: themes === "Dark" ? Dark.subTxt : Dark.subTxt }}>Email</label>
                    <input
                        style={{
                            background: themes === "Dark" ? "" : LightInput.background,
                            border: themes === "Dark" ? DarkInput.border : LightInput.border,
                            color: themes === "Dark" ? "white" : "black"
                        }}
                        className="p-3 rounded w-100 mt-1 text-decoration-none "
                        placeholder="Enter your Email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        name="email"
                    />

                </div>
                <button
                    onClick={() => handleResetPassword()}
                    style={{
                        background: themes === "Dark" ? DarkBtn.backgroundcolor : LightBtn.backgroundcolor,
                        color: themes === "Dark" ? DarkBtn.txtColor : LightBtn.txtColor,
                        opacity: email ? 1 : 0.5,
                        cursor: email ? 'pointer' : 'not-allowed',
                    }}
                    type="submit"
                    className="submit-btn mt-3 p-3"
                    disabled={!email}
                >
                    Submit
                </button>
            </motion.div>

        </div>
    )
}

export default ResetPassword
