import "./HelpIncome.scss";
import { useNavigate } from "react-router-dom";
import "../../Styles/buttons.scss";

function HelpIncome() {
  const navigate = useNavigate();

  return (
    <div className="help-income">
      <h3>How to Submit Income</h3>

      <p>
        To submit your income, enter the amount in the Add Income section on the
        Home page. Then click the Add Income button. Your available funds will
        update immediately so you can track your expenses relative to your
        income.
      </p>

      <button className="btn" onClick={() => navigate("/home")}>
        Go Back to Home
      </button>
    </div>
  );
}

export default HelpIncome;
