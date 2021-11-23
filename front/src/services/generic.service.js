import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

export const request = async ({ url, method = 'get', data = {} }) => {
  const response = await axios[method](`${API_URL}/${url}`, data)
  return response.data
}