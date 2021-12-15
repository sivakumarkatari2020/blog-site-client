import axios from "axios";

let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

const saveBlogAPI = async (values) => {
    return axios.post(`http://localhost:8080/api/saveBlogPost`,values,axiosConfig)
    .then((response)=>{
        return response;
    })
    .catch((error)=>{
        console.log(error);
        return error;
    })
}

export default saveBlogAPI;