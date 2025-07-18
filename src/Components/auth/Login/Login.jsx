import React, { useEffect, useState } from 'react'
import "../Regestration/Regestration.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Login.css"
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../../Firebase-auth/firebase-config';
import { useAuth } from '../GlobalAuthcontext/AuthContext';
import { ToggleTheme } from '../../../store/useStore';
import * as motion from "motion/react-client"
import GoogleIcon from '@mui/icons-material/Google';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import { Dark, DarkBtn, DarkInput, Light, LightBtn, LightInput } from '../../Global-Theme/GlobalTheme';
import useMediaQuery from '@mui/material/useMediaQuery';
import MobileScreenLogin from './MobileLogin/MobileScreenLogin';
import { enqueueSnackbar } from 'notistack';
function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const isMobile = useMediaQuery('(max-width:600px)');
    const smallball = {
        width: 150,
        height: 150,
        borderRadius: "50%",
        position: "absolute",
        top: "10%",
        right: '25%',
        transform: "translate(110px, 50px)",
        background: "radial-gradient(circle at 30% 30%, #555 0%, #222 40%, #111 100%)",
        boxShadow: "inset -20px -20px 60px rgba(255, 255, 255, 0.05), 20px 20px 50px rgba(0, 0, 0, 0.6)"
    };
    const ball = {
        width: 220,
        height: 220,
        backgroundColor: "#bb86fc",
        borderRadius: "50%",
        position: "absolute",
        top: "-10%",
        left: '25%',
        zIndex: 0,
        transform: "translate(110px, 50px)",
    }
    const navigate = useNavigate();
    const { currentUser } = useAuth();

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
        <>

            {!isMobile ? <form onSubmit={handleLogin}>
                <div style={{ justifyContent: 'center' }} className=' vh-100 d-flex justify-content-center align-items-center  w-100  position-relative'>
                    <motion.div
                        initial={{ opacity: 0, x: -200 }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            y: [0, 20, 0],
                        }}
                        transition={{
                            x: {
                                type: "spring",
                                stiffness: 80,      // bounce strength (higher = harder spring)
                                damping: 12,        // how quickly it settles
                            },
                            y: {
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "loop",
                                ease: "easeInOut",
                            },
                        }}
                        style={ball}
                        className="hide-on-mobile"
                    />

                    <motion.div
                        initial={{ opacity: 0, x: 200 }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            y: [20, 0, 20],
                        }}
                        transition={{
                            x: {
                                type: "spring",
                                stiffness: 80,
                                damping: 12,
                            },
                            y: {
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "loop",
                                ease: "easeInOut",
                            },
                        }}
                        style={smallball}
                        className="hide-on-mobile"
                    />

                    <motion.div
                        initial={{ opacity: 0, x: 300 }}    // right se start
                        animate={{ opacity: 1, x: 0 }}      // 0 pe aake settle
                        transition={{
                            type: "spring",
                            stiffness: 80,
                            damping: 12,
                        }}
                        style={{
                            background: themes === "Dark" ? "none" : Light.backgroundcolor,
                        }}
                        className="bg-blur p-4 rounded shadow border-0 mt-5"
                    >
                        <h1 className="fw-bold fs-3 text-center border-2 border-primary rounded p-2">
                            Sign in
                        </h1>

                        <div className="form-data">
                            <label style={{ color: themes === "Dark" ? Dark.subTxt : Dark.txtColor }}>Email</label>
                            <input
                                style={{
                                    background: themes === "Dark" ? "" : LightInput.background,
                                }}
                                className="p-2 rounded border-0 mt-1 text-decoration-none"
                                placeholder="Enter your Email"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                name="email"
                            />
                            <span></span>
                        </div>

                        <div className="form-data">
                            <label style={{ color: themes === "Dark" ? Dark.subTxt : Dark.txtColor }}>Password</label>
                            <input
                                style={{ background: themes === "Dark" ? "" : "white" }}
                                className="p-2 rounded border-0 mt-1"
                                placeholder="Enter your Password"
                                name="password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                            {error && <p className="text-danger">{error}</p>}
                        </div>
                        <span className='d-flex text-center justify-content-center' style={{ color: themes === "Dark" ? Dark.txtColor : Light.txtColor, textAlign: 'center', }}>or</span>
                        <div className="form-data">
                            <div className='d-flex flex-column justify-content-center gap-3 mt-3'>
                                <button onClick={() => handleGoogleLogin()} style={{ border: '3px solid #30303D', fontWeight: 100, }} className='bg-transparent d-flex justify-content-center align-content-center p-2 rounded-4 gap-4 '  ><GoogleIcon /> Continue with Google</button>
                                <button style={{ border: '3px solid #30303D', fontWeight: 100, }} className='bg-transparent  d-flex justify-content-center align-content-center p-2 rounded-4 gap-4 ' ><PermPhoneMsgIcon />Continue with Number</button>
                            </div>
                        </div>


                        <button
                            style={{
                                background: themes === "Dark" ? DarkBtn.backgroundcolor : LightBtn.backgroundcolor,
                                color: themes === "Dark" ? DarkBtn.txtColor : LightBtn.txtColor,
                            }}
                            type="submit"
                            className="submit-btn mt-3"
                        >
                            Submit
                        </button>

                        <div className='d-flex flex-column justify-content-center  align-content-center' >
                            <div className='d-flex  justify-content-center mt-2 gap-4'>
                                <span style={{ color: themes === "Dark" ? Dark.txtColor : Light.txtColor, textAlign: 'center', }} className='fw-normal'>don’t have an account? </span>
                                <span onClick={() => navigate('/registration')} style={{ cursor: 'pointer', color: themes === "Dark" ? Dark.txtColor : Light.txtColor, textAlign: 'center', }} className=' fw-semibold'>Create a account</span>
                            </div>

                            <div className=' d-flex flex-column justify-content-center mt-2'>
                                <span style={{ color: themes === "Dark" ? Dark.txtColor : Light.txtColor, textAlign: 'center', }} className='fw-normal'>Forgot passowrd ?</span>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </form> :
                <>
                    <MobileScreenLogin />
                </>
            }
        </>
    )
}

export default Login
