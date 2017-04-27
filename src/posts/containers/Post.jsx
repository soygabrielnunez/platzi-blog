import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import api from '../../api.js'

import styles from './Post.css'

class Post extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      user: props.user || null,
      comments: props.comments || null
    }
  }

  async componentDidMount() {
    // Si los datos del usuario y de los comentarios ya existen, termina la ejecucion de esta funcion
    if (!!this.state.user && !!this.state.comments) return this.setState({loading: false})

    const [
      user,
      comments
    ] = await Promise.all([
      // Si la informacion del usuario ya existe, devuelve una promesa resuelta inmediatamente
      !this.state.user ? api.users.getSingle(this.props.userId) : Promise.resolve(null),
      // Si la informacion de los comentarios ya existe, devuelve una promesa resuelta inmediatamente
      !this.state.comments ? api.posts.getComments(this.props.id) : Promise.resolve(null)
    ])

    this.setState({
      loading: false,
      user: user || this.state.user,
      comments: comments || this.state.comments
    })
  }

  render() {
    return (
      <article id={`post-${this.props.id}`} className={styles.post}>
        <h2 className={styles.title}>
          <Link to={`/post/${this.props.id}`}>
            {this.props.title}
          </Link>
        </h2>


        <p className={styles.body}>
          {this.props.body}
        </p>

        {!this.state.loading && (
          <div className={styles.meta}>
            <Link to={`/user/${this.state.user.id}`} className={styles.user}>
              {this.state.user.name}
            </Link>
            <span className={styles.comments}>
              Hay {this.state.comments.length} comentarios
            </span>
          </div>
        )}
      </article>
    )
  }
}
// Los tipos de datos que espera recibir el componente por props
Post.PropTypes = {
  id: PropTypes.number,
  userId: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  comments: PropTypes.arrayOf(
    PropTypes.object,
  )
}

export default Post
