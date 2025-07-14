
import Navbar from './Dashboard-components/DashboardNavbar.jsx/Navbar';
import { Outlet } from 'react-router-dom';

function Dashboard() {

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default Dashboard;




