import fetch from 'isomorphic-fetch'

const baseUrl = 'http://jsonplaceholder.typicode.com'

// API Rest
const api = {
  // Posts
  posts: {
    // Obtener una lista de posts
    async getList(page = 1) {
      const response = await fetch(`${baseUrl}/posts?_page=${page}`)
      const data = await response.json()
      return data
    },
    // Obtener 1 solo post
    async getSingle(id = 1) {
      const response = await fetch(`${baseUrl}/posts/${id}`)
      const data = await response.json()
      return data
    },
    //Obtener comentarios
    async getComments(id = 1) {
      const response = await fetch(`${baseUrl}/post/${id}/comments`)
      const data = await response.json()
      return data
    }
  },
  // Usuarios
  users: {
    // Obtener 1 solo usuario
    async getSingle(id = 1) {
      const response = await fetch(`${baseUrl}/users/${id}`)
      const data = await response.json()
      return data
    },
    async getPosts(id = 1) {
      const response = await fetch(`${baseUrl}/posts/?userId=${id}`)
      const data = await response.json()
      return data
    }
  }
}

export default api
