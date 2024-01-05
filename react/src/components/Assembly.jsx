import {Col, Image, Row, Table} from "react-bootstrap";
import {searchImageSrc} from "./apiProcessor.js";

// dompurifier
const DOMPurify = require('dompurify')(window);

const Assembly = (args) => {

    const table = (args) => {
        // replace everything until the first <tbody> tag
        let content = args.content.replace(/[\s\S]*<tbody>/, "");
        // replace everything after the last </tbody> tag
        content = content.replace(/<\/tbody>[\s\S]*/, "");
        // return the table
        return (
            <Table striped bordered hover className={"text-lg-start"}>
                <tbody dangerouslySetInnerHTML={{__html: content}}></tbody>
            </Table>
        )
    }


    // exec
    if (args.content === undefined) {
        return (
            <></>
        )
    } else {

        let html = DOMPurify.sanitize(args.content);
        let rowClasses = "d-flex justify-content-center";
        let colClasses = "col-6";
        let colsm = "6";
        let elementClasses = "";

        if(args.content.includes("wp-image-")){
            colClasses = "";
            colsm = "12";
            return (
                <Row className={rowClasses}>
                    <Col className={colClasses} sm={colsm}>
                        <Image fluid src={searchImageSrc(args.content)} />
                    </Col>
                </Row>
            )
        }

        if(args.content.includes("wp-block-table")){
            // process the table with the table function
            return (
                <Row className={rowClasses}>
                    <Col className={colClasses} md={"8"} sm={"12"} xs={"12"} >
                        {table(args)}
                    </Col>
                </Row>
            );
        }

        return (
            <Row className={rowClasses}>
                <Col className={colClasses} sm={colsm} xs={"12"}>
                    <div dangerouslySetInnerHTML={{__html: html}} className={elementClasses}></div>
                </Col>
            </Row>
        )
    }
}

export default Assembly;