import React, { Component} from 'react'
import PropTypes from 'prop-types'
import api from '../../api.js'

class Post extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      user: {},
      comments: []
    }
  }

  async componentDidMount() {
    const [
      user,
      comments
    ] = await Promise.all([
      api.users.getSingle(this.props.userId),
      api.posts.getComments(this.props.id)
    ])

    this.setState({
      loading: false,
      user,
      comments
    })
  }

  render() {
    return (
      <article id={`post-${this.props.id}`}>
        <h2>{this.props.title}</h2>
        <p>
          {this.props.body}
        </p>
        {!this.state.loading && (
          <div>
          {/* Aqui no manejamos Link de react-router, porque este es un enlace externo a la aplicacion */}
          <a href={`//${this.state.user.website}`} target='_blank' rel='nofollow'>
            {this.state.user.name}
          </a>
          <span>
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
  userId: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string
}

export default Post
