import { useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "./FundsPopup.scss";
import "../../Styles/buttons.scss";

export default function FundsPopup({ user, onClose, currentFunds }) {
  const [amount, setAmount] = useState("");
  const [operation, setOperation] = useState("add");
  const [error, setError] = useState("");

  const saveFunds = async () => {
    if (amount === "") {
      setError("Please enter a number");
      return;
    }

    const value = Number(amount);

    if (Number.isNaN(value) || value <= 0) {
      setError("Please enter a valid positive number");
      return;
    }

    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);
    const existing = Number(snap.data().funds) || 0;

    let updated = existing;

    if (operation === "add") {
      updated = existing + value;
    } else {
      if (existing - value < 0) {
        setError("You cannot subtract more than your available funds.");
        return;
      }
      updated = existing - value;
    }

    await updateDoc(ref, { funds: updated });

    onClose(updated);
  };

  const renderTitle = () => {
    return `Available Funds: $${currentFunds}\nUpdate your balance below.`;
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <button className="close-btn" onClick={() => onClose(currentFunds)}>
          ×
        </button>

        <h3>{renderTitle()}</h3>

        <label>Action:</label>
        <select
          value={operation}
          onChange={(event) => {
            setOperation(event.target.value);
            setError("");
          }}
        >
          <option value="add">Add Funds</option>
          <option value="subtract">Subtract Funds</option>
        </select>

        <label>Amount:</label>
        <input
          type="number"
          min="1"
          value={amount}
          onChange={(event) => {
            setAmount(event.target.value);
            setError("");
          }}
        />

        {error && <p className="error">{error}</p>}

        <button className="btn" onClick={saveFunds}>
          Update Funds
        </button>
      </div>
    </div>
  );
}
