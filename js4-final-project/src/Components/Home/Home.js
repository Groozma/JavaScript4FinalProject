import './Home.scss';
import Expense from '../Expense/Expense';
import Transactions from '../Transactions/Transactions';
import Income from '../Income/Income';

function Home() {
    return (
        <div>
            <h2>Welcome (InsertFirstNameHere) to PiggyPal!</h2>  
            <div className='home'>
                <div>
                    <div className='columns'>
                        <div>Amount</div>
                        <div>Category</div>
                        <div>Date & Time</div>
                    </div>
                    <Transactions />
                    </div>
                    <div className='expenses'>
                    <Expense />
                    <Income />
                </div>
            </div>
        </div>
    )
}

export default Home;