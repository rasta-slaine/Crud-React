
import { useEffect,useState } from "react"
import axios from "axios"
import { useParams,Link } from "react-router-dom"

function Read(){

    const [data,SetDate] = useState([]) 
    const {id} = useParams()

    useEffect(()=>{
        const fetchdata = async () =>{
        try{
            const res = await axios.get(`http://localhost:4000/users/${id}`)
            SetDate(res.data)
        }
         catch(error){
            console.log(error)
         }
        }; fetchdata()
    },[])   


    return(
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
            <div className="w-680 border bg-white shadow px-5 pt-3 pb-5 rounde">
                <h3> Detalhes do usuario</h3>
                <div className="mb-2 w-2000">
                    <strong>Nome: {data.name} </strong>
                </div>
                <div className="mb-2">
                    <strong>Email: {data.email} </strong>
                </div>
                <div className="mb-2">
                    <strong>Telefone: {data.phone} </strong>
                </div>
            <Link to={`/update/${id}`} className="btn btn-success">Atualizar</Link>
            <Link to={`/`} className="btn btn-primary ms-3">Voltar</Link>
            </div>
        </div>
    )
}

export default Read