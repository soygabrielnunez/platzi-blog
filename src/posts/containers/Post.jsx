import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './Post.css';

import actions from '../../actions';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
  }

  componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    // Si los datos del usuario y de los comentarios ya existen, termina
    // la ejecucion de esta funcion
    if (this.props.user && !!this.props.comments.size > 0) return this.setState({ loading: false });

    await Promise.all([
      this.props.actions.loadUser(this.props.userId),
      this.props.actions.loadCommentsForPost(this.props.id),
    ]);

    return this.setState({ loading: false });
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
            <Link to={`/user/${this.props.user.id}`} className={styles.user}>
              {this.props.user.get('name')}
            </Link>
            <span className={styles.comments}>
              <FormattedMessage
                id="post.meta.comments"
                values={{ amount: this.props.comments.size }}
              />
            </span>
            <Link to={`/post/${this.props.id}`}>
              <FormattedMessage id="post.meta.readMore" />
            </Link>
          </div>
        )}
      </article>
    );
  }
}

Post.defaultProps = {
  id: null,
  userId: null,
  title: null,
  body: null,
  comments: null,
  user: null,
};

// Los tipos de datos que espera recibir el componente por props
Post.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    size: PropTypes.number,
    get: PropTypes.func,
  }),
  comments: PropTypes.objectOf(
    PropTypes.object,
  ),
};

function mapStateToProps(state, props) {
  return {
    comments: state
      .get('comments')
      .filter(comment => comment.get('postId') === props.id),
    user: state
      .get('users')
      .get(props.userId),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
