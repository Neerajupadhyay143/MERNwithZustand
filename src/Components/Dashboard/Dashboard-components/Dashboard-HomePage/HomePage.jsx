import React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import image from '../../Dashboard-images/counter.jpg'
import dlimage from '../../Dashboard-images/Lmode.jpg'
import { useNavigate } from 'react-router-dom'
import './HomePage.css'
import Skeleton from '@mui/material/Skeleton'
import { useAuth } from '../../../auth/GlobalAuthcontext/AuthContext'
import { motion } from "motion/react"
import { ToggleTheme } from '../../../../store/useStore'
import { Dark, DarkBtn, Light, LightBtn } from '../../../Global-Theme/GlobalTheme'
import HomeCardComponent from '../../../common-components/CardComponent/HomeCardComponent'

function HomePage() {
    const navigate = useNavigate()
    const { currentUser } = useAuth()
    const { themes } = ToggleTheme();

    const cardTheme = {
        cardBackground: themes === 'Dark' ? Dark.backgroundcolor : Light.mainBackground,
        txtColor: themes === 'Dark' ? Dark.txtColor : Light.txtColor,
        subTxt: themes === 'Dark' ? Dark.subTxt : Light.subTxt,
        btnBackground: themes === 'Dark' ? DarkBtn.backgroundcolor : LightBtn.backgroundcolor,
        btnTxtColor: themes === 'Dark' ? DarkBtn.txtColor : LightBtn.txtColor,
    }

    // Loading condition: jab tak currentUser null hai
    if (currentUser === undefined) {
        return (
            <div className="container container-fluid">
                <div className="row gap-5 justify-content-center">
                    {Array.from(new Array(6)).map((_, index) => (
                        <div
                            key={index}
                            className="col-md-5 col-sm-6 col-lg-3 d-flex justify-content-center  my-5"
                        >
                            <Card
                                sx={{ width: 357, background: 'black', color: 'white', borderRadius: '20px' }}
                            >
                                <Skeleton variant="rectangular" height={140} />
                                <CardContent>
                                    <Skeleton variant="text" height={30} sx={{ bgcolor: 'grey.800' }} />
                                    <Skeleton variant="text" height={20} sx={{ bgcolor: 'grey.800' }} />
                                    <Skeleton variant="text" height={20} sx={{ bgcolor: 'grey.800' }} width="80%" />
                                </CardContent>
                                <CardActions>
                                    <Skeleton
                                        variant="rectangular"
                                        height={35}
                                        width={100}
                                        sx={{ borderRadius: '7px', bgcolor: 'grey.800' }}
                                    />
                                </CardActions>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    // Actual content jab currentUser available hai
    return (
        <div className="container container-fluid vh-100">
            <h2 style={{ color: themes === "Dark" ? Dark.txtColor : Light.txtColor }} className="text-center m-5 fw-semibold">
                Welcome, {currentUser?.displayName || 'Guest'}!
            </h2>

            <div className="row gap-5 justify-content-center">
                {/* Zustand Counter Card */}
                <div className="col-md-5 col-sm-6 col-lg-3 d-flex justify-content-center">
                    <HomeCardComponent
                        image={image}
                        title='Counter by " Zustand "'
                        description='Zustand is a small, fast, and scalable state management library for React with a minimal API.'
                        buttonText='Check out'
                        onButtonClick={() => navigate('counter')}
                        themeColors={cardTheme}
                        hoverScale={1.09}
                    />
                </div>
                <div className="col-md-5 col-sm-6 col-lg-3 d-flex justify-content-center">
                    <HomeCardComponent
                        image={dlimage}
                        title='Dark/Light Mode by " Zustand "'
                        description='Manage dark and light theme globally using Zustand, a fast and minimal state management tool..'
                        buttonText='Check out'
                        onButtonClick={() => navigate('themepage')}
                        themeColors={cardTheme}
                        hoverScale={1.09}
                    />
                </div>
            </div>
        </div>
    )
}

export default HomePage
