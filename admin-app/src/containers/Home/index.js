import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Layout from '../../components/Layout';
import './style.css';

function Home() {
  return (
    <Layout>
      <Container fluid>
        <Row>
          <Col md={2} className='sidebar'>
            <ul>
              <li>
                <NavLink to={`/`}>HOME</NavLink>
              </li>
              <li>
                <NavLink to={`/products`}>PRODUCTS</NavLink>
              </li>
              <li>
                <NavLink to={`/orders`}>ORDERS</NavLink>
              </li>
            </ul>
          </Col>
          <Col md={10} className='__home-container'>
            Container
          </Col>
        </Row>
      </Container>

      {/* <Jumbotron
        style={{ margin: '5rem', background: '#fff' }}
        className='text-center'>
        <h1>Welcome to Admin Dashboard</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur culpa
          quisquam a sapiente consectetur dolorem aliquam recusandae. Ipsum
          maiores a inventore quis? Ratione similique modi, quod eius esse
          provident minus!
        </p>
      </Jumbotron> */}
    </Layout>
  );
}

export default Home;
