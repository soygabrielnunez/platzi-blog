import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Post from '../../posts/containers/Post.jsx'
import Loading from '../../shared/components/Loading.jsx'

import api from '../../api.js'

import styles from './Page.css'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 1,
      posts: [],
      loading: true
    }

    this.handleScroll = this.handleScroll.bind(this)
  }

  async componentDidMount() {
    const posts = await api.posts.getList(this.state.page)

    this.setState({
      posts,
      page: this.state.page + 1,
      loading: false
    })

    window.addEventListener('scroll', this.handleScroll)
  }

  handleScroll(ev) {
    // Si ya se estan cargando posts, se sale, para evitar tener multiples requests activos
    if (this.state.loading) return null

    const scrolled = window.scrollY // Cuanto scrolleo el usuario
    const viewportHeight = window.innerHeight // Cuanto puede scrollear el usuario en total
    const fullHeight = document.body.clientHeight // Cuanto mide la ventana

    // Si el usuario esta en los ultimos 300 pixeles de la pagina, se carga otra pagina mas de posts
    if(!(scrolled + viewportHeight + 300 >= fullHeight)) return null

    this.setState({ loading: true }, async () => {
      try {
        const posts = await api.posts.getList(this.state.page)
        this.setState({
          // Concat devuelve el array de posts original + los nuevos posts
          posts: this.state.posts.concat(posts),
          page: this.state.page + 1,
          loading: false
        })
      } catch (err) {
        console.error(err)
        this.setState({
          loading: false
        })
      }
    })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render() {

    return (
      <section name='home' className={styles.section}>
        <section className={styles.list}>
          {this.state.posts
            .map(post => <Post key={post.id} {...post} />)}

          {/* Si el estado loading es true, muestra el h2 */}
          {this.state.loading && (
            <Loading />
          )}
        </section>
      </section>
    )
  }
}

export default Home
