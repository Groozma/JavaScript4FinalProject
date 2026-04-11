import './Register.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invalid, setInvalid] = useState(false);

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }
    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (firstName === '' || lastName === '' || email === '' || password === '') {
            setInvalid(true);
        }
        else {
            navigate('/');
        }
    }

    return (
        <div className='register'>
            <form className='register-form' onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input
                        type='text'
                        maxLength={15}
                        valud={firstName}
                        onChange={handleFirstNameChange}
                    />
                </label>
                <label>
                    Last Name:
                    <input
                        type='text'
                        maxLength={30}
                        valud={lastName}
                        onChange={handleLastNameChange}
                    />
                </label>
                <label>
                    Email:
                    <input 
                        type='email' 
                        maxLength={50} 
                        value={email}
                        onChange={handleEmailChange}
                    />
                </label>
                <label>
                    Password:
                    <input 
                        type='password' 
                        maxLength={20} 
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </label>
                <div>
                    <button type='submit'>Register</button>
                </div>
                {invalid && <div>Please fill in all forms</div>}
            </form>
        </div>
    )
}

export default Login;