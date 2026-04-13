import Expense from "../Expense/Expense";
import Nav from "../Nav/Nav";
import "./AddExpense.scss";

export default function AddExpense() {
  return (
    <div className="add-expense-wrapper">
      <h2 className="title">Add Expense</h2>

      <Nav />

      <div className="expense-container">
        <Expense />
      </div>
    </div>
  );
}
