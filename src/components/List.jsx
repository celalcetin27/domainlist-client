import axios from "axios";
import { useEffect, useState } from "react";
import "../style/List.css";
import Logout from "./Logout";
import Swal from "sweetalert2";
import React from "react";
import DataTable from "react-data-table-component";
import { remain } from "./Time";

const List = () => {
  const [domains, setDomain] = useState({ domain: "" });
  const [domainList, setDomainList] = useState([]);

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
    } catch (error) {
        console.log(error);
    }
}

const handleDelete = async (id) => {
    try {
        await axios.delete("http://localhost:8080/domains/" + id)
        Swal.fire(
            'Silme Başarılı',
            'İçerikler yükleniyor',
            'success'
          )
          window.location.reload()
        
    } catch (error) {
        console.log(error);
    }
}

  const columns = [
    {
      name: "Domain",
      selector: (row) => {
        const parsedDomain = JSON.parse(row.data);
        return parsedDomain.WhoisRecord.domainName;
      },
      sortable: true,
    },
    {
      name: "Oluşturulma Tarihi",
      selector: (row) => {
        const parsedDomain = JSON.parse(row.data);
        return parsedDomain.WhoisRecord.createdDateNormalized;
      },
      sortable: true,
    },
    {
      name: "Sona Erme Tarihi",
      selector: (row) => {
        const parsedDomain = JSON.parse(row.data);
        return parsedDomain.WhoisRecord.expiresDateNormalized;
      },
      sortable: true,
    },
    {
      name: "Kayıt İsmi",
      selector: (row) => {
        const parsedDomain = JSON.parse(row.data);
        return parsedDomain.WhoisRecord.registrarName;
      },
      sortable: true,
    },
    {
      name: "Kalan Süre",
      selector: (row) => {
        const parsedDomain = JSON.parse(row.data);
        return remain(parsedDomain.WhoisRecord.expiresDateNormalized) + " Gün";
      },
      sortable: true,
    },
    {
      name: "Sil",
      cell: (row) => (
        <button onClick={() => handleDelete(row.id)}>
         Sil
        </button>
      ),
      button: true,
    },
  ];

  return (
    <div className="form-container">
      <form>
        <label>Domain Ekle</label>
        <input
          type="text"
          placeholder="www.example.com"
          name="domain"
          onChange={handleChange}
        ></input>
        <button  className="addButton" onClick={handleClick}>Ekle</button>
        <span className="logout">
          <Logout />
        </span>
      </form>

      <DataTable
        columns={columns}
        data={domainList}
        pagination
        highlightOnHover
        striped
      />
    </div>
  );
};

export default List;
