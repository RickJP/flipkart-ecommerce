import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
// import { Container } from 'react-bootstrap';
import Header from '../Header';

function Layout(props) {
  return (
    <>
      <Header />
      {props.sidebar ? (
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
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        props.children
      )}
    </>
  );
}

export default Layout;
