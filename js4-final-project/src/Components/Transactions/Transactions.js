import './Transactions.scss';
import { useState } from 'react';

function Transactions() {
    const [transactions, setTransactions] = useState([
        { amount: -1345.71, category: "Rent", date: 'April 10 3:20pm' },
        { amount: -101.43, category: "Food", date: 'April 10 5:48pm' },
        { amount: -300, category: "Electricity", date: 'April 13 8:00am' }
    ]);

    return (
        <div className='transactions'>
        
                {transactions.map((t, index) => (
                <div key={index} className="columns">
                    <span>${t.amount}</span>
                    <span>{t.category}</span>
                    <span>{t.date}</span>
                </div>
                ))}

        </div>
    )
}

export default Transactions;