import { Card, CardContent } from '@mui/material'
import React from 'react'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import PersonIcon from '@mui/icons-material/Person';

import { getThemeComponents } from '../../../Global-Theme/getThemeComponents';
import { ToggleTheme } from '../../../../store/useStore';

import { motion } from 'framer-motion';

function LandingPageTestimonials() {
    const { themes } = ToggleTheme();
    const { base, btn } = getThemeComponents(themes);

    const testimonials = [
        {
            name: "Ravi Sharma",
            feedback: "This platform made it extremely easy for me to manage my daily tasks efficiently. The UI is intuitive and responsive.",
            icon: <PersonIcon style={iconStyle(themes)} />
        },
        {
            name: "Priya Mehta",
            feedback: "The dark mode and performance of the app are just amazing! Great work done by the developer.",
            icon: <PersonIcon style={iconStyle(themes)} />
        },
        {
            name: "Amit Verma",
            feedback: "As a tech enthusiast, I appreciate how clean and smooth the todo features are. Highly recommended!",
            icon: <PersonIcon style={iconStyle(themes)} />
        }
    ];

    const cutOut = (text) => {
        if (text.length > 80) {
            return text.slice(0, 80) + "...";
        }
        return text;
    };

    return (
        <div style={{ background: themes === "Dark" ? '#151515' : "lightGray" }} className='mt-5 p-4 '>
            <div>
                <h3 style={{ color: base.txtColor }} className='text-center fs-4'>What People Say</h3>
            </div>
            <div className='row mt-5'>
                {testimonials.map((item, index) => (
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
                            boxShadow: base.carBoxShadow,
                            border:base.cardBorder
                        }}>
                            <CardContent>
                                <div className='d-flex flex-column gap-3'>
                                    <FormatQuoteIcon style={quoteIconStyle} />
                                    <p style={{
                                        color: btn.subTxt,
                                        lineHeight: '28px',
                                        fontStyle: 'italic'
                                    }}>{cutOut(item.feedback)}</p>
                                    <div className='d-flex align-items-center gap-2'>
                                        {item.icon}
                                        <h5 className='fw-semibold mb-0'>{item.name}</h5>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

const iconStyle = (themes) => ({
    fontSize: '35px',
    color: "#6400CD",
    border: '2px solid',
    borderRadius: '50px',
    padding: '5px'
});

const quoteIconStyle = {
    fontSize: '40px',
    color: "#999",
    marginBottom: '-10px'
};

export default LandingPageTestimonials;
