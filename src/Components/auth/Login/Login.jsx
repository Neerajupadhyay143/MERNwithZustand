import React, { useEffect, useState } from 'react'
import "../Regestration/Regestration.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../Firebase-auth/firebase-config';
import { useAuth } from '../GlobalAuthcontext/AuthContext';
import { ToggleTheme } from '../../../store/useStore';
import { Dark, DarkBtn, Light, LightBtn, LightInput } from '../../Global-Theme/GlobalTheme';
function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const { themes } = ToggleTheme();
    useEffect(() => {
        if (currentUser) {
            navigate('/dashboard');
        }
    }, [currentUser, navigate]);
    const handleLogin = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Login Success:", userCredential.user.displayName);
                localStorage.setItem("username", userCredential.user.displayName);
                navigate('/dashboard');
            })
            .catch((error) => {
                console.log("Firebase Login Error", error);
                setError("Invalid email or password");
            });
    };

    return (
        <>

            <form onSubmit={handleLogin}>
                <div className='vh-100 d-flex justify-content-center align-items-center w-100'>
                    <div style={{ background: themes === "Dark" ? Dark.backgroundcolor : Light.backgroundcolor }} className=' bg-blur p-4 rounded shadow border-0 '>
                        <h1 className=' fs-3 text-center border-2 border-primary rounded p-2'>
                            Login Form
                        </h1>
                        <div className='form-data'>
                            <label style={{ color: themes === "Dark" ? Dark.subTxt : Dark.txtColor }} >Email</label>
                            <input
                                style={{ background: themes === "Dark" ? '' : LightInput.background }}
                                className='p-2 rounded border-0 mt-1 text-decoration-none  '
                                placeholder='Enter your Email'
                                onChange={(e) => { setEmail(e.target.value) }}
                                name='email' />
                            <span></span>
                        </div>

                        <div className='form-data'>
                            <label style={{ color: themes === "Dark" ? Dark.subTxt : Dark.txtColor }} >Password</label>
                            <input
                                style={{ background: themes === "Dark" ? '' : LightInput.background }}
                                className='p-2 rounded border-0 mt-1'
                                placeholder='Enter your Password'
                                name='password'
                                onChange={(e) => { setPassword(e.target.value) }} />
                            <span></span>
                        </div>
                        {error && <p className="text-danger">{error}</p>}
                        <button
                            style={{
                                background: themes === "Dark" ? DarkBtn.backgroundcolor : LightBtn.backgroundcolor,
                                color: themes === "Dark" ? DarkBtn.txtColor : LightBtn.txtColor,
                            }}
                            type='submit' className='submit-btn mt-3'> Submit</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Login
