import axios from 'axios'
const baseUrl = 'http://localhost:3003'



export const fetchAllMentor = async () =>{
    const res = await axios.get(`${baseUrl}/get-all-mentor`);
    return res
}

export const addMentor = async (mentorData)=>{
    const res = await axios.post(`${baseUrl}/create-mentor`, mentorData)
    return res
}

export const deleteMentor = async (mentorId) =>{
    const res = await axios.delete(`${baseUrl}/delete-mentor/${mentorId}`)
    return res
}

export const singleMentor = async (mentorId) =>{
    const res = await axios.get(`${baseUrl}/get-single-mentor/${mentorId}`)
    return res.data
}

export const addTask = async (data)=>{
    const res = await axios.post(`${baseUrl}/add-task`, data)
    return res
}