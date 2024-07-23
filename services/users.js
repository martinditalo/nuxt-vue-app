import axios from 'axios'

const apiUrl = 'https://62468c8fe3450d61b0001464.mockapi.io/crud/'

export const getUsers = async () => {
  try {
    const response = await axios.get(`${apiUrl}`)
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

export const addUser = async (userData) => {
  try {
    const response = await axios.post(`${apiUrl}`, userData)
    return response.data
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}${id}`)
    return response.data
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

export const editUser = async (userData, id) => {
  try {
    const response = await axios.put(`${apiUrl}${id}`, userData)
    return response.data
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}
