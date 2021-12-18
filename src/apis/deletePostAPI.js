import axios from "axios";

const deletePostAPI = (id) => {
    return axios.delete(`https://localhost:8080/api/deletePost/${id}`)
    .then(response=>{
        console.log('APi Called');
        return response;
    })
    .catch((error)=>{
        return {status:403,error:error};
    })
}

export default deletePostAPI;