import React, { useContext, useState} from 'react';
import { AuthContext } from '../context/AuthState';

function Login(){
    const { state, login } = useContext(AuthContext);
    const [loginDetails, setLogin] = useState({
        username: '',
        password: '',
    });

    const onSubmit = (e) => {
        e.preventDefault();
        login(loginDetails.username, loginDetails.password)
    }

    const handleOnChange = (userKey, newValue) =>
    setLogin({ ...loginDetails, [userKey]: newValue });

    return(
        <>
            <p>login page</p>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        onChange={(e) => handleOnChange('username', e.target.value)}
                        placeholder="Enter Username"
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="text"
                        onChange={(e) => handleOnChange('password', e.target.value)}
                        placeholder="Enter Password"
                        required
                    />
                </div>
                <button>Login</button>
            </form>
            {state.loginError ? (
              <div>{state.loginError}</div>
            ):<></>}
        </>
    )
}

export default Login;