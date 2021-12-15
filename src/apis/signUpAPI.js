import axios from "axios";

let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

const signUpAPI = async (values) => {
    return axios.post(`http://localhost:8080/api/saveUserDetails`,values,axiosConfig)
    .then((response)=>{
        return response;
    })
    .catch((error)=>{
        console.log(error);
        return error;
    })
}

export default signUpAPI;