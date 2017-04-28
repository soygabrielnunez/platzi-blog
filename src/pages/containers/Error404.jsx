import React from 'react';
import { Link } from 'react-router-dom';

function Error404() {
  return (
    <section name="error404">
      <h1>Error 404</h1>
      <Link to="/">
        Go back to home
      </Link>
    </section>
  );
}

export default Error404;
