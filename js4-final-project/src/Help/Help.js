import { Link, Outlet, useLocation } from "react-router-dom";
import "./Help.scss";

function Help() {
  const location = useLocation();
  const current = location.pathname;

  return (
    <div className="help">
      <ul className="help-links">
        {current !== "/help" &&
          current !== "/help/" &&
          current !== "/help/about" && (
            <li>
              <Link className="help-btn" to="">
                Learn About PiggyPal&reg;
              </Link>
            </li>
          )}

        {current !== "/help/income" && (
          <li>
            <Link className="help-btn" to="income">
              How to add an Income
            </Link>
          </li>
        )}

        {current !== "/help/expenses" && (
          <li>
            <Link className="help-btn" to="expenses">
              How to add an Expense
            </Link>
          </li>
        )}

        {current !== "/help/category" && (
          <li>
            <Link className="help-btn" to="category">
              How to add a Category
            </Link>
          </li>
        )}

        <Outlet />
      </ul>
    </div>
  );
}

export default Help;
