import { Link, useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Nav, NavItem} from "react-bootstrap";

const NavigationBar = () => {
   const location = useLocation().pathname;

   function isActive(path) {
      if (path === location) {
         return ("disabled")
      } else {
         return ("")
      }
   }

   return (
       <Navbar className="bg-body-tertiary" sticky="top" collapseOnSelect expand="sm">
          <Container>
             <Navbar.Toggle aria-controls="basic-navbar-nav" />
             <Navbar.Collapse>
                <Nav className="m-auto">
                      <NavItem>
                         <Link className={"nav-link"} to={"/"}>Home</Link>
                      </NavItem>
                      <NavItem>
                         <Link className={"nav-link"} to={"/Introduction"}>Introduction</Link>
                      </NavItem>
                      <NavItem>
                         <Link className={"nav-link"} to={"/Logbook"}>Logbook</Link>
                      </NavItem>
                      <NavItem>
                      <Link className={"nav-link"} to={"/Description"}>Description</Link>
                     </NavItem>
                     <NavItem>
                      <Link className={"nav-link"} to={"/Result"}>Result</Link>
                     </NavItem>
                     <NavItem>
                        <Link className={"nav-link"} to={"/Links"}>Links</Link>
                     </NavItem>
                </Nav>
             </Navbar.Collapse>
          </Container>
       </Navbar>
   )
}

export default NavigationBar;