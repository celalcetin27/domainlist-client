import axios from "axios";
import "../style/Signup.css"
import { useState } from "react";
import { NavLink , useNavigate } from "react-router-dom";

const SignUp = () => {
    const [signup,setSignUp] = useState(false)
    const [user,setUser] = useState({
        email :"",
        username : "",
        password : ""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setUser((prev) => ({...prev , [e.target.name] : e.target.value}) )
    }

    const handleClick = async e => {
        e.preventDefault()
        if (user.username ==="" || user.email ==="" || user.password ==="") {
            console.log("1");
            alert("Lütfen tüm alanları doldurun")
            console.log("2");
        }
        try {
            
          const response=   await axios.post("http://localhost:8080/register", user)
          if (response.status === 200) {
            setSignUp(true)
            alert("Kayıt işlemi tamamlandı")
            navigate("/")
          }
          else if(response.status ===400){
            alert("Lütfen tüm alanları doldurun")
          }
          else {
            alert("Lütfen geçerli ve eksiksiz bilgiler girin")
          }
           
            
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div className="register-form-container">
        <form className="register-form" onSubmit={handleClick}>
            <h2>Register</h2>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={handleChange}
                />
            </div>
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
            <button type="submit" onClick={handleClick}>Register</button>

            <NavLink className={"login-link"} to={"/"}>Already have an account ?</NavLink>
           
        </form>
    </div>
    )
}
export default SignUp