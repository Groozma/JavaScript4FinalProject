import "./Income.scss";
import "../../Styles/buttons.scss";
import { useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";

function Income({ onFundsUpdated }) {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setAmount(event.target.value);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (amount === "") return;

    const value = Number(amount);

    if (value < 0) {
      setError("Income cannot be negative.");
      return;
    }

    if (Number.isNaN(value)) {
      setError("Please enter a valid number.");
      return;
    }

    const user = auth.currentUser;
    const ref = doc(db, "users", user.uid);

    const snap = await getDoc(ref);
    const currentFunds = Number(snap.data().funds) || 0;

    const updated = currentFunds + value;

    await updateDoc(ref, { funds: updated });

    onFundsUpdated(updated);
    setAmount("");
  };

  return (
    <div className="income">
      <h3>Add Income</h3>

      <form className="income-form" onSubmit={handleSubmit}>
        <label>
          Amount:
          <input type="number" min="0" value={amount} onChange={handleChange} />
        </label>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="btn">
          Add Income
        </button>
      </form>
    </div>
  );
}

export default Income;
