import React, { useState } from 'react';
import { useMediaQuery, Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { motion } from 'framer-motion'; // ⬅️ Import Framer Motion
import LLogo from "../../../Dashboard/Dashboard-images/LandingLOGO.png";
import { getThemeComponents } from '../../../Global-Theme/getThemeComponents';
import { ToggleTheme } from '../../../../store/useStore';
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

function LandingPageNavbar() {
    const [openDrawer, setOpenDrawer] = useState(false);
    const isMobile = useMediaQuery('(max-width:1002px)');
    const navigate = useNavigate();
    const { themes } = ToggleTheme();
    const { base, btn, outlineBtn } = getThemeComponents(themes);

    return (
        <>
            <div
                style={{
                    background: base.backgroundcolor,
                    color: base.txtColor
                }}
                className='d-flex flex-row justify-content-between align-items-center px-4 py-3'
            >
                {/* Left Slide - Logo and Title */}
                <motion.div
                    className='d-flex align-items-center gap-3'
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <img className='rounded-5' src={LLogo} width={60} height="auto" />
                    <h2 style={{ color: outlineBtn.color }} className='m-0'>DevPlayground</h2>
                </motion.div>

                {/* Right Slide - Nav or Menu */}
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                >
                    {isMobile ? (
                        <IconButton onClick={() => setOpenDrawer(true)}>
                            <MenuIcon sx={{ fontSize: 32, color: base.txtColor }} />
                        </IconButton>
                    ) : (
                        <ul

                            className='d-flex flex-row justify-content-center align-items-center gap-5 m-0' style={{ listStyle: 'none', color: outlineBtn.color }}>
                            <li>Home</li>
                            <li
                                onClick={() => navigate('/aboutus')}
                                style={{ cursor: 'pointer' }}>About Us</li>

                            <li onClick={() => navigate('/contactus')}
                                style={{ cursor: 'pointer' }}>Contact Us</li>
                            <li>
                                <div className='d-flex flex-row gap-3'>
                                    <button
                                        onClick={() => navigate('/login')}
                                        className='p-2 rounded-3'
                                        style={{
                                            background: btn.mainBackground,
                                            border: btn.border,
                                            width: '125px',
                                            color: themes === "Dark" ? "white" : "#6400CD"
                                        }}
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => navigate('/registration')}
                                        className='p-2 rounded-3'
                                        style={{
                                            background: outlineBtn.backgroundcolor,
                                            border: outlineBtn.border,
                                            color: btn.color,
                                            width: '125px'
                                        }}
                                    >
                                        Signup
                                    </button>
                                </div>
                            </li>
                        </ul>
                    )}
                </motion.div>
            </div>

            {/* MUI Drawer for Mobile View */}
            <Drawer
                anchor="right"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                PaperProps={{
                    sx: {
                        width: '100%',
                        height: '100%',
                        backgroundColor: base.backgroundcolor,
                        color: base.txtColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'start',
                        paddingTop: '50px',
                    }
                }}
            >
                <div className='position-relative '>
                    <div style={{ position: "absolute", left: "-70px", top: 0 }}>
                        <button
                            onclick={() => setOpenDrawer(false)}
                            style={{
                                border: 'none',
                                background: 'none'
                            }}>
                            <KeyboardBackspaceIcon />
                        </button>
                    </div>

                    <ul style={{ color: outlineBtn.color }} className="list-unstyled text-center d-flex flex-column gap-4">
                        <li onClick={() => setOpenDrawer(false)} style={{ fontSize: '1.5rem', cursor: 'pointer' }}>
                            Home
                        </li>
                        <li onClick={() => setOpenDrawer(false)} style={{ fontSize: '1.5rem', cursor: 'pointer' }}>
                            About Us
                        </li>
                        <li onClick={() => setOpenDrawer(false)} style={{ fontSize: '1.5rem', cursor: 'pointer' }}>
                            Contact Us
                        </li>
                        <li className='mt-3 d-flex  gap-4 flex-column w-100'>
                            <button

                                className=' p-2 mb-2 rounded-3'
                                onClick={() => {
                                    setOpenDrawer(false);
                                    navigate('/login');
                                }}
                                style={{
                                    background: btn.mainBackground,
                                    border: btn.border,
                                    width: '225px',
                                    color: themes === "Dark" ? "white" : "#6400CD"
                                }}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => {
                                    setOpenDrawer(false);
                                    navigate('/registration');
                                }}
                                className=' p-2 rounded-3'
                                style={{
                                    background: outlineBtn.backgroundcolor,
                                    border: outlineBtn.border,
                                    color: btn.color,
                                    width: '225px'
                                }}
                            >
                                Signup
                            </button>
                        </li>
                    </ul>
                </div>
            </Drawer>

        </>
    );
}

export default LandingPageNavbar;
