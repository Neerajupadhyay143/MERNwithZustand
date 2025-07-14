import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Regestration from './Components/auth/Regestration/Regestration';
import Login from './Components/auth/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import CircularProgress from '@mui/material/CircularProgress';
import "./App.css";
import Home from './Components/common-components/Home';
import HomePage from './Components/Dashboard/Dashboard-components/Dashboard-HomePage/HomePage';
import Counter from './Components/Dashboard/Dashboard-components/Counter/Counter';
import ProtectedRoute from './Components/auth/ProtactedRoute/ProtectedRoute';
import { AuthProvider } from './Components/auth/GlobalAuthcontext/AuthContext';
import { SnackbarProvider } from 'notistack';
import { Dark, DarkBtn, Light, LightBtn } from './Components/Global-Theme/GlobalTheme';
import { ToggleTheme } from './store/useStore';
import { motion } from "motion/react"
import ThemeComponent from './Components/Dashboard/Dashboard-components/ThemeComponent/ThemeComponent';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { themes } = ToggleTheme();

  function GradientCircularProgress() {
    return (
      <React.Fragment>
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e01cd5" />
              <stop offset="100%" stopColor="#1CB5E0" />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
      </React.Fragment>
    );
  }

  const showBackButton = location.pathname === "/login" || location.pathname === "/registration";

  const Dbg = Dark.mainBackground;
  const Lbg = Light.mainBackground;
  const DBtn = DarkBtn.backgroundcolor;
  const LBtn = LightBtn.backgroundcolor;
  return (
    <>
      <motion.div
        transition={{ duration: 0.5, ease: "easeInOut" }}
        initial={{ backgroundColor: themes === "Dark" ? Dbg : Lbg }}
        animate={{ backgroundColor: themes === "Dark" ? Dbg : Lbg }}
        className='theme-div'
        style={{ position: 'relative' }}
      >
        {showBackButton && (

          <motion.button
            whileHover={{ scale: 1.08 }}
            onClick={() => navigate("/")}
            className='p-2 rounded mx-5  mt-5 w-50 '
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              maxWidth: '135px',
              background: themes === "Dark" ? DBtn : LightBtn.mainBackground,
              color: themes === "Dark" ? DarkBtn.txtColor : "white",
              border: 'none',
              outline: 'none',
            }}
          >
            Back
          </motion.button>

        )}
        <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Home navigate={navigate} GradientCircularProgress={GradientCircularProgress} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Regestration />} />

              <Route
                path="/dashboard"
                element={

                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              >
                <Route index element={<HomePage />} />
                <Route path="counter" element={<Counter />} />
                <Route path="themepage" element={<ThemeComponent />} />
              </Route>
            </Routes>
          </AuthProvider>
        </SnackbarProvider>
      </motion.div >
    </>
  );
}

export default App;
