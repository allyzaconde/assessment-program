import React from 'react';
import { useSetState } from 'react-use';
import { createContext } from "react";

const initialState = {
    username: '',
    isLoggedIn: false,
    isLoginPending: false,
    loginError: null
}

export const AuthContext = createContext(initialState)

export const AuthProvider = ({ children }) => {
    const [state, setState] = useSetState(initialState);
    
    const setLoginSuccess = (isLoggedIn) => setState({isLoggedIn});
    const setLoginPending = (isLoginPending) => setState({isLoginPending});
    const setLoginError = (loginError) => setState({loginError});

    function login(username, password) {
        setLoginPending(true);
        setLoginSuccess(false);
        setLoginError(null);

        fetchLogin( username, password, error => {
            setLoginPending(false);
            if (!error) {
              setLoginSuccess(true);
            } else {
              setLoginError(error);
            }
        })
    }
    
    return(
        <AuthContext.Provider 
            value = {{
                state,
                login
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const fetchLogin = (username, password, callback) => 
  setTimeout(() => {
        // const loginDetails = {username: username, password: password};
        // const request = new Request("https://netzwelt-devtest.azurewebsites.net/Account/SignIn",
        //     {
        //       method: 'POST',
        //       body: JSON.stringify(loginDetails),
        //       headers: new Headers({
        //         'Content-Type': 'application/json',
        //         'Access-Control-Allow-Origin': '*',
        //         'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        //       }),
        //     }
        //   );
        //   fetch(request)
        //     .then((response) => {
        //       if (response.ok) {
        //         return callback(null);
        //       }
        //         return callback(new Error('Invalid username or password'));
        //       })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    if (username === 'test' && password === 'test') {
        return callback(null);
    } else {
    return callback(new Error('Invalid username or password'));
    }
  }, 1000);