import { useState } from "react";
import "../style/Login.css"
import { NavLink ,useNavigate} from "react-router-dom";
import axios from "axios";
const Login = () => {


  const navigate = useNavigate()
  const [user, setUser] = useState({
    username: "",
    password: ""
  })
  const [login, setLogin] = useState(false)


  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleClick = async e => {
    e.preventDefault()
    if (user.username === "" || user.password === "") {
      alert("Lütfen tüm alanları doldurun")
    }
    try {
      const response = await axios.post("http://localhost:8080/login", user)
      if (response.status === 200) {
        setLogin(true)
        console.log(response.data.token);
        alert("Giriş işlemi tamamlandı kayıtları görebilirsiniz")
        navigate("/list")
      }
      else if (response.status === 400) {
        alert("Bilgileriniz yanlış ya da eksik girilmiştir")
      }
      else {
        alert("Lütfen geçerli ve eksiksiz bilgiler girin")
      }
    } catch (error) {
      console.log(error);
    }
  }

  
  return (
    <div>
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleClick}>
          <h2 className="login-header">Login</h2>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <button type="submit" onClick={handleClick} >Login</button>
          <NavLink to={"/signup"} className="register-link">Don't have an account?</NavLink>
        </form>
      </div>
    </div>
  )
}

export default Login