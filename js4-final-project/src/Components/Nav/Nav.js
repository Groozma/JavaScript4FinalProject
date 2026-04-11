import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import './Nav.scss';

function Nav() {
    const { setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("loggedIn");
        setIsLoggedIn(false);
        navigate("/");
    };

    return (
        <nav>
            <Link to='/home'>Home</Link>
            <Link to='/help'>Help</Link>
            <button onClick={handleLogout} className="logout-btn">
                Log Out
            </button>
        </nav>
    );
}

export default Nav;