import React, { useEffect, useState } from 'react'
import { Dark, DarkBtn, DarkInput, Light, LightBtn, LightInput } from '../../../Global-Theme/GlobalTheme';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ScreensToggle, ToggleTheme } from '../../../../store/useStore';
import { useNavigate } from 'react-router-dom';
import * as motion from "motion/react-client"
import { useAuth } from '../../GlobalAuthcontext/AuthContext';
import { auth } from '../../../../Firebase-auth/firebase-config';
import useMediaQuery from '@mui/material/useMediaQuery';
function MobileEmailScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const { screen, resetpasswordScreen } = ScreensToggle();
    const { themes } = ToggleTheme();
    useEffect(() => {
        if (currentUser) {
            navigate('/dashboard');
        }
    }, [currentUser, navigate]);
    const handleLogin = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Login Success:", userCredential.user.displayName);
                localStorage.setItem("username", userCredential.user.displayName);
                navigate('/dashboard');
            })
            .catch((error) => {
                console.log("Firebase Login Error", error);
                setError("Invalid email or password");
            });
    };




    return (
        <>
            {screen === "email" &&
                <form form onSubmit={handleLogin} >
                    <div style={{ justifyContent: 'center' }} className='  d-flex justify-content-center w-100  '>
                        <motion.div
                            initial={{ opacity: 0, x: 300 }}    // right se start
                            animate={{ opacity: 1, x: 0 }}      // 0 pe aake settle
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

                            <div className="form-data align-items-start  w-100">
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
                                <span></span>
                            </div>

                            <div className="form-data align-items-start w-100">
                                <label style={{ color: themes === "Dark" ? Dark.subTxt : Dark.subTxt }}>Password</label>
                                <input
                                    style={{
                                        background: themes === "Dark" ? "" : LightInput.background,
                                        border: themes === "Dark" ? DarkInput.border : LightInput.border,
                                        color: themes === "Dark" ? "white" : "black"
                                    }}
                                    className="p-3 rounded w-100 mt-1 text-decoration-none"
                                    placeholder="Enter your Password"
                                    name="password"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                                {error && <p className="text-danger">{error}</p>}
                            </div>
                            <button
                                style={{
                                    background: themes === "Dark" ? DarkBtn.backgroundcolor : LightBtn.backgroundcolor,
                                    color: themes === "Dark" ? DarkBtn.txtColor : LightBtn.txtColor,
                                    opacity: email && password ? 1 : 0.5,
                                    cursor: email && password ? 'pointer' : 'not-allowed',
                                }}
                                type="submit"
                                className="submit-btn mt-3 p-3"
                                disabled={!email || !password}
                            >
                                Submit
                            </button>

                            <div className='d-flex flex-column justify-content-center  align-content-center' >
                                <div className=' d-flex flex-column justify-content-center mt-4'>
                                    <span
                                        onClick={() => resetpasswordScreen()}
                                        style={{
                                            color: themes === "Dark" ? Dark.txtColor : Light.txtColor,
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                        }} className='fw-normal'>Forgot passowrd ?</span>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </form >
            }
        </>
    )
}

export default MobileEmailScreen
