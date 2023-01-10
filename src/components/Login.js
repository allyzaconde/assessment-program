import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthState';

function Login(){
    let navigate = useNavigate();
    const { state, login } = useContext(AuthContext);
    const [loginDetails, setLogin] = useState({
        username: '',
        password: '',
    });

    useEffect(() => {
        if(state.isLoggedIn){
            log();
        }
        // eslint-disable-next-line
    }, [state.isLoggedIn]); 

    async function log(){
        navigate("/")
    }

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

            { state.isLoginPending && <div>Please wait...</div> }
            { state.isLoggedIn && <div>Success</div> }
            { state.loginError && <div>{state.loginError.message}</div> }

        </>
    )
}

export default Login;