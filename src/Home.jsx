import axios from "axios"
import { useEffect, useState } from "react"
import {Link} from "react-router-dom"

function Home(){

    const [data,SetDate] = useState() 
 

    useEffect(()=>{
        const fetchData = async () =>{
          try{
            const res = await axios.get('http://localhost:4000/users')
            SetDate(res.data)
          }
          catch (error){
             console.log(error)
          }
        }; fetchData()

    },[])   

    

    const handleDelete = (id) =>{
        const confirm = window.confirm ("Would you like to Delete ?")
        if(confirm){
            axios.delete(`http://localhost:4000/users/${id}`)
            .then(res =>{
                console.log(res)
                location.reload()
            }).catch(err=> console.log(err))
        }
    }

    return(
        <div className="d-flex flex-column justify-content-center align-itens-center bg-light vh-100 w-300">
            <h1>Lista de usuarios </h1>
            <div className="w-175 rounded bg-white border shadow p-4">
            <div className="d-flex justify-content-end">    
                   <Link to="/create" className="btn btn-success"> Add +</Link>
            </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        data && data.length > 0 && data.map((d, i) => (
                            <tr key={i}>
                                <td>{d.id}</td>
                                <td>{d.name}</td>
                                <td>{d.email}</td>
                                <td>{d.phone}</td>
                                <td>
                                    <Link to={`/read/${d.id}`} className="btn btn-sm btn-info me-2">Ver</Link>
                                    <Link to={`/update/${d.id}`} button className="btn btn-sm btn-primary me-2">Editar</Link>
                                    <button onClick={e => handleDelete(d.id)} className="btn btn-sm btn-danger">Deletar</button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                </div>
                </div>
        
    
    )

}

export default Home

