import { useState } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from '../pages/Home.jsx';
import Introduction from '../pages/Introduction.jsx';
import Logbook from '../pages/Logbook.jsx';
import Description from '../pages/Description.jsx';
import Result from '../pages/Result.jsx';
import Links from '../pages/Links.jsx';
import Error404 from '../pages/Error404.jsx';
import NavigationBar from './NavigationBar.jsx';

function Layout() {
   return (
      <BrowserRouter>
         <div className="App">
            <NavigationBar />
            <div style={{ textAlign: "center" }}>
               <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/Introduction" element={<Introduction />} />
                  <Route path="/Logbook" element={<Logbook />} />
                  <Route path="/Description" element={<Description />} />
                  <Route path="Result" element={<Result />} />
                  <Route path="Links" element={<Links />} />
                  <Route path="*" element={<Error404 />} />
               </Routes>
            </div>
         </div>
      </BrowserRouter>
   )
}

export default Layout;