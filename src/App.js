import List from "./components/List";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import {Routes, Route} from "react-router-dom"

function App({isLogin}) {
  return (
    <div>

      <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/list" element={<List/>} />
      <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </div>
  );
}

export default App;
