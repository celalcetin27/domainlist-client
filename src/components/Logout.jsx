import React from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"

const Logout =  () => {
    const navigate = useNavigate()
    const handleLogout = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:8080/domains")
            if (response.status === 200) {
                Swal.fire(
                    'Çıkış Başarılı',
                    'İçerikleri görmek için tekrar giriş yapınız',
                    'success'
                  )
                navigate("/")
            }
        } catch (error) {
            console.log(error);
        }
    }
  return  <button onClick={handleLogout}>Çıkış yap</button>
}
export default Logout