import axios from "axios"
//HEROKU
// const baseUrl = "https://tranquil-badlands-32009.herokuapp.com/api/notes"
//LOCAL RELATIVE
// const baseUrl = "/api/notes"
//LOCAL
const baseUrl = "http://localhost:3001/api/notes"

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  return axios.get(baseUrl)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)

  return response.data
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const destroy = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default {
  getAll,
  create,
  update,
  destroy,
  setToken,
}
