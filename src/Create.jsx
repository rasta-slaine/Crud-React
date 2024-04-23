import { useState } from "react"
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"

function Create(){
    const[values,SetValues] = useState({
        name:" ",
        email: " ",
        phone: " "
    })

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:4000/users',values)
        .then(res=> {
            console.log(res)
            navigate("/")
        })
        .catch(err=> console.log(err))
    }

    return(
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
            <div className="w-150 border bg-white shadow px-5 pt-3 pb-5 rounded">
                <h1>Adicionar um usuario </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label htmlFor="name">Nome:</label>
                        <input type="text" name="name" className="form-control" placeholder="Insira o nome" 
                        onChange={ e => SetValues({...values,name: e.target.value})}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email">Email:</label>
                        <input type="text" name="email" className="form-control" placeholder="Insira o Email" 
                        onChange={ e => SetValues({...values,email: e.target.value})}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="phone">Telefone:</label>
                        <input type="text" name="phone" className="form-control" placeholder="Insira o Telefone" 
                        onChange={ e => SetValues({...values,phone: e.target.value})}/>
                    </div>
                    <button className="btn btn-success">Enviar</button>
                    <Link to="/" className="btn btn-primary ms-3">Voltar</Link>
                </form>
            </div>
        </div>
    )
}

export default Create