import React, { Component } from 'react';
import Image from 'react-lazy-image';
// import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Title from '../../shared/components/Title';
// import Loading from '../../shared/components/Loading';

import styles from './Page.css';

import api from '../../api';

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      gallery: [],
    };
  }

  componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    const gallery = await api.gallery.getPage(1);
    this.setState({ loading: false, gallery });
  }

  render() {
    return (
      <div>
        <section name="home" className={styles.section}>
          <Title>
            <FormattedMessage id="title.home" />
          </Title>
        </section>
        <section>
          {this.state.gallery
            .map(image => <Image key={image.id} source={image.url} width="600" height="600" offset={300} />)
          }
        </section>
      </div>
    );
  }
}

export default Gallery;
