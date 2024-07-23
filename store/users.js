// import { fetchUsers, createUser } from '~/services/users'
import { addUser, getUsers, deleteUser, editUser } from '~/services/users'

export const state = () => ({
  users: [],
})

export const mutations = {
  GET_USERS(state, users) {
    state.users = users
  },
  ADD_USER(state, newUser) {
    state.users.push(newUser)
  },
  DELETE_USER(state, userId) {
    state.users = state.users.filter((user) => user.id !== userId)
  },
  EDIT_USER(state, updatedUser) {
    state.users = state.users.map((user) =>
      user.id === updatedUser.id ? { ...user, ...updatedUser } : user
    )
  },
}

export const actions = {
  async getUsers({ commit }) {
    try {
      const users = await getUsers()
      commit('GET_USERS', users)
    } catch (error) {
      console.error('Error fetching users in store:', error)
      throw error
    }
  },
  async addUser({ commit }, userData) {
    try {
      const newUser = await addUser(userData)
      commit('ADD_USER', newUser)
    } catch (error) {
      console.error('Error creating user in store:', error)
      throw error
    }
  },
  async deleteUser({ commit }, userId) {
    try {
      await deleteUser(userId)
      commit('DELETE_USER', userId)
    } catch (error) {
      console.error('Error creating user in store:', error)
      throw error
    }
  },
  async editUser({ commit }, userData) {
    try {
      const editResponse = await editUser(userData, userData.id)
      commit('EDIT_USER', editResponse)
    } catch (error) {
      console.error('Error creating user in store:', error)
      throw error
    }
  },
}
