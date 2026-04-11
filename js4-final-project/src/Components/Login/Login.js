import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from "../../AuthContext";


function Login() {
    const { setIsLoggedIn } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const normalizedEmail = email.trim().toLowerCase();

        if (normalizedEmail === '' || password === ''){
            setInvalid(true);
            return
        }
        if (normalizedEmail === 'test@test.com' && password === 'test123'){
            setEmail('');
            setPassword('');
            setInvalid(false);
            setInvalidEmail(false);
            setInvalidPassword(false);
            localStorage.setItem("loggedIn", "true");
            setIsLoggedIn(true);
            navigate("/home");
        }
        else if (normalizedEmail !== 'test@test.com') {
            setInvalidEmail(true);
            return
        }
        else if (password !== 'test123') {
            setInvalidPassword(true);
            return
        }

    }
    const register = () => {
        navigate('/register')
    }

    return (
        <div className='login'>
            <h2 className='login-heading'>Login to PiggyPal</h2>
            <form className='login-form' onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input 
                        type='email' 
                        maxLength={50} 
                        value={email}
                        onChange={handleEmailChange}
                    />
                </label>
                {invalidEmail && <div className='invalid'>No matching e-mail found</div>}
                <label>
                    Password:
                    <input 
                        type='password' 
                        maxLength={20} 
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </label>
                {invalidPassword && <div className='invalid'>Invalid password!</div>}
                <div className='buttons'>
                    <button type='submit'>Login</button>
                    <button onClick={register}>Register</button>
                </div>
                {invalid && <div className='invalid'>Please fill in both username and password</div>}
            </form>
        </div>
    )
}

export default Login;