import "./HelpAbout.scss";
import { useNavigate } from "react-router-dom";
import "../../Styles/buttons.scss";

function HelpAbout() {
  const navigate = useNavigate();

  return (
    <div className="help-about">
      <h3>About PiggyPal</h3>

      <p>
        PiggyPal is a simple and effective tool for tracking your expenses and
        income. You can add expenses, categorize them, create new categories,
        and update your available funds at any time.
      </p>

      <button className="btn" onClick={() => navigate("/home")}>
        Go Back to Home
      </button>
    </div>
  );
}

export default HelpAbout;
