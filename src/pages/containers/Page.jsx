import React from 'react';

import {
  Route,
  Switch,
} from 'react-router-dom';

import Home from './Home';
import Post from './Post';
import Profile from './Profile';
import Gallery from './Gallery';
import Error404 from './Error404';
import Header from '../../shared/components/Header';

function Pages() {
  return (
    <main role="application">
      <Header />
      <Switch>
        {/* Lista de articulos */}
        <Route
          path="/"
          exact
          component={Home}
        />
        {/* Detalle de articulo */}
        <Route
          path="/post/:id"
          exact
          component={Post}
        />
        {/* Perfil de usuario */}
        <Route
          path="/user/:id"
          exact
          component={Profile}
        />
        {/* Galeria de fotos */}
        <Route
          path="/gallery"
          exact
          component={Gallery}
        />
        {/* Error 404 */}
        <Route
          component={Error404}
        />
      </Switch>
    </main>
  );
}

export default Pages;
