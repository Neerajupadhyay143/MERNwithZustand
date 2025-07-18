import React from 'react';
import { motion } from 'framer-motion';
import { Code, Group, EmojiObjects } from '@mui/icons-material';
import { Card, CardContent } from '@mui/material';

import { getThemeComponents } from '../../../Global-Theme/getThemeComponents';
import { ToggleTheme } from '../../../../store/useStore';

function LandingPageAboutUs() {
    const { themes } = ToggleTheme();
    const { base, btn } = getThemeComponents(themes);

    const aboutData = [
        {
            title: "Skilled Developers",
            description: "We are a team of passionate developers working on modern technologies.",
            icon: <Code sx={iconStyle} />
        },
        {
            title: "Community Driven",
            description: "We aim to build a learning-first platform for everyone to grow together.",
            icon: <Group sx={iconStyle} />
        },
        {
            title: "Innovative Projects",
            description: "We believe in solving real-world problems with creativity and technology.",
            icon: <EmojiObjects sx={iconStyle} />
        }
    ];

    return (
        <div className='container py-5 px-4' id="about">
            {/* Header */}
            <motion.div
                className="text-center mb-5"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 style={{ color: base.txtColor }} className="fw-bold">About Us</h2>
                <p style={{ color: btn.subTxt }}>Who we are and what we strive for.</p>
            </motion.div>

            {/* Cards */}
            <div className="row g-4">
                {aboutData.map((item, index) => (
                    <motion.div
                        key={index}
                        className="col-md-4"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        viewport={{ once: true }}
                    >
                        <Card
                            style={{
                                background: base.cardBackground,
                                color: base.txtColor,
                                borderRadius: '14px',
                                boxShadow: base.carBoxShadow
                            }}
                        >
                            <CardContent>
                                <div className="d-flex flex-column align-items-start gap-3">
                                    {item.icon}
                                    <h5 className='fw-bold'>{item.title}</h5>
                                    <p style={{ color: btn.subTxt }}>{item.description}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

// MUI Icon style
const iconStyle = {
    fontSize: 40,
    color: '#6400CD',
    border: '2px solid #6400CD',
    borderRadius: '50%',
    padding: '8px'
};

export default LandingPageAboutUs;
