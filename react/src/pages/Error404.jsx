import React from 'react'
import Container from "react-bootstrap/Container";
import {Image} from "react-bootstrap";
import ErrorImage from "./../assets/404Error.svg";


const Error404 = () => {
   return (
       <Container>
           <Image src={ErrorImage} className={"col-6"}/>
       </Container>
   )
}
export default Error404;