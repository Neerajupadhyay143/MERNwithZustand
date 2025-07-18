import React, { useEffect } from "react";
import { useAuth } from "../auth/GlobalAuthcontext/AuthContext";
import { ToggleTheme } from "../../store/useStore";
import { DarkBtn, LightBtn, LightOutlineBtn } from "../Global-Theme/GlobalTheme";
import { motion } from "motion/react"
import useMediaQuery from "@mui/material/useMediaQuery";
import "./Home.css"
import LandingPage from "./CardComponent/LandingPage/LandingPage";
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

            <LandingPage />

        </>

    );
}

export default Home;
