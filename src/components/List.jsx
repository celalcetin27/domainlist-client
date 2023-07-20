import axios from "axios"
import { useEffect, useState } from "react"
import "../style/List.css"
import Logout from "./Logout"
import { FcVlc } from "react-icons/fc";
import Swal from "sweetalert2";
const List = () => {

    
    const [domains, setDomain] = useState({ domain: "" })
    const [domainList, setDomainList] = useState([])
   
  

    useEffect(() => {

        const getData = async () => {
            const response = await axios.get('http://localhost:8080/domains')
            setDomainList(response.data)
        }
        getData()
    }, [])


    const handleChange = (e) => {
        setDomain(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }


    const handleClick = async e => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:8080/domains", domains)
            Swal.fire(
                'Domain Eklendi',
                'İçerikler yükleniyor',
                'succes'
            )
            window.location.reload()
            // setTimeout(window.location.reload,1000)
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        console.log(id);
        try {
            await axios.delete("http://localhost:8080/domains/" + id)
            Swal.fire(
                'Silme Başarılı',
                'İçerikler yükleniyor',
                'success'
              )
              //setTimeout(window.location.reload,1000)
              window.location.reload()
            
        } catch (error) {
            console.log(error);
        }
    }
    const listDomains = (domain) => {
        
        const parsedDomain = JSON.parse(domain.data);
        
        return (
        <tr key={domain.id}>
            <td>{parsedDomain.WhoisRecord.domainName}</td>
            <td>{parsedDomain.WhoisRecord.createdDateNormalized}</td>
            <td>{parsedDomain.WhoisRecord.expiresDateNormalized}</td>
            <td>{parsedDomain.WhoisRecord.registrarName}</td>
            <td>{
                <button onClick={() => handleDelete(domain.id)} >
                    <FcVlc/>
                </button>

            }</td>
           
            
        </tr>
    )}

    return (
        <div className="form-container">
            <form>
                <label>Domain Ekle</label>
                <input type="text" placeholder="www.example.com" name="domains" onChange={handleChange}></input>
                <button onClick={handleClick} onSubmit={handleClick}>Ekle</button>
                <span className="logout"><Logout/></span>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Domain</th>
                        <th>Oluşturulma Tarihi</th>
                        <th>Sona Erme Tarihi</th>
                        <th>Kayıt İsmi</th>
                        <th>Sil</th>
                    </tr>
                </thead>
                <tbody>
                    { domainList.map(listDomains) }
                </tbody>
            </table>
        </div>
    )
}
export default List