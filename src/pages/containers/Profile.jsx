import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Title from '../../shared/components/Title';
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
        <Title>
          <FormattedMessage
            id="title.profile"
            values={{
              name: this.state.user.name,
            }}
          />
        </Title>

        {this.state.user.email && (
          <fieldset>
            <FormattedMessage id="profile.field.basic" tagName="legend" />
            <input type="email" value={this.state.user.email} disabled />
          </fieldset>
        )}

        {this.state.user.address && (
          <fieldset>
            <FormattedMessage id="profile.field.address" tagName="legend" />
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
