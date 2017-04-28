import React from 'react';
import PropTypes from 'prop-types';

import styles from './Title.css';

function Title(props) {
  return (
    <h2 className={styles.title}>
      {props.children}
    </h2>
  );
}

Title.defaultProps = {
  children: null,
};

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;
