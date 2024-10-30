// Navbar.js
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

function CustomNavbar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">Welcome to DCU</Navbar.Brand>
      <Nav className="mr-auto">
        <Link to="/degree-list" className="nav-link">Degrees</Link>
        <Link to="/cohorts" className="nav-link">Cohorts</Link>
        <Link to="/modules" className="nav-link">Modules</Link>
        <Link to="/students/search" className="nav-link">Students</Link>
      </Nav>
    </Navbar>
  );
}

export default CustomNavbar;