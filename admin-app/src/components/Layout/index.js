import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
// import { Container } from 'react-bootstrap';
import Header from '../Header';
import './style.css';

function Layout(props) {
  return (
    <>
      {/* {console.log(props.innerWidth)} */}
      <Header />
      {props.sidebar ? (
        <Container>
          <Col xs={2} sm={3} md={2} className='sidebar'>
            <ul>
              <li>
                <NavLink exact to={`/`}>
                  HOME
                </NavLink>
              </li>
              <li>
                <NavLink to={`/page`}>PAGE</NavLink>
              </li>

              <li>
                <NavLink to={`/category`}>CATEGORY</NavLink>
              </li>
              <li>
                <NavLink to={`/products`}>PRODUCTS</NavLink>
              </li>
              <li>
                <NavLink to={`/orders`}>ORDERS</NavLink>
              </li>
              <li>
                <NavLink to={`/bilingual`}>BILINGUAL</NavLink>
              </li>
            </ul>
          </Col>

          <Col className='__home-container'>{props.children}</Col>
        </Container>
      ) : (
        <Container>
          <Col sm={12} className='topbar'>
            <ul>
              <li>
                <NavLink exact to={`/`}>
                  HOME
                </NavLink>
              </li>
              <li>
                <NavLink to={`/page`}>PAGE</NavLink>
              </li>

              <li>
                <NavLink to={`/category`}>CATEGORY</NavLink>
              </li>
              <li>
                <NavLink to={`/products`}>PRODUCTS</NavLink>
              </li>
              <li>
                <NavLink to={`/orders`}>ORDERS</NavLink>
              </li>
              <li>
                <NavLink to={`/bilingual`}>BILINGUAL</NavLink>
              </li>
            </ul>

            <div
              md={12}
              style={{
                textAlign: 'justify',
                width: '100%',
              }}
              className='__full-container'>
              {props.children}
            </div>
          </Col>
        </Container>
      )}
    </>
  );
}

export default Layout;
