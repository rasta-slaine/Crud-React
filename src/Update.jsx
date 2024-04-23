
import { useEffect,useState } from "react"
import axios from "axios"
import { useParams,Link,useNavigate } from "react-router-dom"

function Update(){
    const[values,SetValues] = useState({
        name:"",
        email: "",
        phone: ""
    })


    const {id} = useParams()

    useEffect(()=>{
        const fechtdata = async ()=>{
         try{
            const res = await axios.get(`http://localhost:4000/users/${id}`)
            SetValues(res.data)
         }   
        catch(error){
          console.log(error)
        }
    }; fechtdata()   
    },[])   



    const navigate = useNavigate()

    const handleUpdate = (event) => {
        event.preventDefault();
    
        // Verifica se todos os campos estão preenchidos
        if (!values.name || !values.email || !values.phone) {
            alert("Por favor, preencha todos os campos.");
            return;
        }
    
        axios.put(`http://localhost:4000/users/${id}`, values)
            .then(res => {
                console.log("Usuário atualizado com sucesso:", res.data,values);    
                navigate("/");
            })
            .catch(err => {
                console.error("Erro ao atualizar usuário:", err);
            });
    }
    

    return(
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
            <div className="w-180 border bg-white shadow px-5 pt-3 pb-5 rounded">
                <h1>Editar usuario</h1>
                <form onSubmit={handleUpdate} >
                    <div className="mb-2">
                        <label htmlFor="name">Nome:</label>
                        <input type="text" name="name" className="form-control" 
                        value={values.name} 
                        onChange={ e => SetValues({...values,name: e.target.value})}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email">Email:</label>
                        <input type="text" name="email" className="form-control"  
                        value={values.email} onChange={ e => SetValues({...values,email: e.target.value})}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="phone">Telefone:</label>
                        <input type="text" name="phone" className="form-control" 
                        value={values.phone} onChange={ e => SetValues({...values,phone: e.target.value})}/>
                    </div>
                    <button className="btn btn-success">Atualizar</button>
                    <Link to="/" className="btn btn-primary ms-3"> Voltar </Link>
                </form>
            </div>
        </div>
    )
}

export default Update