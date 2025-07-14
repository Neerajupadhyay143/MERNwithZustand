import React, { useEffect } from 'react'
import { ToggleTheme } from '../../../../store/useStore'
import { Dark, Light } from '../../../Global-Theme/GlobalTheme';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';


function ThemeComponent() {

    // const themes = ToggleTheme((state) => state.themes);
    // const lightTheme = ToggleTheme((state) => state.lightTheme);
    // const DarkTheme = ToggleTheme((state) => state.DarkTheme);

    const { themes, lightTheme, DarkTheme } = ToggleTheme();

    console.log("ThemePage :", themes);

    return (
        <>
            <div
                className=' d-grid justify-content-center align-items-center vh-100'
                style={{ color: themes === "Dark" ? Dark.txtColor : Light.txtColor }}
            >
                <div>
                    {themes === "Light" ? (
                        <div onClick={() => DarkTheme()}>
                            <BedtimeIcon sx={{ mr: 1, fontSize: '30px', cursor: 'pointer' }} />

                        </div>

                    ) : (
                        <div onClick={() => lightTheme()}>
                            <WbTwilightIcon sx={{ mr: 1, fontSize: '30px', cursor: 'pointer' }} />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default ThemeComponent
