import "./Nav.scss";
import "../../Styles/buttons.scss";
import { useLocation, useNavigate } from "react-router-dom";

function Nav({ onUpdateFunds }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/home";

  return (
    <nav className="nav-wrapper">
      {!isHome && (
        <button className="btn" onClick={() => navigate("/home")}>
          Home
        </button>
      )}

      {isHome && (
        <>
          <button className="btn" onClick={() => navigate("/history")}>
            View History
          </button>

          <button className="btn" onClick={() => navigate("/add-expense")}>
            Add Expense
          </button>

          <button className="btn" onClick={onUpdateFunds}>
            Update Funds
          </button>

          <button className="btn" onClick={() => navigate("/help")}>
            Help
          </button>

          <button
            className="btn"
            onClick={() => {
              localStorage.removeItem("loggedIn");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
}

export default Nav;
