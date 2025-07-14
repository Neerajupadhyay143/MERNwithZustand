import React from 'react'
import { ToggleTheme, useStore } from '../../../../store/useStore'
import "./Counter.css"
import { Dark, DarkBtn, Light, LightBtn, LightOutlineBtn } from '../../../Global-Theme/GlobalTheme';


function Counter() {
    const { count, increase, decrease } = useStore();
    const { themes } = ToggleTheme();

    const handleDecrease = () => {
        if (count <= 0) {
            alert('Value cannot be negative');
            return;
        }
        decrease();
    }
    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className='d-flex flex-column align-items-center w-100'>
                <div>
                    <h1 style={{ color: themes === "Dark" ? Dark.txtColor : Light.txtColor }} className=" fw-bold">{count}</h1></div>
                <div className=' responsive-btn d-flex gap-4 align-items-center mt-4'>
                    <button
                        style={{
                            background: themes === "Dark" ? LightOutlineBtn.backgroundcolor : LightBtn.mainBackground,
                            border: themes === "Dark" ? LightOutlineBtn.border : LightBtn.border,
                            color: themes === "Dark" ? "white" : LightOutlineBtn.txtColor,
                        }}
                        onClick={handleDecrease}
                        className='p-1 w-50  rounded-2  fw-semibold fs-3 '>
                        -
                    </button>
                    <button
                        onClick={increase}
                        className='p-1 w-50  rounded-2  fw-semibold fs-3  '
                        style={{
                            background: themes === "Dark" ? DarkBtn.backgroundcolor : LightBtn.backgroundcolor,
                            color: themes === "Dark" ? DarkBtn.txtColor : LightBtn.txtColor,
                            border: themes === "Dark" ? DarkBtn.border : LightBtn.border,
                        }}
                    >
                        +
                    </button>

                </div>
            </div>
        </div>
    )
}

export default Counter
