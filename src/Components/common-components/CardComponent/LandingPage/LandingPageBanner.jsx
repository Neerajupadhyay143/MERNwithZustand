import React from 'react'
import banner from "../../../Dashboard/Dashboard-images/landingbanner.jpg";
import { ToggleTheme } from '../../../../store/useStore';
import { getThemeComponents } from '../../../Global-Theme/getThemeComponents';
import { useNavigate } from 'react-router-dom';
import DarkVeil from '../../ResueComponents/DarkVeilBackground/DarkVeil';

function LandingPageBanner() {
    const { themes } = ToggleTheme();
    const { btn } = getThemeComponents(themes);
    const navigate = useNavigate();
    const styles = {
        backdropFilter: 'blur(9px)',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        // borderRadius: '16px',
        padding: '20px',
        minHeight: '10px',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '-20px',
    };

    return (
        <div className="position-relative w-100 overflow-hidden min-vh-50 vh-lg-50" style={{ minHeight: '60vh' }}>
            {/* Banner Image */}

            <div style={{ width: '100%', height: '600px', position: 'relative' }}>
                <DarkVeil

                />
            </div>
            {/* <img
                src={banner}
                alt="Banner"
                className="img-fluid w-100"
                style={{ objectFit: "cover", minHeight: '60vh', maxHeight: '100vh' }}
            /> */}

            {/* Banner Content Overlay */}
            <div className="position-absolute top-50 start-50 translate-middle text-center px-3 w-100">
                <h2 className="fw-bold fs-1 text-white text-shadow">Master Your Tech Skills</h2>
                <p className="fs-5 text-white text-shadow mb-4">Join us to explore the cutting-edge technologies and boost your career.</p>
                <button
                    onClick={() => navigate('/registration')}
                    className="btn px-4 py-2 rounded-pill fs-5"
                    style={{
                        backgroundColor: btn.backgroundcolor,
                        color: btn.txtColor,
                        border: btn.border,
                        width: '165px'
                    }}
                >
                    Get Started
                </button>
            </div>
           
        </div >
    )
}

export default LandingPageBanner;
