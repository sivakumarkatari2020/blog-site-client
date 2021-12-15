import axios from "axios";

async function verifyAPI(credentials){
    return axios.post(`http://localhost:8080/api/login/verify`,{usermail: credentials.email,password: credentials.password})
    .then(result=>{
        if(result.data.status === 200){
            return result.data;
        }
        else{
            return result.data;
        }
    })
    .catch((error)=>{
        console.log("Error is : "+error);
        return {'status': 503,'message': 'The server  is down. Please contact the Administrator'};
    })
}

export default verifyAPI;