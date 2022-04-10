import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

import { Navbar } from "react-bootstrap";

class Header extends Component {
  render() {
    return (
      <div>
        <Navbar bg="dark" expand="md">
          {/* <Navbar.Brand>Items Page</Navbar.Brand> */}
          <Link to="/">Home</Link>
        
        </Navbar>
        <Navbar bg="dark" expand="lg">
          {/* <Navbar.Brand>Orders Page</Navbar.Brand> */}
          <Link to="/orders">Orders</Link>
        
        </Navbar>
        <Navbar bg="dark" expand="lg">
          {/* <Navbar.Brand>Orders Page</Navbar.Brand> */}
          <Link to="/customers">Customers</Link>
        
        </Navbar>
      </div>
    );
  }
}

export default Header;
