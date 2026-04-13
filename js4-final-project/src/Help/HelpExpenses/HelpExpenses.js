import "./HelpExpenses.scss";
import { useNavigate } from "react-router-dom";
import "../../Styles/buttons.scss";

function HelpExpenses() {
  const navigate = useNavigate();

  return (
    <div className="help-expenses">
      <h3>Adding Expenses</h3>

      <p>
        To add an expense, enter the amount in the Add Expense section on the
        Add Expense page. Then select the category that best fits the expense.
        If the category does not exist, you can create a new one. After entering
        the amount and selecting a category, click the Submit Expense button to
        save the expense.
      </p>

      <button className="btn" onClick={() => navigate("/home")}>
        Go Back to Home
      </button>
    </div>
  );
}

export default HelpExpenses;
