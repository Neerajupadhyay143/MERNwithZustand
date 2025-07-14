import React, { useEffect } from "react";
import { useAuth } from "../auth/GlobalAuthcontext/AuthContext";
import { ToggleTheme } from "../../store/useStore";
import { DarkBtn, LightBtn, LightOutlineBtn } from "../Global-Theme/GlobalTheme";
import { motion } from "motion/react"
function Home({ navigate, GradientCircularProgress }) {
    const [loading, setLoading] = React.useState(false);
    const { currentUser } = useAuth();
    const { themes } = ToggleTheme();

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
        setTimeout(() => {
            setLoading(false);
            navigate(type === "login" ? "/login" : "/registration");
        }, 2000);
    };

    return (
        <div className='d-flex flex-column justify-content-center w-100 align-items-center vh-100 '>
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
    );
}

export default Home;
