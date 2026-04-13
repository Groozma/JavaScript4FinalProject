import "./HelpCategories.scss";
import { useNavigate } from "react-router-dom";
import "../../Styles/buttons.scss";

function HelpCategories() {
  const navigate = useNavigate();

  return (
    <div className="help-categories">
      <h3>Adding a Category</h3>

      <p>
        To add a category, enter the desired category name in the "Add New
        Category" field on the Add Expense page. Then select the "Add Category"
        button to add it to your list of expense categories.
      </p>

      <button className="btn" onClick={() => navigate("/home")}>
        Go Back to Home
      </button>
    </div>
  );
}

export default HelpCategories;
