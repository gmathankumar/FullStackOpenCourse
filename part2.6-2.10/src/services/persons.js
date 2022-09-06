import axios from "axios";

const baseurl= 'http://localhost:3001/persons'

const getAll = ()=>{
var request = axios.get(baseurl)
return request.then(res => res.data)
}

const createPerson = personObj =>{
    return axios.post(baseurl,personObj).then(res => res.data)
}

const deletePerson =(id) =>{
    return axios.delete(`${baseurl}/${id}`)
}

const updatePerson = (id,updatedObj) =>{
    var request = axios.put(`${baseurl}/${id}`,updatedObj)
    return request.then(res => res.data)
}

const personsService={
    getAll,
    createPerson,
    deletePerson,
    updatePerson
}


export default personsService