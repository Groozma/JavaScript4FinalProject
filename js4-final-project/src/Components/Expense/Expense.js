import "./Expense.scss";
import "../../Styles/buttons.scss";
import { useState, useEffect } from "react";
import { addExpense, saveCategory } from "../../services/db";
import { auth, db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";

// Default categories
const defaultCategories = [
  "Rent",
  "Entertainment",
  "Cellphone",
  "Gas",
  "Internet",
  "Electricity",
  "Food",
];

function Expense() {
  const [amount, setAmount] = useState("");
  const [categories, setCategories] = useState(defaultCategories);
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");

  // SEPARATE ERRORS
  const [errorExpense, setErrorExpense] = useState("");
  const [errorCategory, setErrorCategory] = useState("");

  // Load categories from Firestore
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const ref = doc(db, "users", user.uid);

    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        const saved = data.categories || [];

        const merged = Array.from(new Set([...defaultCategories, ...saved]));
        setCategories(merged);
      }
    });

    return () => unsub();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorExpense("");

    if (amount === "" || isNaN(amount) || Number(amount) <= 0) {
      setErrorExpense("Please enter a valid amount.");
      return;
    }

    if (!category) {
      setErrorExpense("Please select a category.");
      return;
    }

    const result = await addExpense(Number(amount), category);

    if (result.error) {
      setErrorExpense(result.error);
      return;
    }

    setAmount("");
    setCategory("");
  };

  const addNewCategory = async () => {
    setErrorCategory("");

    const trimmed = newCategory.trim();

    if (!trimmed) {
      setErrorCategory("Please enter a category!");
      return;
    }

    const exists = categories.some(
      (cat) => cat.toLowerCase() === trimmed.toLowerCase(),
    );

    if (exists) {
      setErrorCategory("Category already exists.");
      return;
    }

    const result = await saveCategory(trimmed);

    if (result.error) {
      setErrorCategory(result.error);
      return;
    }

    setNewCategory("");
  };

  return (
    <div className="expense">
      <form className="expense-form" onSubmit={handleSubmit}>
        <label>
          Amount:
          <input
            type="number"
            maxLength={12}
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="Enter Expense Amount"
          />
        </label>

        <label>
          Category:
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="">Select category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        {errorExpense && <p className="error">{errorExpense}</p>}

        <button type="submit" className="btn">
          Submit Expense
        </button>
      </form>

      <div className="new-category">
        <h2>Add New Category</h2>

        <label>
          New category
          <input
            type="text"
            maxLength={25}
            value={newCategory}
            onChange={(event) => setNewCategory(event.target.value)}
            placeholder="Enter Category Name"
          />
        </label>

        {errorCategory && <p className="error">{errorCategory}</p>}

        <button className="btn" onClick={addNewCategory}>
          Add Category
        </button>
      </div>
    </div>
  );
}

export default Expense;
