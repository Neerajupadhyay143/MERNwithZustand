import React, { useEffect, useState } from 'react';
import "./Regestration.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth } from '../../../Firebase-auth/firebase-config';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useAuth } from '../GlobalAuthcontext/AuthContext';
import { ToggleTheme } from '../../../store/useStore';
import { Dark, DarkBtn, Light, LightBtn, LightInput } from '../../Global-Theme/GlobalTheme';

function Regestration() {
    const userData = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const [user, setUser] = useState(userData);
    const [error, setError] = useState({});
    const [_, setCurrentUser] = useState();
    const [isSubmit, setIsSubmit] = useState(false);
    const { themes } = ToggleTheme();
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const handleuserData = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const validation = () => {
        const newErrors = {};

        // Username validation
        if (!user.username.trim()) {
            newErrors.username = 'Username is required';
        }

        // Email validation
        if (!user.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(user.email)) {
            newErrors.email = 'Invalid email format';
        }

        // Password validation
        if (!user.password) {
            newErrors.password = 'Password is required';
        } else if (user.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        // Confirm Password validation
        if (!user.confirmPassword) {
            newErrors.confirmPassword = 'Confirm Password is required';
        } else if (user.password !== user.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        return newErrors;
    };


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);  // yahan user.displayName set hoga agar registration ke time set kiya tha
            }
        });

        return () => unsubscribe();
    }, []);


    const handlecheck = (variant) => {
        enqueueSnackbar('Regestration successfull !', { variant });
    }
    const handlecheckError = (variant) => {
        enqueueSnackbar('Resestration Failed !', { variant });
    }
    const RegestrationCheck = () => {
        if (currentUser) {
            navigate('/dashboard')
        }
    }
    useEffect(() => {
        RegestrationCheck();
    })
    const handleSubmit = (e,) => {
        e.preventDefault();
        const validationErrors = validation();
        if (Object.keys(validationErrors).length > 0) {
            setError(validationErrors);
            setIsSubmit(false);
            return;
        } else {
            setError({});
            setIsSubmit(true);




            // Firebase user create
            createUserWithEmailAndPassword(auth, user.email, user.password)
                .then((userCredential) => {
                    const createdUser = userCredential.user;

                    updateProfile(createdUser, {
                        displayName: user.username
                    })
                    console.log(createdUser);


                    console.log("Display name set successfully!");


                    // Backend API call
                    axios.post('http://localhost:5000/register', user)
                        .then((response) => {
                            console.log('Server Response', response.data);

                            navigate('/dashboard');
                        })
                        .catch((error) => {
                            console.log("Backend Error", error);
                            if (error.response && error.response.status === 409) {
                                setError({ email: error.response.data.message });
                            }
                        });

                    // Clear form
                    setUser(userData);



                })
                .catch((error) => {
                    console.log("Profile update error:", error);
                    setError({ username: error.message });
                })
                .catch((error) => {
                    console.log("Firebase Error", error);
                    setError({ email: error.message });
                });
        }
    };

    return (
        <>
            <form form onSubmit={handleSubmit} >
                <div className='vh-100 d-flex justify-content-center align-items-center w-100'>
                    <div
                        className='bg-blur p-4 rounded shadow border-0'
                        style={{ background: themes === "Dark" ? Dark.backgroundcolor : Light.backgroundcolor }}
                    >
                        <h1 className='fs-3 text-center border-2 border-primary rounded p-2'>
                            Registration Form
                        </h1>

                        <div className='form-data'>
                            <label style={{ color: themes === "Dark" ? Dark.subTxt : Dark.txtColor }} >Username</label>
                            <input
                                style={{
                                    background: themes === "Dark" ? '' : LightInput.background,
                                    color: themes === "Dark" ? '' : Light.backgroundcolor
                                }}
                                onChange={handleuserData}
                                name='username'
                                value={user.username}
                                className='p-2 rounded border-0 mt-1'
                                placeholder='Enter your username'
                            />
                            {error.username && <span className='text-danger'>{error.username}</span>}
                        </div>

                        <div className='form-data'>
                            <label style={{ color: themes === "Dark" ? Dark.subTxt : Dark.txtColor }}>Email</label>
                            <input
                                style={{
                                    background: themes === "Dark" ? '' : LightInput.background,
                                    color: themes === "Dark" ? '' : Light.backgroundcolor
                                }}
                                onChange={handleuserData}
                                name='email'
                                value={user.email}
                                className='p-2 rounded border-0 mt-1'
                                placeholder='Enter your email'
                            />
                            {error.email && <span className='text-danger'>{error.email}</span>}
                        </div>

                        <div className='form-data'>
                            <label style={{ color: themes === "Dark" ? Dark.subTxt : Dark.txtColor }}>Password</label>
                            <input
                                style={{
                                    background: themes === "Dark" ? '' : LightInput.background,
                                    color: themes === "Dark" ? '' : Light.backgroundcolor
                                }}
                                type="password"
                                onChange={handleuserData}
                                name='password'
                                value={user.password}
                                className='p-2 rounded border-0 mt-1'
                                placeholder='Enter your password'
                            />
                            {error.password && <span className='text-danger'>{error.password}</span>}
                        </div>

                        <div className='form-data'>
                            <label style={{ color: themes === "Dark" ? Dark.subTxt : Dark.txtColor }}>Confirm Password</label>
                            <input
                                style={{
                                    background: themes === "Dark" ? '' : LightInput.background,
                                    color: themes === "Dark" ? '' : Light.backgroundcolor
                                }}
                                type="password"
                                onChange={handleuserData}
                                name='confirmPassword'
                                value={user.confirmPassword}
                                className='p-2 rounded border-0 mt-1'
                                placeholder='Confirm your password'
                            />
                            {error.confirmPassword && <span className='text-danger'>{error.confirmPassword}</span>}
                        </div>

                        <button
                            style={{
                                background: themes === "Dark" ? DarkBtn.backgroundcolor : LightBtn.backgroundcolor,
                                color: themes === "Dark" ? DarkBtn.txtColor : LightBtn.txtColor,
                            }}
                            type='submit'
                            className='submit-btn mt-3'>Register</button>
                    </div>
                </div>

            </form >
        </>
    );
}

export default Regestration;
