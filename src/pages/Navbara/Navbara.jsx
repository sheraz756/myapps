import React, { useState } from "react";
import "./NavBara.css";
import {Nav,Navbar,NavLink} from 'react-bootstrap'
import { Link } from "react-router-dom";

function NavBara() {
    return (
    <div className="App">
     {/* <Navbar collopseOnSelect expand ='sm' variant = 'dark'> */}
    {/* <Navbar.Toggle area-controls ='navBarScroll' data-bs-target="#navBarScroll" /> */}
    {/* <Navbar.Collapse id = "navBarScroll"></Navbar.Collapse> */}
    <Nav>
        {/* <NavLink eventkey = '1' as={Link} to='/'>Home</NavLink> */}
        <NavLink eventkey = '1' as={Link} to='/host'>Host</NavLink>
        <NavLink eventkey = '1' as={Link} to='/admin'>Admin</NavLink>
        {/* <NavLink eventkey = '1' as={Link} to='https://webrtc-fundamentals.herokuapp.com/'>Join Chat</NavLink> */}
    </Nav>
    <Navbar.Collapse />
        </Navbar>
    </div>
  );
}

export default NavBara;