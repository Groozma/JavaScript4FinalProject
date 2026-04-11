import './Expense.scss';
import { useState } from 'react';

function Expense(){
    const [amount, setAmount] = useState(0);
    const [categories, setCategories] = useState(['Rent', 'Entertainment', 'Cellphone', 'Gas', 'Internet', 'Electrictiy', 'Food']);
    const [category, setCategory] = useState('');
    const [newCategory, setNewCategory] = useState('');

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    }
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    }
    const handleNewCategoryChange = (event) => {
        setNewCategory(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

    }

    const addNewCategory = () => {
        if (!newCategory.trim()) return;
        if (categories.includes(newCategory.trim())) return;

        setCategories(prev => [...prev, newCategory.trim()]);
        setNewCategory("");
    }
    return (
        <div className='expense'>
            <h3>Add Expense</h3>
            <form className='expense-form' onSubmit={handleSubmit}>
                <label>Amount:
                    <input
                        type='number'
                        maxLength={12}
                        value={amount}
                        onChange={handleAmountChange}
                    />
                </label>
                <label>Category:
                    <select>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat} onChange={handleCategoryChange}>
                            {cat}
                        </option>
                    ))}
                    </select>
                </label>
                <button type='submit'>Submit Expense</button>
            </form>
            <div className='new-category'>
                <h3>Add New Category</h3>
                <label>New category
                    <input
                        type='text'
                        maxLength={25}
                        value={newCategory}
                        onChange={handleNewCategoryChange}
                    />
                </label>
                <button onClick={addNewCategory}>Add Category</button>
            </div>
        </div>
    )
}

export default Expense;