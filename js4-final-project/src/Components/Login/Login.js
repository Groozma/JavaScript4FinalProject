import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

function Login() {
  const { setIsLoggedIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      setInvalid(true);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      localStorage.setItem("loggedIn", "true");
      sessionStorage.removeItem("askedUpdateFunds");

      setIsLoggedIn(true);
      navigate("/home");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setInvalidEmail(true);
      } else if (err.code === "auth/wrong-password") {
        setInvalidPassword(true);
      } else {
        setInvalid(true);
      }
    }
  };

  return (
    <div className="login">
      <h2 className="login-heading">Login to PiggyPal</h2>

      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setInvalid(false);
              setInvalidEmail(false);
            }}
          />
        </label>
        {invalidEmail && (
          <div className="invalid">No matching e-mail found</div>
        )}

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setInvalid(false);
              setInvalidPassword(false);
            }}
          />
        </label>
        {invalidPassword && <div className="invalid">Invalid password!</div>}

        <div className="buttons">
          <button type="submit" className="btn">
            Login
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>

        {invalid && <div className="invalid">Invalid information entered. Please try again</div>}
      </form>
    </div>
  );
}

export default Login;
