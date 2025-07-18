import React from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, Grid, Link } from '@mui/material';
import {
    LocationOn,
    Email,
    Phone,
    Facebook,
    Twitter,
    Instagram,
    LinkedIn
} from '@mui/icons-material';

import { ToggleTheme } from '../../../../store/useStore';
import { getThemeComponents } from '../../../Global-Theme/getThemeComponents';
import { useNavigate } from 'react-router-dom';

function LandingPageContactUs() {
    const { themes } = ToggleTheme();
    const { base } = getThemeComponents(themes);
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                width: '100%',
                bgcolor: base.bgColor,
                color: base.txtColor,
                py: 6,
                px: { xs: 3, sm: 10 },
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <Typography variant="h4" align="center" fontWeight="bold" mb={5}>
                    Contact Us
                </Typography>

                <Grid container spacing={5}>
                    {/* Contact Info */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" mb={2}>Get in Touch</Typography>
                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                            <LocationOn />
                            <Typography>123, Tech Street, Jaipur, India</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                            <Email />
                            <Typography>support@techskills.com</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                            <Phone />
                            <Typography>+91 98765 43210</Typography>
                        </Box>
                    </Grid>

                    {/* Terms & Policies */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" mb={2}>Important Links</Typography>
                        <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2' }}>
                            <li style={{ cursor: 'pointer' }} onClick={() => navigate('/terms_and_conditions')}><Link underline="hover" color="inherit">Terms & Conditions</Link></li>
                            <li><Link href="#" underline="hover" color="inherit">Privacy Policy</Link></li>
                            <li><Link href="#" underline="hover" color="inherit">Refund Policy</Link></li>
                            <li><Link href="#" underline="hover" color="inherit">Support</Link></li>
                        </ul>
                    </Grid>

                    {/* Social Links */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" mb={2}>Follow Us</Typography>
                        <Box display="flex" gap={2}>
                            <Link href="#" color="inherit"><Facebook fontSize="large" /></Link>
                            <Link href="#" color="inherit"><Twitter fontSize="large" /></Link>
                            <Link href="#" color="inherit"><Instagram fontSize="large" /></Link>
                            <Link href="#" color="inherit"><LinkedIn fontSize="large" /></Link>
                        </Box>
                    </Grid>
                </Grid>

                {/* Copyright */}
                <Box textAlign="center" mt={6} pt={3} borderTop={`1px solid ${base.borderColor}`}>
                    <Typography variant="body2">
                        © {new Date().getFullYear()} TechSkills. All Rights Reserved.
                    </Typography>
                </Box>
            </motion.div>
        </Box>
    );
}

export default LandingPageContactUs;
