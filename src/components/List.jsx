import axios from "axios"
import { useEffect, useState } from "react"
import "../style/List.css"
import Logout from "./Logout"
const List = () => {


    console.log(process.env.REACT_APP_API_KEY);
    const [domains, setDomain] = useState({ domain: "" })
    const [domainList, setDomainList] = useState([])
    const [results, setResults] = useState([])

    const getData = async () => {
        const response = await axios.get('http://localhost:8080/domains')
        setDomainList(response.data)
    }

    const getDomainProps = async () => {
        try {
            const request = domainList.map(async (data) => {
                const response = await axios.get(`https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${process.env.REACT_APP_API_KEY}&domainName=${data.domains}&outputFormat=json`, {
                    responseType: 'json'
                })
                return response.data.WhoisRecord
            })
            const domainProps = await Promise.all(request)
            setResults(domainProps)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData()
    }, [])


    useEffect(() => {
       
        if (domainList.length > 0) {
            getDomainProps()
        }
    }, [domainList])


    const handleChange = (e) => {
        setDomain(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    

    const handleClick = async e => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:8080/domains", domains)
        } catch (error) {
            console.log(error);
        }
    }

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
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((domain) => (
                        <tr key={domain.registrarName}>
                            <td>{domain.domainName}</td>
                            <td>{domain.registryData.createdDateNormalized}</td>
                            <td>{domain.registryData.expiresDateNormalized}</td>
                            <td>{domain.registrarName}</td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default List