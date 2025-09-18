
import axios from "axios"
export const GetAllUsers = async ()=>{
    

    try{
        

        const response =await axios.get("https://localhost:7238/api/User") ; 

        return  response.data ; 
    }catch(error){
        alert("no data found ") ; 
    }
}

export const GetUserNameById = async (id:string)=>{
    const token = localStorage.getItem("authToken") ; 

    const response  =await axios.get(`https://localhost:7238/api/User/FindNameById/${id}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
    return response.data;
}