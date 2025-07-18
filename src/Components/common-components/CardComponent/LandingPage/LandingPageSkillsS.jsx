import { Card, CardContent } from '@mui/material'
import React from 'react'
import CodeIcon from '@mui/icons-material/Code';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { getThemeComponents } from '../../../Global-Theme/getThemeComponents';
import { ToggleTheme } from '../../../../store/useStore';

import { motion } from 'framer-motion';

function LandingPageSkillsS() {
    const { themes } = ToggleTheme();
    const { base, btn } = getThemeComponents(themes);

    const skills = [
        {
            title: "Todo List",
            description: "Created a fully functional todo list with add, delete and update features using React.",
            icon: <CodeIcon style={iconStyle(themes)} />
        },
        {
            title: "Theme Switching",
            description: "Implemented light/dark theme toggle across the application using Zustand & global styling.",
            icon: <FormatPaintIcon style={iconStyle(themes)} />
        },
        {
            title: "Registration with Backend",
            description: "Built registration/login form with backend integration and form validation.",
            icon: <AppRegistrationIcon style={iconStyle(themes)} />
        },
        {
            title: "Counter App",
            description: "Built a simple counter using Zustand and React hooks with UI feedback.",
            icon: <AddCircleOutlineIcon style={iconStyle(themes)} />
        }
    ];

    const cutOut = (text) => {
        if (text.length > 50) {
            return text.slice(0, 65) + "...";
        }
        return text;
    };
    return (
        <div className='mt-5 p-4'>
            <div>
                <h3 style={{ color: base.txtColor }} className='text-center fs-4'>My Skills</h3>
            </div>
            <div className='row mt-5'>
                {skills.map((skill, index) => (
                    <motion.div
                        key={index}
                        className='col-md-6 col-lg-4 mb-4'
                        initial={{ opacity: 0, y: -50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <Card style={{
                            background: base.cardBackground,
                            color: base.txtColor,
                            borderRadius: '12px',
                            boxShadow: base.carBoxShadow
                        }}>
                            <CardContent>
                                <div className='d-flex flex-column align-items-start gap-3'>
                                    {skill.icon}
                                    <h4 className='fw-bold'> {skill.title}</h4>
                                    <h6 style={{
                                        color: btn.subTxt,
                                        lineHeight: '30px',
                                    }}>  {cutOut(skill.description)}</h6>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

// Icon styling helper
const iconStyle = (themes) => ({
    fontSize: '40px',
    color: "#6400CD",
    border: '2px solid',
    borderRadius: '50px',
    padding: '5px'
});

export default LandingPageSkillsS;
