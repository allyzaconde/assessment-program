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
        <div className="m-auto pt-5" style={{width: "20%"}}>
            <p className='text-center'>Login</p>
            <form onSubmit={onSubmit}>
                <div className="form-group py-1">
                    <label>Username</label>
                    <input
                        type="text"
                        onChange={(e) => handleOnChange('username', e.target.value)}
                        placeholder="Enter Username"
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group py-1">
                    <label>Password</label>
                    <input
                        type="text"
                        onChange={(e) => handleOnChange('password', e.target.value)}
                        placeholder="Enter Password"
                        className="form-control"
                        required
                    />
                </div>
                <button className="mt-3 m-auto p-2 rounded row justify-content-center">Login</button>
            </form>
            <div className="text-center p-4">
                { state.isLoginPending && <div>Please wait...</div> }
                { state.isLoggedIn && <div>Success</div> }
                { state.loginError && <div>{state.loginError.message}</div> }
            </div>
        </div>
    )
}

export default Login;