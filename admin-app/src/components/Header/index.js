import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../../actions';
import './style.css';

function Header() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
  };

  const renderLoggedInLinks = () => {
    return (
      <Nav>
        {/* <Nav.Link href='#deets'>Signin</Nav.Link> */}
        <li className='nav-item'>
          <span className='nav-link' onClick={logoutUser}>
            Logout
          </span>
        </li>
      </Nav>
    );
  };

  const renderNonLoggedInLinks = () => (
    <Nav>
      {/* <Nav.Link href='#deets'>Signin</Nav.Link> */}
      <li className='nav-item'>
        <NavLink to='/signin' className='nav-link'>
          Signin
        </NavLink>
      </li>
      <li>
        <NavLink to='/signup' className='nav-link'>
          Signup
        </NavLink>
      </li>
      <li>
        <NavLink to='/pos' className='nav-link'>
          POS
        </NavLink>
      </li>
    </Nav>
  );

  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      bg='dark'
      variant='dark'
      className='__header-navbar'>
      <Container fluid>
        <Link to='/' className='navbar-brand'>
          Admin Dashboard
        </Link>

        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            {/* <NavDropdown title='Dropdown' id='collasible-nav-dropdown'>
              <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.2'>
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action/3.4'>
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
