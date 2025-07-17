import React from 'react'
import { useNavigate } from 'react-router-dom'
import HomeCardComponent from '../../../../common-components/CardComponent/HomeCardComponent';
import todocalender from "../../../Dashboard-images/calender.jpg"
import { Dark, DarkBtn, Light, LightBtn } from '../../../../Global-Theme/GlobalTheme';
import { ToggleTheme } from '../../../../../store/useStore';
import "./TodoHomepage.css"

function TodoHomePage() {

    const { themes } = ToggleTheme();
    const navigate = useNavigate();
    return (
        <div className=' d-flex flex-column justify-content-center align-items-center vh-100 px-4 gap-5'>
            <div>
                <img className='todo-calender' src={todocalender} alt="calender-image" />
            </div>
            <div className='d-flex flex-column justify-content-center align-items-md-center'>
                <h2 style={{
                    color: themes === "Dark" ? Dark.txtColor : Light.txtColor
                }} className='text-center'> MordernToDo</h2>
                <p style={{
                    fontWeight: 400,
                    fontSize: '1rem',
                    color: themes === "Dark" ? Dark.subTxt : Light.subTxt
                }} >Manage tasks with ease</p>

                <button
                    onClick={() => navigate('taskscreen')}
                    className='submit-btn p-3 rounded-4 fw '
                    style={{
                        fontWeight: 500,
                        color: themes === "Dark" ? DarkBtn.txtColor : LightBtn.txtColor,
                        background: themes === "Dark" ? DarkBtn.backgroundcolor : LightBtn.backgroundcolor,
                        border: themes === "Dark" ? DarkBtn.border : LightBtn.border,
                    }}>
                    Get Start
                </button>
            </div>
        </div>
    )
}

export default TodoHomePage
