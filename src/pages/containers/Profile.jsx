import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Post from '../../posts/containers/Post';
import Loading from '../../shared/components/Loading';

import api from '../../api';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      posts: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    const [
      user,
      posts,
    ] = await Promise.all([
      api.users.getSingle(this.props.match.params.id),
      api.users.getPosts(this.props.match.params.id),
    ]);

    this.setState({
      user,
      posts,
      loading: false,
    });
  }

  render() {
    // Si todavia esta cargando la pagina
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <section name="profile">

        <h2>Profile of {this.state.user.name}</h2>

        {this.state.user.email && (
          <fieldset>
            <legend>Basic info</legend>
            <input type="email" value={this.state.user.email} disabled />
          </fieldset>
        )}

        {this.state.user.address && (
          <fieldset>
            <legend>Address</legend>
            <address>
              {this.state.user.address.street} <br />
              {this.state.user.address.suite} <br />
              {this.state.user.address.city} <br />
              {this.state.user.address.zip} <br />
            </address>
          </fieldset>
        )}

        <section>
          {this.state.posts
            .map(post => (
              <Post
                key={post.id}
                user={this.state.user}
                {...post}
              />),
            )
          }
        </section>
      </section>
    );
  }
}

Profile.defaultProps = {
  match: [],
};

Profile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

export default Profile;
