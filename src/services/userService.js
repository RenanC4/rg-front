import api from './api'

export default class UserService {

  static async getUsers() {
    const response = await api.get(`/users`)
    return response.data
  }

  static async getUser(_id) {
    const response = await api.get(`/users/user`, {
      params: {
        _id: _id
      }
    })
    return response.data
  }

  static async updateUser(data) {
    console.log('data q ta vino', data)
    const response = await api.put(`/users`, {
      data
    })
    return response.data
  }

  static async createUser(data) {
    const response = await api.post(`/users`, {
      data
    })
    return response.data
  }

  static async deleteUser(_id) {
    console.log('aaa', _id)
    const response = await api.delete(`/users`, {
      data: {_id}
    })
    return response.data
  }

}