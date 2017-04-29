import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import Title from '../../shared/components/Title';
import Post from '../../posts/containers/Post';
import Loading from '../../shared/components/Loading';

import api from '../../api';

import styles from './Page.css';

import actions from '../../actions';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.initialFetch();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  async initialFetch() {
    const posts = await api.posts.getList(this.props.page);

    this.props.dispatch(
      actions.setPost(posts),
    );

    this.setState({ loading: false });
  }

  handleScroll() {
    // Si ya se estan cargando posts, se sale, para evitar tener multiples requests activos
    if (this.state.loading) return null;

    const scrolled = window.scrollY; // Cuanto scrolleo el usuario
    const viewportHeight = window.innerHeight; // Cuanto puede scrollear el usuario en total
    const fullHeight = document.body.clientHeight; // Cuanto mide la ventana

    // Si el usuario esta en los ultimos 300 pixeles de la pagina, se carga otra pagina mas de posts
    if (!(scrolled + viewportHeight + 300 >= fullHeight)) return null;

    return this.setState({ loading: true }, async () => {
      try {
        const posts = await api.posts.getList(this.props.page);

        this.props.dispatch(
          actions.setPost(posts),
        );

        this.setState({
          loading: false,
        });
      } catch (err) {
        console.error(err);
        this.setState({
          loading: false,
        });
      }
    });
  }

  render() {
    return (
      <section name="home" className={styles.section}>
        <Title>
          <FormattedMessage id="title.home" />
        </Title>
        <section className={styles.list}>
          {this.props.posts
            .map(post => <Post key={post.id} {...post} />)}

          {/* Si el estado loading es true, muestra el h2 */}
          {this.state.loading && (
            <Loading />
          )}
        </section>
      </section>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

// Esta funcion nos permite obtener datos del estado actual e insertarlos como props a un componente
function mapStateToProps(state) {
  return {
    posts: state.posts.entities,
    page: state.posts.page,
  };
}

// Esta funcion nos permite devolver un objeto con creadores de acciones
//  que hagan el dispatch automatico
/* function mapDispatchToProps(dispatch, props) {
  return {

  }
}*/

export default connect(mapStateToProps)(Home);
