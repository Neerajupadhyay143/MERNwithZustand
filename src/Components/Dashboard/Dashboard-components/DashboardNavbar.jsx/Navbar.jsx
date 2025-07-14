import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img from "../../../common-components/Common-assets/images/clogo.png";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../../../Firebase-auth/firebase-config';
import { ToggleTheme, useStore } from '../../../../store/useStore';
import { Dark, Light } from '../../../Global-Theme/GlobalTheme';
import { motion, AnimatePresence } from 'framer-motion';

import './Navbar.css';

function Navbar() {
    const logo = img;
    const [anchorEl, setAnchorEl] = useState(null);
    const [avatarColor, setAvatarColor] = useState('');
    const [currentUser, setCurrentUser] = useState();
    const open = Boolean(anchorEl);

    const themes = ToggleTheme((state) => state.themes);
    const lightTheme = ToggleTheme((state) => state.lightTheme);
    const DarkTheme = ToggleTheme((state) => state.DarkTheme);

    const navigate = useNavigate();


    const getRandomColor = () => {
        const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFC300', '#8D33FF'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    console.log("Current Theme:", themes);  // ye render ke time chalega



    useEffect(() => {
        setAvatarColor(getRandomColor());
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("User signed out successfully!");
                navigate('/');
            })
            .catch((error) => {
                console.error("Sign out error", error);
            });
    };

    const fisrtname = currentUser?.displayName
        ? currentUser.displayName.slice(0, 1).toUpperCase()
        : "G";

    return (
        <div
            style={{ height: '70px', background: themes === "Dark" ? Dark.backgroundcolor : Light.backgroundcolor }}
            className='d-flex align-items-center justify-content-between px-lg-5 px-3'
        >
            <div onClick={() => navigate('/dashboard')}>
                <img
                    style={{ cursor: 'pointer' }}
                    src={logo}
                    alt="logo"
                    className="logo object-fit-cover"
                    width="100px"
                />
            </div>

            <div>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                        >
                            <Avatar sx={{ width: 42, height: 42, background: avatarColor }}>
                                {fisrtname}
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                </Box>

                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                        paper: {
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,172))',
                                mt: 1.5,
                                bgcolor: themes === "Dark" ? Dark.backgroundcolor : Light.backgroundcolor,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&::before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: themes === "Dark" ? Dark.backgroundcolor : Light.backgroundcolor,
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem sx={{ color: 'whitesmoke' }}>
                        <Avatar /> Profile
                    </MenuItem>
                    <MenuItem sx={{ color: 'whitesmoke' }}>
                        <Avatar /> My account
                    </MenuItem>

                    {/* Theme Toggle */}
                    <MenuItem sx={{ color: 'whitesmoke' }}>
                        {themes === "Dark" ? (
                            <motion.div
                                key="light"
                                initial={{ opacity: 0, backgroundColor: 'rgba(255,255,255,0)' }}
                                animate={{ opacity: 1, }}
                                exit={{ opacity: 0, backgroundColor: 'rgba(255,255,255,0)' }}
                                transition={{ duration: 0.5 }}

                                onClick={() => lightTheme()}>
                                <WbTwilightIcon sx={{ mr: 1 }} /> Light Mode
                            </motion.div>
                        ) : (
                            <motion.div
                                key="dark"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                onClick={() => DarkTheme()}>
                                <BedtimeIcon sx={{ mr: 1 }} />
                                Dark Mode
                            </motion.div>
                        )}
                    </MenuItem>

                    <Divider sx={{ border: themes === "Dark" ? "1px solid gray" : "1px solid white", }} />

                    <MenuItem sx={{ color: 'whitesmoke' }}>
                        <ListItemIcon>
                            <PersonAdd style={{ color: 'white' }} fontSize="small" />
                        </ListItemIcon>
                        Add another account
                    </MenuItem>

                    <MenuItem sx={{ color: 'whitesmoke' }}>
                        <ListItemIcon>
                            <Settings style={{ color: 'white' }} fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>

                    <MenuItem sx={{ color: 'whitesmoke' }} onClick={handleLogout}>
                        <ListItemIcon>
                            <Logout style={{ color: 'white' }} fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </div>
        </div>
    );
}

export default Navbar;
