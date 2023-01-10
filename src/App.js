import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { AuthContext } from './context/AuthState';


function App() {
  const { state } = useContext(AuthContext);

  if(!state.isLoggedIn){
    return (
      <Routes>
        <Route path="/login" element={<Login/>} exact/>
        <Route path="*" element={<Navigate to="/login"/>} exact/>
      </Routes>
    )
  }else{
    return (
      <Routes>
        <Route path="/" element={<Dashboard/>} exact/>
        <Route path="*" element={<Navigate to="/"/>} exact/>
      </Routes>
    )
  }
}

export default App;