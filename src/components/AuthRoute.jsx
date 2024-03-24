import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router-dom';

function AuthRoute() {
    const token = Cookies.get('authToken');
    return (
        token ? <Outlet /> : <Navigate to="/login" />
    )
}

export default AuthRoute;
