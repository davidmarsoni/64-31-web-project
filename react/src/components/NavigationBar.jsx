import { Link, useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Nav} from "react-bootstrap";

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
       <Navbar className="bg-body-tertiary">
          <Container>
             <Navbar.Brand><Link className={"nav-link" + isActive("/")} aria-current="page" to={"/"}>Home</Link></Navbar.Brand>
             <Navbar.Toggle />
             <Nav className="me-auto">
                <Nav.Link>
                   <Link className={"nav-link"} to={"/Introduction"}>Introduction</Link>
                </Nav.Link>
                <Nav.Link>
                   <Link className={"nav-link"} to={"/Logbook"}>Logbook</Link>
                </Nav.Link>
                <Nav.Link>
                   <Link className={"nav-link"} to={"/Description"}>Description</Link>
                </Nav.Link>
                <Nav.Link>
                   <Link className={"nav-link"} to={"/Result"}>Result</Link>
                </Nav.Link>
                <Nav.Link>
                   <Link className={"nav-link"} to={"/Links"}>Links</Link>
                </Nav.Link>
             </Nav>
          </Container>
       </Navbar>
   )
}

export default NavigationBar;