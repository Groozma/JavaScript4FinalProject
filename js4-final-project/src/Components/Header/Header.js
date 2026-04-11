import './Header.scss'
import PiggyBank from '../../Images/Piggy Bank.png'

function Header() {
    return (
        <div className="header">
            <img src={PiggyBank} alt='Piggy bank with coins outside it' className='piggybank' />
            <h1 className='Name'>PiggyPal</h1>
        </div>
    )
}

export default Header;