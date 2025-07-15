import React, { useEffect } from "react";
import { useAuth } from "../auth/GlobalAuthcontext/AuthContext";
import { ToggleTheme } from "../../store/useStore";
import { DarkBtn, LightBtn, LightOutlineBtn } from "../Global-Theme/GlobalTheme";
import { motion } from "motion/react"
import useMediaQuery from "@mui/material/useMediaQuery";
import "./Home.css"
function Home({ navigate, GradientCircularProgress }) {
    const [loading, setLoading] = React.useState(false);
    const { currentUser } = useAuth();
    const { themes } = ToggleTheme();
    const isMobile = useMediaQuery('(max-width:600px)');

    useEffect(() => {

        if (currentUser) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                navigate('/dashboard');
            }, 2000);

        }
    }, [currentUser, navigate])
    const handleRedirect = (type) => {
        setLoading(true);

        if (!isMobile) {
            setTimeout(() => {
                setLoading(false);
                navigate(type === "login" ? "/login" : "/registration");
            }, 2000);
        } else {
            setLoading(false);
            navigate(type === "login" ? "/login" : "/registration");
        }
    };

    return (

        <>
            {
                isMobile ? <>
                    <div className="home-view ">
                        <div className="d-flex flex-column justify-content-end align-content-center h-100 w-100 p-4 g-5  ">
                            <div className=" d-flex flex-column justify-content-center w-100 align-items-center gap-4" >
                                <h1>Welcome to DevPlayground</h1>
                                <span className="home-view-span"> Join over 10.000 learners over the World and  enjoy online  education !</span>
                            </div>

                            <div className="d-flex flex-column justify-content-center gap-4 mt-4">
                                <button onClick={() => handleRedirect("signup")} className="home-view-button mt-4 p-3 rounded-4"> Create an Account</button>
                                <span className=" home-view-span d-flex flex-row justify-content-center align-items-center  gap-3">Already have an account? <span onClick={() => handleRedirect("login")} style={{ cursor: 'pointer' }} className=" fs-5"> Log in</span></span>
                            </div>
                        </div>

                    </div>

                </> :
                    <>
                        <div className='d-flex flex-column justify-content-center w-100 align-items-center vh-100 ' >
                            <div className='btn-div d-flex flex-column flex-lg-row justify-content-center gap-4 w-100 vh-20 position-relative'>
                                {loading && (
                                    <span className='progress-loader blurred-box'>
                                        <GradientCircularProgress />
                                    </span>
                                )}

                                <motion.button
                                    whileHover={{ scale: 1.08 }}
                                    onClick={() => handleRedirect("login")}
                                    className='p-2 w-100 mx-sm-auto rounded fs-6 '
                                    style={{
                                        background: themes === "Dark" ? DarkBtn.backgroundcolor : LightBtn.mainBackground,
                                        color: themes === "Dark" ? DarkBtn.txtColor : "white",
                                        border: 'none'
                                    }}
                                >
                                    Login
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.08 }}
                                    onClick={() => handleRedirect("signup")}
                                    className='p-2 w-100 mx-sm-auto rounded  fs-6'
                                    style={{
                                        background: themes === "Dark" ? LightOutlineBtn.backgroundcolor : 'white',
                                        border: themes === "Dark" ? LightOutlineBtn.border : LightBtn.border,
                                        color: themes === "Dark" ? LightOutlineBtn.txtColor : LightBtn.txtColor,
                                    }}
                                >
                                    Signup
                                </motion.button>
                            </div>
                        </div >
                    </>
            }
        </>

    );
}

export default Home;
