import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './NavigationBar.css'
import Logo from '../assets/favicon.jpg'


function NavigationBar() {
   return (
      <div style={{ textAlign: "center", marginBottom: 10, }}>
         <ul>
            <li>
               <img src={Logo} alt="Logo" style={{ width: 50, height: 50, marginRight: 10 }} />
               <Link to="/">Home</Link>
            </li>
            <li>
               <Link to="/Introduction">Introduction</Link>
            </li>
            <li>
               <Link to="/Logbook">Logbook</Link>
            </li>
            <li>
               <Link to="/Description">Description</Link>
            </li>
            <li>
               <Link to="/Result">Result</Link>
            </li>
            <li>
               <Link to="/Links">Links</Link>
            </li>
         </ul>
      </div>
   )
}

export default NavigationBar;