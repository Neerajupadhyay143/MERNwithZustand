import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from 'react-router-dom';

function LandingPageFooter() {
    const navigate = useNavigate();


    return (
        <footer className="bg-dark text-light pt-5 pb-3 mt-5">
            <div className="container">
                <div className="row">

                    {/* About */}
                    <div className="col-md-4 mb-4">
                        <h5 className="mb-3">About Us</h5>
                        <p>
                            We are dedicated to helping you enhance your technical skills through interactive learning and real-world projects.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-md-4 mb-4">
                        <h5 className="mb-3">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li style={{ cursor: 'pointer' }}><a className="text-light text-decoration-none">Home</a></li>
                            <li style={{ cursor: 'pointer' }}><a className="text-light text-decoration-none">About</a></li>
                            <li style={{ cursor: 'pointer' }}><a className="text-light text-decoration-none">Contact</a></li>
                            <li style={{ cursor: 'pointer' }} onClick={() => navigate('/registration')}><a className="text-light text-decoration-none">Signup</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col-md-4 mb-4">
                        <h5 className="mb-3">Contact</h5>
                        <p><EmailIcon fontSize="small" /> neerajkumarsharma013@gmail.com</p>
                        <p><PhoneIcon fontSize="small" /> +91 63502 07562</p>
                        <div>
                            <a
                                href="https://www.instagram.com/swiftsnipp/"
                                className="text-light me-3"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <InstagramIcon />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/neeraj-kumar-sharma-48ab30241/"
                                className="text-light"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <LinkedInIcon />
                            </a>
                        </div>
                    </div>

                </div>

                <hr className="border-light" />
                <div className="text-center">
                    <small>&copy; {new Date().getFullYear()} Neeraj Kumar Sharma. All rights reserved.</small>
                </div>
            </div>
        </footer>
    );
}

export default LandingPageFooter;
