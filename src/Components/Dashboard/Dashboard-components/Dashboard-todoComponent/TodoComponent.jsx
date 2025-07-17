import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import TodonavBar from './Todonavbar/TodonavBar'

function TodoComponent() {
    return (
        <>
            <div>
                
                <Outlet />
            </div>
        </>
    )
}

export default TodoComponent
