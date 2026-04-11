import './Income.scss';
import { useState } from 'react';

function Income() {
    const [income, setIncome] = useState(0);

    const handleIncomeChange = (event) => {
        setIncome(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <div className='income'>
            <h3>Add Income</h3>
            <form className='income-form' onSubmit={handleSubmit}>
                <label>Income:
                    <input
                        type='number'
                        maxLength={12}
                        value={income}
                        onChange={handleIncomeChange}
                    />
                </label>
                <button type='submit'>Submit Income</button>
            </form>
        </div>
    )
}

export default Income;