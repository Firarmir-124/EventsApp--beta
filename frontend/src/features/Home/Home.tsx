import React from 'react';
import Layout from '../../components/Layout/Layout';
import EventListUser from '../Event/user/EventListUser';

const Home = () => {
  return (
    <Layout>
      <EventListUser />
    </Layout>
  );
};

export default Home;
