import React from 'react';
import { Router } from '@reach/router';
import Layout from '@/layouts/MainLayout';
import NotFoundPage from './404';

const App = () => {
  return (
    <Layout>
      <Router basepath="/">
        <NotFoundPage default />
      </Router>
    </Layout>
  );
};

export default App;
