import React, { useState } from 'react'
import { ToggleTheme } from '../../../../../store/useStore'
import { Dark, DarkBtn, DarkOutlineBtn, Light, LightBtn, LightOutlineBtn } from '../../../../Global-Theme/GlobalTheme'
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl'
import { Drawer, IconButton, useMediaQuery, Divider, List, ListItemButton, ListItemIcon, ListItemText, Switch } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PersonIcon from '@mui/icons-material/Person'
import NotificationsIcon from '@mui/icons-material/Notifications'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../../../../Firebase-auth/firebase-config'

function TodonavBar() {
    const { themes, lightTheme, DarkTheme } = ToggleTheme()
    const [open, setOpen] = useState(false)
    const isMobile = useMediaQuery('(max-width:768px)')

    const navigate = useNavigate();
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return
        }
        setOpen(open)
    }
    const toggleTheme = () => {
        if (themes === 'Dark') {
            lightTheme()
        } else {
            DarkTheme()
        }
    }

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


    return (
        <div
            style={{ background: themes === 'Dark' ? Dark.backgroundcolor : Light.backgroundcolor }}
            className='d-flex flex-row justify-content-between align-items-center p-3'
        >
            <div className='d-flex flex-row justify-content-center align-items-center gap-3'>
                <div>
                    <ChecklistRtlIcon sx={{ mt: '-10px', color: themes === 'Dark' ? LightBtn.txtColor : 'white' }} />
                </div>
                <div>
                    <h3 style={{ color: themes === 'Dark' ? LightBtn.txtColor : 'white' }}>ModernToDo</h3>
                </div>
            </div>

            <div>
                <IconButton onClick={toggleDrawer(true)}>
                    {isMobile ? (
                        <SettingsIcon sx={{ color: themes === 'Dark' ? LightBtn.txtColor : 'white' }} />
                    ) : (
                        <button
                            className='rounded-4 fs-6'
                            style={{
                                padding: '7px',
                                width: '120px',
                                fontWeight: 500,
                                color: themes === 'Dark' ? DarkOutlineBtn.txtColor : 'white',
                                background: themes === 'Dark' ? DarkBtn.backgroundcolor : LightOutlineBtn.backgroundcolor,
                                border: themes === 'Dark' ? DarkBtn.border : '2px solid white',
                            }}
                        >
                            Setting
                        </button>
                    )}
                </IconButton>

                <Drawer
                    anchor='right'
                    open={open}
                    onClose={toggleDrawer(false)}
                    PaperProps={{
                        sx: {
                            width: isMobile ? '100%' : '300px',
                            background: themes === 'Dark' ? Dark.backgroundcolor : Light.backgroundcolor,
                            color: themes === 'Dark' ? LightBtn.txtColor : 'white',
                        },
                    }}
                >
                    <div className='p-4'>
                        {/* Back button */}
                        <div className='d-flex align-items-center mb-3'>
                            <IconButton onClick={toggleDrawer(false)}>
                                <ArrowBackIosNewIcon sx={{ color: themes === 'Dark' ? LightBtn.txtColor : 'white' }} />
                            </IconButton>
                            <h5 className='ms-2 mb-0'>Settings</h5>
                        </div>

                        <Divider sx={{ mb: 2, background: themes === 'Dark' ? '#444' : '#ccc' }} />

                        {/* Drawer options */}
                        <List>
                            <ListItemButton onClick={() => navigate('/dashboard')}>
                                <ListItemIcon >
                                    <DashboardIcon sx={{ color: themes === 'Dark' ? LightBtn.txtColor : 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary='Dashboard' />
                            </ListItemButton>

                            <Divider sx={{ background: themes === 'Dark' ? '#444' : '#ccc' }} />

                            <ListItemButton>
                                <ListItemIcon>
                                    <PersonIcon sx={{ color: themes === 'Dark' ? LightBtn.txtColor : 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary='My Profile' />
                            </ListItemButton>

                            <Divider sx={{ background: themes === 'Dark' ? '#444' : '#ccc' }} />

                            <ListItemButton>
                                <ListItemIcon>
                                    <NotificationsIcon sx={{ color: themes === 'Dark' ? LightBtn.txtColor : 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary='Notifications' />
                            </ListItemButton>

                            <Divider sx={{ background: themes === 'Dark' ? '#444' : '#ccc' }} />

                            <ListItemButton onClick={toggleTheme} >
                                <ListItemIcon>
                                    <DarkModeIcon sx={{ color: themes === 'Dark' ? LightBtn.txtColor : 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary='Change Theme' />
                                <Switch
                                    checked={themes === 'Dark'}
                                    onChange={toggleTheme}
                                    color='default'
                                    sx={{
                                        '& .MuiSwitch-thumb': {
                                            backgroundColor: themes === 'Dark' ? 'white' : 'white',
                                        },
                                    }}
                                />
                            </ListItemButton>

                            <Divider sx={{ background: themes === 'Dark' ? '#444' : '#ccc' }} />

                            <ListItemButton onClick={handleLogout}>
                                <ListItemIcon>
                                    <LogoutIcon sx={{ color: themes === 'Dark' ? LightBtn.txtColor : 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary='Logout' />
                            </ListItemButton>
                        </List>
                    </div>
                </Drawer>
            </div>
        </div>
    )
}

export default TodonavBar
