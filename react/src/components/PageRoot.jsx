import { collection, getDoc, getDocs, doc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from '../config/firestore.js'
import { useEffect, useState } from "react";
import Assembly from "./Assembly";
import Error404 from "../pages/Error404";

// React Bootstrap
import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";

// CSS
import "./PageRoot.css"


// dompurifier
const DOMPurify = require('dompurify')(window);

const PageRoot = (args) => {

    const pagesNames = ["Introduction", "Logbook", "Description", "Result", "Links", "Home"]
    const pagesNumbers = [14, 34, 36, 38, 40, 42]
    const pageName = args.pageName
    const pageId = pagesNumbers[pagesNames.indexOf(pageName)]

    const [title, setTitle] = useState("")
    const [content, setContent] = useState([])
    const [loadingState, setLoadingState] = useState("standingBy")

    const loadPage = async () => {
        console.log(pageId)
        const response = await fetch('https://62-31-web.marsoni.ch/wp-json/wp/v2/pages/' + pageId);
        if(!response.ok) {
            // oups! something went wrong
            return;
        }
        const post = await response.json();
        console.log(post)
        setTitle(post.title.rendered)

        // Process the content
        // Remove the \n, \n\n\n and \n\n\n\n
        let processedContent = post.content.rendered.replaceAll("\n\n\n\n", "\n")
        processedContent = processedContent.replaceAll("\n\n\n", "\n")
        processedContent = processedContent.replaceAll("\n\n", "\n")

        // Separate the content by \n
        processedContent = processedContent.split("\n")

        console.log(processedContent)
        setContent(processedContent)
        setLoadingState("done")
    }

    useEffect(() => {
        if (loadingState === "standingBy"){
            setLoadingState("inProgress")
            loadPage();
            /*if (pageId !== undefined) {
                return (
                    <Error404 />
                )
            }*/
        }
    });

    const message = () => {
        if (loadingState === "standingBy") {
            return (
                <p>Standing by</p>
            )
        } else if (loadingState === "inProgress") {
            return (
                <p>Loding in progress</p>
            )
        } else if (loadingState === "done") {
            if (content.length === 0) {
                return (
                    <p>The content is unavailable</p>
                )
            } else {
                return (
                    <></>
                )
            }
        }
    }

    return (
        <>
            {message()}
            <h1>{title}</h1>
            <Container fluid="true">
                {
                    content.map(content => {
                        return (
                            <Assembly content={content} />
                        )
                    })
                }
            </Container>
        </>
    )
}

export default PageRoot;