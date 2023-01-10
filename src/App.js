import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { AuthContext } from './context/AuthState';


function App() {
  // const { state } = useContext(AuthContext);

  // return <Login/>
  return <Dashboard/>

  // if(state.isLoggedin){
  //   return <Dashboard/>
  // }else{
  //   return <Login/>
  // }
}

export default App;