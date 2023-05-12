import { useState } from "react"
import "./AddTaskStyle.css";

const AddTask=()=>{

    const[inputtxt,setInputtxt] = useState("");
    
    const sendToServer = ()=>{
        const payload = {
            "text":inputtxt,
        }
        const fetchopt = {
            method:"POST",
            body:JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json"
            }
        }
        fetch("http://localhost:3000/todos/add/",fetchopt)
        .then(res=>res.json())
        .then(data=>console.log(data))
        .catch(err=>console.log(err))
    }

    const updatetxt =(e)=>{
        setInputtxt(e.target.value);
        console.log("value of txt "+inputtxt)
    }
    return(
        <div>
            <h1>Add New Task In Your Todo</h1>
            <form  onSubmit={sendToServer} action="http://localhost:3001/">
                <input type="text" placeholder="task name " onChange={updatetxt}/>
                <input type="submit" value="submit" />
            </form>
        </div>
    )
}

export default AddTask;