import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import Layout from '../../components/Layout';

function Home() {
  return (
    <Layout>
      <Jumbotron
        style={{ margin: '5rem', background: '#fff' }}
        className='text-center'>
        <h1>Welcome to Admin Dashboard</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur culpa
          quisquam a sapiente consectetur dolorem aliquam recusandae. Ipsum
          maiores a inventore quis? Ratione similique modi, quod eius esse
          provident minus!
        </p>
      </Jumbotron>
    </Layout>
  );
}

export default Home;
