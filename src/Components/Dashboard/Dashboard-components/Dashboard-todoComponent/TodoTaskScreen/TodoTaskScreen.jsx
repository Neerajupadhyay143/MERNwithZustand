import React, { useState } from 'react'
import { useMediaQuery, BottomNavigation, BottomNavigationAction, Paper, Avatar, SpeedDial, SpeedDialAction, Drawer, IconButton, Divider } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import CloseIcon from '@mui/icons-material/Close'
import { OpenTodo, ToggleTheme } from '../../../../../store/useStore'
import { Dark, DarkBtn, Light, LightOutlineBtn, LightBtn } from '../../../../Global-Theme/GlobalTheme'
import { motion, AnimatePresence } from 'framer-motion'
import TodonavBar from '../Todonavbar/TodonavBar'
import TodoTaskScreen2 from './TodoTaskScreen2'
import { getThemeComponents } from '../../../../Global-Theme/getThemeComponents'
import { getToken } from "firebase/messaging";
import { messaging } from "../../../../../Firebase-auth/firebase-config";

function TodoTaskScreen() {
    const [value, setValue] = useState(0)
    const [notifOpen, setNotifOpen] = useState(false)
    const [desktopNotifOpen, setDesktopNotifOpen] = useState(false)
    const isDesktop = useMediaQuery('(min-width:1024px)')
    const { themes } = ToggleTheme()
    const { Todois, openTodo, closeTodo } = OpenTodo();
    const { base, btn, input: inputStyle } = getThemeComponents(themes);
    const actions = [
        { icon: <HomeIcon />, name: 'Home' },
        { icon: <SearchIcon />, name: 'Search' },
        { icon: <AddIcon onClick={() => openTodo()} />, name: 'Add' },
        {
            icon: <NotificationsIcon onClick={() => setDesktopNotifOpen(true)} />,
            name: 'Notifications',
        },
        { icon: <Avatar alt="N" src="https://i.pravatar.cc/300" sx={{ width: 30, height: 30 }} />, name: 'Profile' },
    ]

    const getNavBgColor = () => (themes === "Dark" ? Dark.backgroundcolor : Light.backgroundcolor)
    const getNavTxtColor = () => (themes === "Dark" ? DarkBtn.txtColor : "white")



    const requestForToken = async () => {
        try {
            const token = await getToken(messaging, {
                vapidKey: "YOUR_VAPID_KEY",
            });
            if (token) {
                console.log("FCM Token:", token);
                // Save this token to Firestore under user's doc
            }
        } catch (err) {
            console.error("FCM Token Error:", err);
        }
    };

    const onMessageListener = () =>
        new Promise((resolve) => {
            onmessage(messaging, (payload) => {
                resolve(payload);
            });
        });
    return (
        <>
            <TodonavBar />
            <div className='text-dark' style={{ paddingBottom: isDesktop ? '0px' : '70px' }}>
                <TodoTaskScreen2 />


                {/* Bottom Navigation for Mobile */}
                {!isDesktop && (
                    <Paper
                        sx={{
                            position: 'fixed',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background: getNavBgColor(),
                            color: getNavTxtColor(),
                        }}
                        elevation={3}
                    >
                        <BottomNavigation
                            showLabels
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue)
                            }}
                            sx={{
                                background: getNavBgColor(),
                                '& .Mui-selected': {
                                    color: themes === "Dark" ? "white" : "white"
                                },
                                '& .MuiBottomNavigationAction-root': {
                                    color: themes === "Dark" ? "gray" : "gray"
                                }
                            }}
                        >
                            <BottomNavigationAction label="Home" icon={<HomeIcon sx={{ color: themes === "Dark" ? "white" : "white" }} />} />
                            <BottomNavigationAction label="Search" icon={<SearchIcon sx={{ color: themes === "Dark" ? "white" : "white" }} />} />
                            <BottomNavigationAction
                                onClick={() => openTodo()}
                                icon={
                                    <AddIcon sx={{
                                        fontSize: 50,
                                        mt: '-20px',
                                        color: themes === "Dark" ? "white" : "#6200ee",
                                        background: btn.mainBackground,
                                        borderRadius: '50px',
                                        boxShadow: themes === "Dark"
                                            ? '0px 4px 10px rgba(255, 255, 255, 0.2)'
                                            : '0px 4px 12px rgba(0, 0, 0, 0.3)',

                                    }} />
                                }
                            />
                            <BottomNavigationAction
                                label="Notifications"
                                icon={<NotificationsIcon sx={{ color: themes === "Dark" ? "white" : "white" }} />}
                                onClick={() => setNotifOpen(true)}
                            />
                            <BottomNavigationAction label="Profile" icon={<Avatar alt="N" src="https://i.pravatar.cc/300" sx={{ width: 30, height: 30 }} />} />
                        </BottomNavigation>
                    </Paper>
                )}

                {/* SpeedDial for Desktop */}
                {isDesktop && (
                    <SpeedDial
                        ariaLabel="SpeedDial example"
                        sx={{
                            position: 'fixed',
                            bottom: 16,
                            right: 16,
                        }}
                        icon={<SpeedDialIcon />}
                        FabProps={{
                            sx: {
                                background: themes === "Dark" ? DarkBtn.backgroundcolor : LightOutlineBtn.backgroundcolor,
                                color: themes === "Dark" ? DarkBtn.txtColor : DarkBtn.backgroundcolor,
                                '&:hover': {
                                    background: themes === "Dark" ? DarkBtn.backgroundcolor : LightOutlineBtn.backgroundcolor,
                                }
                            }
                        }}
                    >
                        {actions.map((action) => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                            />
                        ))}
                    </SpeedDial>
                )}

                {/* Notification Drawer for mobile */}
                <Drawer
                    anchor={isDesktop ? "right" : "bottom"}
                    open={notifOpen}
                    onClose={() => setNotifOpen(false)}
                    PaperProps={{
                        sx: {
                            width: isDesktop ? '350px' : '100%',
                            height: isDesktop ? '100%' : '100%',
                            background: themes === 'Dark' ? Dark.backgroundcolor : Light.backgroundcolor,
                            color: themes === 'Dark' ? LightBtn.txtColor : 'white',
                        },
                    }}
                >
                    <div className='p-3 d-flex align-items-center justify-content-between'>
                        <h5 className='mb-0'>Notifications</h5>
                        <IconButton onClick={() => setNotifOpen(false)}>
                            <CloseIcon sx={{ color: themes === 'Dark' ? LightBtn.txtColor : 'white' }} />
                        </IconButton>
                    </div>
                    <Divider sx={{ background: themes === 'Dark' ? '#444' : '#ccc' }} />
                    <div className='p-3'>
                        <p>No new notifications 📭</p>
                    </div>
                </Drawer>

                {/* Desktop Notification Panel (Animated) */}
                <AnimatePresence>
                    {desktopNotifOpen && (
                        <motion.div
                            initial={{ x: 400, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 400, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                            style={{
                                position: 'fixed',
                                bottom: 90,
                                right: 20,
                                width: 300,
                                background: themes === 'Dark' ? Dark.backgroundcolor : Light.backgroundcolor,
                                color: themes === 'Dark' ? LightBtn.txtColor : 'white',
                                borderRadius: '16px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                                zIndex: 2000
                            }}
                        >
                            <div className='p-3 d-flex align-items-center justify-content-between'>
                                <h6 className='mb-0'>Notifications</h6>
                                <IconButton onClick={() => setDesktopNotifOpen(false)}>
                                    <CloseIcon sx={{ color: themes === 'Dark' ? LightBtn.txtColor : 'white' }} />
                                </IconButton>
                            </div>
                            <Divider sx={{ background: themes === 'Dark' ? '#444' : '#ccc' }} />
                            <div className='p-3'>
                                <p>No new notifications 📭</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>

    )
}

export default TodoTaskScreen
