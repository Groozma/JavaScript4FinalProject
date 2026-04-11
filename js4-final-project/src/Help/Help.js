import { Link, Outlet } from 'react-router-dom';
import './Help.scss';

function Help() {
    return (
        <div className='help'>
            <h2>Help</h2>
            <Outlet />
            <ul>
                <li><Link to=''>About PiggyPal</Link></li>
                <li><Link to='income'>Submitting Income</Link></li>
                <li><Link to='expenses'>Submitting Expenses</Link></li>
                <li><Link to='category'>Adding a category</Link></li>
            </ul>
        </div>
    )
}

export default Help;